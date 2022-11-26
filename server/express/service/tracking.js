const axios = require('axios').default
const auth = require('../service/reddit-auth')
async function trackPost(postId){
   const token = await auth()
   const getPostInfo = (postId,token) =>{
        const info = {
            totalAwards: 0,
            totalComments: 0,
            score: 0,
            title: null,
            content: null,
            author: null,
        }
   }
   console.log(token)
    // const {data} = await axios.get(postId)
}