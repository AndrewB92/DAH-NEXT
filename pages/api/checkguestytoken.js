import { serialize } from 'cookie'
import Cookies from 'cookies'

export default (req, res) => {

    const cookies = new Cookies(req, res)

    let isCookieSet = cookies.get('tokenset')

    async function getToken() {
        const response = await fetch('https://ckghosting.com/guesty/token')
        const data = await response.json()
        return data.data[0].token
    }

    if(cookies.get('tokenset') != 'true') {
        getToken()
        .then((token) => {
            cookies.set('token', token, { maxAge: 5000, path: '/' })
            cookies.set('tokenset', 'true', {maxAge: 5000, httpOnly: false, path: '/'})
            return res.status(200).end()
        })
        .catch((err) => {
            return res.status(400).end()
        });
    }else{
        return res.status(200).end()
    }    
    
}