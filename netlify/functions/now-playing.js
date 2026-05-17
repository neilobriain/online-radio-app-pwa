// netlify/functions/now-playing.js

export default async function handler() {
    try {
        const response = await fetch("https://raidiofailte.com/", {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const html = new TextDecoder("utf-8").decode(buffer);

        const match = html.match(
            /<strong>\s*Ar an aer\s*<\/strong>[\s\S]*?<h3[^>]*>\s*([\s\S]*?)\s*&nbsp;\s*&gt;\s*&nbsp;/i
        );

        if (!match) {
            throw new Error("Programme name not found after Ar an aer");
        }

        const programmeName = match[1]
            .replace(/<[^>]+>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/&#8217;/g, "'")
            .replace(/&#038;/g, "&")
            .replace(/\s+/g, " ")
            .trim();

        return new Response(
            JSON.stringify({ programmeName }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "public, max-age=600, stale-while-revalidate=300"
                }
            }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
