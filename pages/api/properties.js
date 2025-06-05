import { fetchOpenApiToken } from '@utils/tokenManager'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = {
            status: 'ok',
            request: token
        };
        res.status(200).json(data);
    } else if (req.method === 'GET') {
        const result = await fetch(`https://open-api.guesty.com/v1/listings?fields=title type pms bedrooms bathrooms picture pictures prices publicDescription address&limit=200`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await fetchOpenApiToken()
            },
        });

        const responseData = await result.json();

        // Modify the titles within the `results` array
        const modifiedResults = responseData.results.map(property => ({
            ...property,
            title: property.title.replace(/\s*by\s*Dublin\s*At\s*Home/i, '').trim()
        }));

        // Recreate the structure with `request` field intact
        const data = {
            status: 'ok',
            request: {
                ...responseData, // Preserve all original fields (title, fields, limit, skip, count)
                results: modifiedResults // Replace only the `results` array with modified data
            }
        };

        res.status(200).json(data);
    } else {
        // Handle any other HTTP methods as needed
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}