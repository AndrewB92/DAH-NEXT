import cookie from 'cookie'

/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    },

}
export default async (req, res) => {

    const { query: { listingId } } = req
    const { query: { from } } = req
    const { query: { to } } = req

    let token
    let formBody = []
    const data = {
        authdata: process.env.GUESTY_AUTH
    }
    for(let item in data) {
        const encodedKey = encodeURIComponent(item)
        const encodedValue = encodeURIComponent(data[item])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    const output = await fetch('https://ckghosting.com/guesty/booking_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    .then(response => response.json())
    .then((tokenArray) => {
        token = tokenArray.token.data[0].booking_token
        const result = fetch(`https://booking.guesty.com/api/listings/${listingId}/calendar?from=${from}&to=${to}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(response => {
            res.status(200).json(response)
            return response
        })
        .catch(error => {
            res.status(200).json(error)
            return error
        })        
    })

}