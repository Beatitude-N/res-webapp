// export default function handler(req, res) {
//     if (req.method === 'GET') {
//       res.status(200).json({ message: 'Hello, world!' });
//     } else {
//       res.status(405).json({ error: 'Method not allowed' });
//     }
//   }
  
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Hello, world!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


  
  