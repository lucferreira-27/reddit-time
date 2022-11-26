const {getPostInfo} = require('../service/reddit-info')
async function trackPost(post){
    const BASE_REDDIT_URL = "https://www.reddit.com/r/"
    const url =  BASE_REDDIT_URL + post.comunityName + "/" + post.postId
    console.log(url)
    const info = await getPostInfo(url)
    return info
}

module.exports = {trackPost}