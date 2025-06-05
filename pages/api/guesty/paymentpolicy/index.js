
/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    },

}
export default async (req, res) => {

    const { query: { listingId } } = req

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
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json; charset=utf-8',
                authorization: 'Bearer ' + token
            }
          };
        const result = fetch(`https://booking.guesty.com/api/listings/${listingId}?fields=autoPayments`, options)
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(400).json(error)
            return error
        })        
    })
}