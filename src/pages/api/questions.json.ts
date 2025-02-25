// src/pages/api/questions.json.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Questions, db } from 'astro:db';

export const GET: APIRoute = async () => {
  try {
    
    // Obtenemos la lista de preguntas desde la base de datos
    const questionsList = await db.select().from(Questions).execute();

    // Construimos la respuesta exitosa
    const responsePayload = {
        success: true,
        message: "Listado obtenido exitosamente.",
        data: questionsList
    };

    return new Response(JSON.stringify(responsePayload), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
  } catch (error) {
    console.error("Error al obtener datos: ", error);

    // Construimos la respuesta de error
    const errorResponse = {
        success: false,
        message: "Error al obtener datos.",
        error: error instanceof Error ? error.message : "Error desconocido."
    };

    return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }
};
