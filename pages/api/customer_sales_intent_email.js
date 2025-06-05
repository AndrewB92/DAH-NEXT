export default (req, res) => {

    const body = JSON.parse(req.body)
    const adminMessage = "Booking intent from the DAH site"
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
                "name": "Reservations"
            },
            "personalizations": [
                {
                    "to": [
                        {
                        "name": "Mike dev",
                        "email":"mikebradydeveloper@gmail.com"
                        },
                        {
                        "name": "IAH Administration",
                        "email": "ian@irelandathome.com"
                        }
                    ],
                    "dynamic_template_data": {
                        "adminMessage": `${adminMessage}`,
                        "fullname": `${body.firstName} ${body.surname}`,
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

    const response = fetch(`https://api.ckghosting.com/iahapi/send_iah_email`, requestOptions)
    .then((response) => {
        return response.text()
    })
    .then((data) => {
        res.status(200).json(data)
    })
    return 'ok'
}