export default (req, res) => {

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
                "email": "mike@irelandathome.com",
                "name": "Mike Test"
            },
            "personalizations": [
                {
                    "to": [
                        {
                            "name": "Testing to Mike",
                            "email":"mikebradydeveloper@gmail.com"
                        }
                    ],
                    "dynamic_template_data": {
                        "adminMessage": "test",
                        "customerEmail": "test",
                        "companyName": "test",
                        "customerName": "test",
                        "customerPhone": "test",
                        "arrivalDate": "test",
                        "departureDate": "test",
                        "guests": "test",
                        "singleRooms": "test",
                        "doubleRooms": "test",
                        "placementArea": "test",
                        "requirements": "test"
                    }
                }
                
            ],
            "template_id": "d-ec36be33d6ac4b37ad71734cb078f6e8"
        })
    }

    fetch(`https://api.ckghosting.com/iahapi/send_iah_email`, requestOptions)
    .then((response) => {
        return response.json()
    })
    res.statusCode = 200;
    res.json({
        success: true,
        key: 'keycode'
    })
}