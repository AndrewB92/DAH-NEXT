
export default async (req, res) => {
    const body = JSON.parse(req.body)
    const adminMessage = "Owner enquiry from DAH web site"
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
                        "landPhone": `${body.landPhone}`,
                        "mobilePhone": `${body.mobilePhone}`,
                        "ownerAddress": `${body.ownerAddress}`,
                        "propertyAddress": `${body.propertyAddress}`,
                        "propertyBeachTime": `${body.propertyBeachTime}`,
                        "propertyComments": `${body.propertyComments}`,
                        "propertyPubTime": `${body.propertyPubTime}`,
                        "propertyRooms": `${body.propertyRooms}`,
                        "propertyShopTime": `${body.propertyShopTime}`,
                        "propertySleeps": `${body.propertySleeps}`,
                        "propertyType": `${body.propertyType}`,
                        "hasBedLinen": `${body.hasBedLinen}`,
                        "hasBordFailte": `${body.hasBordFailte}`,
                        "hasCooker": `${body.hasCooker}`,
                        "hasCot": `${body.hasCot}`,
                        "hasVideoPlayer": `${body.hasVideoPlayer}`,
                        "hasDishwasher": `${body.hasDishwasher}`,
                        "hasHighChair": `${body.hasHighChair}`,
                        "hasInsurance": `${body.hasInsurance}`,
                        "hasKettle": `${body.hasKettle}`,
                        "hasMicrowave": `${body.hasMicrowave}`,
                        "hasTV": `${body.hasTV}`,
                        "hasToaster": `${body.hasToaster}`,
                        "hasTowels": `${body.hasTowels}`
                    }
                }
                
            ],
            "template_id": "d-7a453e68a0d341559eb361efd853de6f"
        })
    }

    fetch(`https://api.ckghosting.com/iahapi/send_iah_email`, requestOptions)
    .then((response) => {
        return response.json()
    })
    .then((responseData) => {
        return res.status(200).json(responseData)
    })
}