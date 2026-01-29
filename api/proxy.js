export default async function handler(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    // ✅ Replace this with your REAL API endpoint
    // Example:
    // const targetUrl = `https://example.com/api/search?q=${encodeURIComponent(query)}`;

    const targetUrl = `https://api.publicapis.org/entries?title=${encodeURIComponent(query)}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        // You can add API KEY headers here if needed
      },
    });

    const data = await response.json();

    // ✅ CORS headers (for safety)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Proxy Failed",
      message: String(error),
    });
  }
}
