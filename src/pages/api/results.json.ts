//src/pages/api/results.json.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Results, db } from 'astro:db';
import { v4 as uuidv4 } from 'uuid';

// Insert Result
export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsear el cuerpo de la solicitud (se espera un array de resultados)
        const body = await request.json();

        if (!Array.isArray(body)) {
            throw new Error("El cuerpo de la solicitud debe ser un array de resultados.");
        }

        // Generar un UUID unico para los resultados
        const generatedUUID = uuidv4();

        // Mapear cada resultado agregando el campo UUIDResult
        const resultsToInsert = body.map((result: { idQuestion: number; idAnswer: number; is_correct: boolean }) => 
            ({
                ...result,
                UUIDResult: generatedUUID,
            })
        );

        // Insertar los resultados en la base de datos
        await db.insert(Results).values(resultsToInsert);

        // Retornar respuesta exitosa
        return new Response(
        JSON.stringify({
            success: true,
            message: "Datos insertados exitosamente.",
            UUIDResult: generatedUUID,
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
        );
    } catch (error) {
        console.error("Error al insertar datos:", error);
  
        // Retornar respuesta de error
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error al insertar datos.",
                error: error instanceof Error ? error.message : "Error desconocido.",
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};

// Get Results
export const GET: APIRoute = async () => {
    try {
        // Obtenemos la lista de preguntas desde la base de datos
        const resultsList = await db.select().from(Results).execute();

        // Construimos la respuesta exitosa
        const responsePayload = {
            success: true,
            message: "Listado obtenido exitosamente.",
            data: resultsList
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