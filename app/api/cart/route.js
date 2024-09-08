// app/api/postToFoxyCart/route.js
export async function POST(req) {
    const url = "https://wizhom.foxycart.com/cart"; 
    const cartItems = await req.json();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("Error posting to FoxyCart:", error);
        return new Response(JSON.stringify({ error: "Error posting to FoxyCart" }), { status: 500 });
    }
}
