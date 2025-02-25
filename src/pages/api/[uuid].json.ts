// src/pages/api/[uuid].json.ts

export const prerender = false;

import type { APIRoute } from 'astro';
import { Results, db, eq } from 'astro:db';

export const GET: APIRoute = async ({ params }) => {
    try {
        const { uuid } = params;
  
        if (!uuid) {
            throw new Error("No se proporcionó el UUID.");
        }
  
        // Consulta a la base de datos usando el helper eq para construir la condición
        const results = await db
            .select()
            .from(Results)
            .where(eq(Results.UUIDResult, uuid))
            .execute();
  
        const responsePayload = {
            success: true,
            message: "Resultados obtenidos exitosamente.",
            data: results,
        };
  
        return new Response(JSON.stringify(responsePayload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al obtener resultados por UUID:", error);
        const errorResponse = {
            success: false,
            message: "Error al obtener los resultados.",
            error: error instanceof Error ? error.message : "Error desconocido",
        };
  
        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};