import fetch from 'node-fetch';

export async function GET(req) {
    try {
        // Extract the subscriptionKey and referenceId from query parameters
        const { searchParams } = new URL(req.url);
        let subscriptionKey = searchParams.get('subscriptionKey');
        let referenceId = searchParams.get('referenceId');

        // Validate the required parameters
        if (!subscriptionKey) {
            throw new Error('Subscription key is missing');
        }

        if (!referenceId) {
            throw new Error('Reference ID is missing');
        }

        const url = `https://api.apprenticeships.education.gov.uk/vacancies/vacancy${referenceId}`;

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
