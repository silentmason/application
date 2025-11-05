export async function onRequest(context) {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM applications"
        ).all();

        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch submissions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}