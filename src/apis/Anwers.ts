import type { APIRoute } from 'astro';
import { Answers, db } from 'astro:db';

export const prerender = true;

export const GET: APIRoute = async () => {
  try {
    // Obtener todas las respuestas de la tabla Answers
    const allAnswers = await db
      .select()
      .from(Answers)
      .execute();

    // Mostrar en consola las respuestas obtenidas
    console.log("Respuestas obtenidas:", allAnswers);

    return new Response(
      JSON.stringify(allAnswers),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error al obtener las respuestas:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener las respuestas" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}