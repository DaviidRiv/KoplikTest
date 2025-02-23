export async function GET() {
    return new Response(
        JSON.stringify({
        message: "Get all answers"
        })
    );
}