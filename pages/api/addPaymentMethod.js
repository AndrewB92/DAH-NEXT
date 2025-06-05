import { fetchOpenApiToken } from '../../utils/tokenManager'

export default async function handler(req, res) {
    const body = JSON.stringify(req.body)
    const guestId = req.body.guestId

    if (req.method === 'POST') {
        const apiUrl = `https://open-api.guesty.com/v1/guests/${guestId}/payment-methods`
        try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await fetchOpenApiToken()
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        // Handle any other HTTP methods as needed
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}