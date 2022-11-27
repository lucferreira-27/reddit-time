const { getPostInfo } = require('../service/reddit-info')
const { models } = require('../../sequelize');
const cron = require('node-schedule');

async function addJob(post, timePattern) {
    console.log("[CRON - JOB] New Job Add: ", post.postId)
    cron.scheduleJob(post.postId, timePattern, async () => {
        console.log("[CRON - JOB] ScheduleJob: ", post.postId)

        if (post.status != 'tracking') {
            console.log("[CRON - JOB] Update Statu of ScheduleJob: ", post.postId + " pending => tracking")
            post.status = 'tracking'
            await post.update({ status: 'tracking' })
        }
        let info = await trackPost(post)
        const changes = await getPostStateDiff(post, info)
        if (changes.anyChange) {
            await models.PostState.create({
                stateDate: Date.now(),
                score: info.score,
                total_comments: info.total_comments,
                total_awards: info.total_awards,
                PostId: post.get('id')
            }, {})
        }

    });
}

async function trackPost(post) {
    const BASE_REDDIT_URL = "https://www.reddit.com/r/"
    const url = BASE_REDDIT_URL + post.comunityName + "/" + post.postId
    console.log(url)
    const info = await getPostInfo(url)
    return info
}

async function getPostStateDiff(post, newState) {
    const changes = {}
    const lastState = (await models.PostState.findAll({
        where: {
            PostId: post.get('id')
        }, order: [
            ['stateDate', 'DESC']
        ]
    }))[0]



    if (!lastState) {
        changes.anyChange = true
        return changes
    }
    changes.score = (lastState.score - newState.score) > lastState.score * 0.01
    changes.total_comments = lastState.total_comments != newState.total_comments
    changes.total_awards = lastState.total_awards != newState.total_awards
    changes.anyChange = changes.score || changes.total_awards || changes.total_comments
    return changes
}

async function stopTrackingPost(post) {
    console.log("[CRON - JOB] Stop Job: ", post.postId)
    const job = cron.scheduledJobs[post.postId];
    job.stop();
}

module.exports = async () => {


    if (Object.keys(cron.scheduledJobs).length == 0) {
        const pendingPosts = await models.Post.findAll({
            where: {
                status: {
                    $or: [
                        'tracking','pending_tracking'
                    ]
                }
            }
        })
        for (let post of pendingPosts) {
            addJob(post, '*/60 * * * * *')
        }
    }


    models.Post.afterCreate((post) => addJob(post, '*/60 * * * * *'))
    models.Post.beforeDestroy((post) => stopTrackingPost(post))
    models.Post.afterUpdate(async (post) => {
        if (post.status != 'tracking') {
            await stopTrackingPost(post)
        }
    })



}