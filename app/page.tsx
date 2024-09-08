// app/page.js
'use client'; // Since you're handling client-side events

import { useState } from 'react';

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const cartData = [
        {
            name: "Sample Product 1",
            style: "Modern",
            price: 29.99,
            code: "SAMPLE-CODE-1"
        },
        {
            name: "Sample Product 2",
            style: "Classic",
            price: 49.99,
            code: "SAMPLE-CODE-2"
        }
    ];

    const postToFoxyCart = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log("Success:", result);
            alert("Cart data sent successfully!");
        } catch (error) {
            console.error("Error posting to FoxyCart:", error);
            alert("Failed to send cart data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cartData.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.style} - ${item.price}
                    </li>
                ))}
            </ul>
            <button onClick={postToFoxyCart} disabled={loading}>
                {loading ? "Saving..." : "Save Cart"}
            </button>
        </div>
    );
}
