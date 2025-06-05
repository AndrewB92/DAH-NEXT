export async function fetchBookingToken() {

    let token;
    const data = {
        authdata: process.env.GUESTY_AUTH
    };

    // console.log('Sending Auth Data:', data);  // Log the data to be sent

    try {
        const response = await fetch('https://ckghosting.com/guesty/booking_token_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const tokenArray = await response.json();
        // console.log('Full API Response:', tokenArray);

        if (response.ok && tokenArray.token) {
            token = tokenArray.token.data[0].booking_token
            // console.log('Fetched booking token:', token);
        } else {
            console.error('api error: 25')
            // console.error('Invalid token response structure', tokenArray);
        }

    } catch (error) {
        console.error('api error: 30')
        // console.error('Error fetching booking token:', error);
    }

    // console.log(token)

    return token;
}

export async function fetchOpenApiToken() {
    // console.log('fetchOpenApiToken called...')
    let token;
    const data = {
        authdata: process.env.GUESTY_AUTH
    };

    // console.log('Sending Auth Data to openApi:', data);  // Log the data being sent for debugging

    try {
        const response = await fetch('https://ckghosting.com/guesty/token_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Use JSON format
            },
            body: JSON.stringify(data)  // Convert the data object to JSON string
        });

        const tokenArray = await response.json();

        if (response.ok && tokenArray.token) {
            token = tokenArray.token.data[0].token;  // Extract the token
            // console.log('Fetched OpenAPI token:', token);
        } else {
            console.error('api error: 62')
            // console.error('Invalid token response structure', tokenArray);
        }

    } catch (error) {
        console.log('api error: 67')
        // console.error('Error fetching OpenAPI token:', error);
    }

    return token;
}