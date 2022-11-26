
const axios = require('axios').default

async function getPostInfo(postUrl) {
    const { data } = await axios.get(postUrl + "/.json")
    const child =  data[0].data.children[0].data
    return {
        score: child.score,
        ups: child.ups,
        downs: child.downs,
        upvote_ratio: child.upvote_ratio,
        total_comments: child.num_comments,
        total_awards: child.total_awards_received,
        author: child.author,
        content: child.selftext,
        title: child.title,
        thumbnail: child.thumbnail || null,
        url: child.url || null
    }
}

module.exports = { getPostInfo }