import { fetchBookingToken } from '../../../../utils/tokenManager'

/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    },

}

export default async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
        try {
            // Destructure the necessary items from req.body
            const { quoteId, guest, ratePlanId, ccToken } = req.body;

            // Check if all necessary data is present
            if (!quoteId || !guest || !ratePlanId || !ccToken) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            // Define the URL and options for the fetch request
            const url = `https://booking.guesty.com/api/reservations/quotes/${quoteId}/instant`;
            console.log(url)
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + await fetchBookingToken(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    guest: guest,
                    ratePlanId: ratePlanId,
                    ccToken: ccToken
                })
            };

            // Make the fetch request to the remote API
            const response = await fetch(url, options);

            // Check if the response was ok
            if (!response.ok) {
                throw new Error(`API call failed with HTTP status ${response.status}: ${response.statusText}`);
            }

            // Parse the JSON response
            const data = await response.json();

            // Send the data back to the client
            res.status(200).json(data);
        } catch (error) {
            // Handle any errors that occurred during the process
            res.status(500).json({ error: error.message });
        }
    } else {
        // If not a POST request, return 405 Method Not Allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};