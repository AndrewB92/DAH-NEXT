
export default (req, res) => {

    const body = JSON.parse(req.body)
    const adminMessage = "Booking update from the DAH site"

    const requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        "body": JSON.stringify({
            "from": {
                "email": "reservations@irelandathome.com",
                "name": "Sales"
            },
            "personalizations": [
                {
                    "to": [
                        {
                            "name": "Sales",
                            "email": "sales@irelandathome.com"
                        },
                        {
                            "name": "Testing to Mike",
                            "email":"mikebradydeveloper@gmail.com"
                        }
                    ],
                    "dynamic_template_data": {
                        "adminMessage": `${adminMessage}`,
                        "fullname": `${body.fullname}`,
                        "email": `${body.email}`,
                        "address": `${body.address}`,
                        "phone": `${body.phone}`,
                        "company": `${body.company}`,
                        "guests": `${body.guests}`,
                        "requirements": `${body.requirements}`,
                        "termsread": `${body.termsread}`,
                        "paymentType": `${body.paymentType}`,
                        "arrivalDate": `${body.arrivalDate}`,
                        "departureDate": `${body.departureDate}`,
                        "propertyName": `${body.propertyName}`,
                        "propertyId": `${body.propertyId}`
                    }
                }
                
            ],
            "template_id": "d-aaf3b776a3054b50928c80f13b2185c4"
        })
    }
    const response = fetch(`https://api.sendgrid.com/v3/mail/send`, requestOptions)

    res.status(200).json(response)
}