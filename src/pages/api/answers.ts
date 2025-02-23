// src/pages/api/answers.ts
export const prerender = false;

import { Answers, db } from 'astro:db';
import type { APIRoute } from 'astro';

// Obtener todas las respuestas
export const GET: APIRoute = async () => {
  try {
    const allAnswers = await db.select().from(Answers);
    
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
    return new Response(
      JSON.stringify({ error: 'Error al obtener respuestas' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};