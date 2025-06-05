
export default (req, res) => {
    const body = JSON.parse(req.body)
    const adminMessage = "Customer enquiry from DAH web site"
    let returnData = ''

    const requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "mode": "cors",
            "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        "body": JSON.stringify({
            "from": {
                "email": "sales@irelandathome.com",
                "name": "Sales"
            },
            "personalizations": [
                {
                    "to": [
                        {
                            "name": "Sales",
                            "email": "mike@irelandathome.com"
                        },
                        {
                            "name": "Testing to Mike",
                            "email":"mike@9thsquare.com"
                        }
                    ],
                    "dynamic_template_data": {
                        "adminMessage": "---",
                        "customerEmail": "---",
                        "companyName": "---",
                        "customerName": "---",
                        "customerPhone": "---",
                        "arrivalDate": "---",
                        "departureDate": "---",
                        "guests": "---",
                        "singleRooms": "---",
                        "doubleRooms": "---",
                        "placementArea": "---",
                        "requirements": "---"
                    }
                }
                
            ],
            "template_id": "d-ec36be33d6ac4b37ad71734cb078f6e8"
        })
    }

    // `${adminMessage}`

    fetch(`https://api.ckghosting.com/iahapi/send_iah_email`, requestOptions)
    .then((response) => {
        return response.json()
    })
    .then((responseData) => {
        return res.status(200).json(responseData)
    })
    
}
