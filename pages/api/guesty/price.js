import { encode as base64_encode } from 'base-64'
import cookie from 'cookie'

/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    }
}

export default (req, res) => {

    let tokenObject = {}

    const cookies = cookie.parse(req.headers.cookie || '')

    const currentCookie = cookies.gttesttoken

    tokenObject = {
        token: 'no token',
        message: 'No message'
    }


    return res.status(200).json(tokenObject)

}