const axios = require('axios').default

const getRedditEnv = () =>{
    return {
        id: process.env.REDDIT_API_ID,
        secret: process.env.REDDIT_API_SECRET,
        user: process.env.REDDIT_USER,
        pass: process.env.REDDIT_PASS,
    }
}

const auth = async () => {

    const ACESS_URL = "https://www.reddit.com/api/v1/access_token"
    const {id,secret,user,pass} = getRedditEnv()
    const BASIC_AUTH = Buffer.from(`${id}:${secret}`).toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", user);
    params.append("password", pass);
    console.log(params)
    const {data} = await axios({
        method: 'post',
        url: ACESS_URL,
        headers: {
            Authorization: `Basic ${BASIC_AUTH}`
        },
        data: params
    })
    console.log(data)
    return data.access_token;
};

module.exports = auth