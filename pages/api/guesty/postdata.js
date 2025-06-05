import { encode as base64_encode } from 'base-64'
import cookie from 'cookie'

/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    },

}

export default async (req, res) => {

    const cookies = cookie.parse(req.headers.cookie || '')

    const currentToken = cookies.gttoken

    if(!currentToken) {
        const authorizationString = base64_encode(process.env.GUESTY_CREDENTIAL)

        const data = {
            authdata: authorizationString
        }

        let formBody = []

        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        
        formBody = formBody.join("&");

        /* DON'T FORGET TO PUT THE POSTED SECURITY DATA ON THE CKGHOSTING ENDPOINT */
        const rawResponse = await fetch('https://ckghosting.com/guesty/get_booking_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        .then((response) => {
            return response.json()
        })
        .then(response => {
            const token = response.token
            res.setHeader("Set-Cookie", cookie.serialize("gttoken", String(token), {
                httpOnly: false,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60,
                sameSite: "strict",
                path: "/"
            }))
            /* ******* CHANGE COOKIE AGE TO 60 * 60 ********* */
            res.status(200).json(response)
            return response
        })
        .catch(error => {
            res.status(200).json(error)
            return error
        })
    }else{
        const localTokenResponse = {
            "token": currentToken,
            "message": "Success - from local"
        }
        res.status(200).json(localTokenResponse)
    }

}

/*

res.setHeader("Set-Cookie", cookie.serialize("order", req.body.order, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/"
  }))

  */