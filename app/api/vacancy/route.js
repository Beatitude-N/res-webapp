import fetch from 'node-fetch';

const url = 'https://api.apprenticeships.education.gov.uk/vacancies/vacancy?Sort=AgeDesc&FilterBySubscription=true';

export async function GET(req) {
    try {
        // Extract the subscriptionKey from query parameters or body
        const { searchParams } = new URL(req.url);
        let subscriptionKey = searchParams.get('subscriptionKey');

        // If the key isn't in the query params, try getting it from the body
        if (!subscriptionKey) {
            const body = await req.json();
            subscriptionKey = body.subscriptionKey;
        }

        if (!subscriptionKey) {
            throw new Error('Subscription key is missing');
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Version': '1',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Send the data to the client
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Handle errors
        return new Response(JSON.stringify({ error: error.message || 'Error fetching data' }), { status: 500 });
    }
}
