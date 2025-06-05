// pages/api/guesty/token/open.js

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(404).json({ message: 'Not found' });  // Pretend it doesn't exist
    }

    // Check for the API access key in the request headers or body
    const { apiKey } = req.body;  // Assuming you’re sending it in the body

    if (apiKey !== process.env.API_ACCESS_KEY) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    // Your token fetching logic here
    const token = 'dlkjfalj'
    res.status(200).json({ token })
}