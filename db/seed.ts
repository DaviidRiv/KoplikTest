import { db, Questions, Answers, Results} from 'astro:db';
import { v4 as uuidv4 } from 'uuid';

// https://astro.build/db/seed
// Insert some data into the tables
export default async function seed() {
	await db.insert(Questions).values([
		{ idQuestion: 1, question: "¿Cuál es el principal neurotransmisor inhibitorio en el sistema nervioso central?", createDate: new Date() },
		{ idQuestion: 2, question: "¿Qué arteria es la principal fuente de irrigación sanguínea del cerebro?", createDate: new Date() },
		{ idQuestion: 3, question: "¿Cuál es la función principal de las células beta en los islotes de Langerhans del páncreas?", createDate: new Date() },
		{ idQuestion: 4, question: "¿Cuál es la función principal de la hemoglobina en la sangre?", createDate: new Date(),
		},
	]);

	await db.insert(Answers).values([
		// Answers Question 1
		{ idAnswer: 1, idQuestion: 1, answer: "GABA", is_correct: true },
		{ idAnswer: 2, idQuestion: 1, answer: "Glutamato", is_correct: false },
		{ idAnswer: 3, idQuestion: 1, answer: "Dopamina", is_correct: false },
		{ idAnswer: 4, idQuestion: 1, answer: "Serotonina", is_correct: false },
	  
		// Answers Question 2
		{ idAnswer: 5, idQuestion: 2, answer: "Arteria carótida interna", is_correct: true },
		{ idAnswer: 6, idQuestion: 2, answer: "Arteria aorta", is_correct: false },
		{ idAnswer: 7, idQuestion: 2, answer: "Arteria mesentérica superior", is_correct: false },
		{ idAnswer: 8, idQuestion: 2, answer: "Arteria pulmonar", is_correct: false },
	  
		// Answers Question 3
		{ idAnswer: 9, idQuestion: 3, answer: "Producción de insulina", is_correct: true },
		{ idAnswer: 10, idQuestion: 3, answer: "Producción de glucagón", is_correct: false },
		{ idAnswer: 11, idQuestion: 3, answer: "Síntesis de cortisol", is_correct: false },
		{ idAnswer: 12, idQuestion: 3, answer: "Secreción de bilis", is_correct: false },

		//Answers Question 4
		{ idAnswer: 13, idQuestion: 4, answer: "Transporte de oxígeno", is_correct: true },
		{ idAnswer: 14, idQuestion: 4, answer: "Digestión de proteínas", is_correct: false },
		{ idAnswer: 15, idQuestion: 4, answer: "Producción de hormonas", is_correct: false },
		{ idAnswer: 16, idQuestion: 4, answer: "Síntesis de lípidos", is_correct: false },
	]);

	// Generar un UUID para agrupar las respuestas
	const UUIDResult = uuidv4();

	await db.insert(Results).values([
		// Respuesta a la pregunta 1
		{ idResult: 1, idQuestion: 1, idAnswer: 1, is_correct: true, UUIDResult: UUIDResult },

		// Respuesta a la pregunta 2
		{ idResult: 2, idQuestion: 2, idAnswer: 7, is_correct: false, UUIDResult: UUIDResult },

		// Respuesta a la pregunta 3
		{ idResult: 3, idQuestion: 3, idAnswer: 9, is_correct: true, UUIDResult: UUIDResult },

		// Respuesta a la pregunta 4
		{ idResult: 4, idQuestion: 4, idAnswer: 13, is_correct: false, UUIDResult: UUIDResult },
	]);
}