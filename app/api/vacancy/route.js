import fetch from 'node-fetch';

const url = 'https://api.apprenticeships.education.gov.uk/vacancies/vacancy?Sort=AgeDesc&FilterBySubscription=true';
const subscriptionKey = '127f944c3bd74ac0be6c6d66a718ae8c';

export async function GET(req) {
    try {
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
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}
