import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup } from "../components/ui/radio/GroupRadio";
import { OnlyRadio as Radio } from "../components/ui/radio/OnlyRadio";
import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";

// Tipos para las preguntas y respuestas
export type Question = {
  idQuestion: number;
  question: string;
  createDate: string;
};

export type Answer = {
  idAnswer: number;
  idQuestion: number;
  answer: string;
  is_correct: boolean;
};

type QuestionsFormProps = {
  questions: Question[];
  answers: Answer[];
};

// Construye el schema dinámico para validar que se seleccione una respuesta por pregunta
const buildSchema = (questions: Question[]) => {
  const shape: Record<string, z.ZodType<string>> = {};
  questions.forEach((q) => {
    shape[`q_${q.idQuestion}`] = z.string().nonempty("Este campo es requerido");
  });
  return z.object(shape);
};


type FormValues = Record<string, string>;

const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions, answers }) => {
  const schema = buildSchema(questions);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  //POST Results
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ← Esto previene la recarga
    await handleSubmit(async (data) => {

      console.log("Respuestas enviadas:", data);
    
      // Transformamos el objeto data en un array de resultados
      const results = Object.entries(data).map(([key, value]) => {
        const idQuestion = parseInt(key.replace("q_", ""), 10);
        const idAnswer = parseInt(value, 10);
        const answerObj = answers.find(
          (a) => a.idAnswer === idAnswer && a.idQuestion === idQuestion
        );
    
        return {
          idQuestion,
          idAnswer,
          is_correct: answerObj ? answerObj.is_correct : false,
        };
      });
    
      try {
        const response = await fetch("http://localhost:4321/api/results.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(results),
        });
    
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
    
        if (response.ok) {
          // Extrae el UUID que retorna la API
          const { UUIDResult } = responseData;

          // Redirecciona al index pasando el UUID
          window.location.href = `/?success=true&uuid=${UUIDResult}`;
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
      }
    })(e);
  };
  

  return (
    <ChakraProvider value={defaultSystem}>
    <form onSubmit={onSubmit} >
      {questions.map((q) => {
        const filteredAnswers = answers.filter((a) => a.idQuestion === q.idQuestion);
        return (
          <fieldset key={q.idQuestion} style={{ marginBottom: "1rem", padding: "0.5rem" }}>
            <legend style={{ fontWeight: "bold" }}>{q.question}</legend>
            <Controller
              name={`q_${q.idQuestion}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                >
                  {filteredAnswers.map((a) => (
                    <Radio key={a.idAnswer} value={a.idAnswer.toString()}>
                      {a.answer}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            />
            {errors[`q_${q.idQuestion}`] && (
              <p style={{ color: "red", marginTop: "0.25rem" }}>
                {errors[`q_${q.idQuestion}`]?.message}
              </p>
            )}
          </fieldset>
        );
      })}
      <Button type="submit" mt="6" colorPalette="green" variant="surface">
          Enviar respuestas
        </Button>
    </form>
    </ChakraProvider>
  );
};

export default QuestionsForm;
