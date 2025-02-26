# PruebaTecnica

Una aplicación de prueba técnica construida con **Astro**, **ReactJS** y **ChakraUI**. 
Este proyecto utiliza **React Hook Form** con **Zod** para la validación dinámica de formularios y se integra con **Astro DB** 
para la gestión de datos.

Explicación Detallada : 

---

## 📂 Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

```text
/
├── db/
│   └── config.ts
│   └── seed.ts
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── astro.svg
│   │   └── background.svg
│   │   └── KoplikLogo.png
│   ├── layouts/
│   │   └── Layout.astro
│   │   └── LayoutWrapper.tsx
│   ├── pages/
│   │   └── index.astro         // Página principal con dos botones
│   │   └── questions.astro     // Página que renderiza el formulario de preguntas y respuestas
│   │   ├── api/   // Localización de APIs // URL: http://localhost:4321/api/
│   │   │   └── [uuid].json.ts  //GetResults by UUID
│   │   │   └── answers.json.ts  //GetAllAnswers
│   │   │   └── questions.json.ts //GetAllQuestions
│   │   │   └── results.json.ts  //GetAllResults y PostResult con UUID unico y automatico.
│   ├── components/
│   │   └── AlertSuccess.tsx   // Componente para renderizar la alerta con el UUID propio
│   │   └── BtnQuest.tsx   // Componente para redirigir el formulario de preguntas
│   │   └── BtnResults.tsx   // Componente para mostrar el alert de resultados
│   │   └── QuestionsForm.tsx   // Componente para renderizar el formulario de preguntas
│   │   ├── ui/
│   │   │   ├── radio/
│   │   │   │   ├── //Componentes Propios para colocar una respuesta con un InputRadio y seleccionar solo uno a la vez.
│   │   │   │   ├── GroupRadio.tsx
│   │   │   │   └── OnlyRadio.tsx
│   │   │   │   └── DemoRadio.tsx
│   │   │   │   └── StyleRadio.css
│   │   │   └── toaster.tsx     // Componente para mostrar notificaciones
│   │   │   └── ...     // Componentes de ChakraUI
└── package.json
└── astro.config.mjs //integrar react y db al proyecto
└── ... (otros archivos y componentes de configuracion)
```
---

## 🧞 Commands

Debes abrir la terminal en la raiz del proyecto para ejecutar los siguientes comandos.

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### 🔧 Configuración y Ejecución

Clona el repositorio:
```sh
git clone <URL-del-repositorio>
```

Instala las dependencias:
```sh
npm install
```


Inicia el servidor de desarrollo:
```sh
npm run dev
```

Abre el navegador en:
http://localhost:4321

## ⚙️ Descripción del Proyecto
El proyecto "PruebaTecnica" cuenta con las siguientes funcionalidades:

**Página Principal (index.astro):**
Contiene dos botones principales:

**Responder Cuestionario:**
Navega a questions.astro, que renderiza el componente QuestionsForm. En este formulario se muestran preguntas obtenidas desde una API, <br> se permite al usuario seleccionar respuestas (utilizando componentes de ChakraUI), y se envían los datos a través de un POST a otra API. <br> La respuesta de esta API retorna un UUID único, el cual se muestra mediante un alert en la página principal.

**Consultar Resultados:**
Permite al usuario ingresar el UUID obtenido previamente (a través de un prompt) para consultar otra API que devuelve los resultados <br> del cuestionario. Los resultados se muestran en un window.alert indicando si cada pregunta fue respondida correctamente o  <br> incorrectamente.

**Integración con ChakraUI:**
Se utilizan componentes de ChakraUI para una interfaz moderna y accesible.

**Validación Dinámica con React Hook Form y Zod:**
El componente QuestionsForm construye un esquema de validación dinámico para asegurar que el usuario seleccione una respuesta <br> para cada pregunta.

**Astro DB:**
Se integra para la gestión de datos. Asegúrate de tener configurada la conexión correctamente según tus necesidades.

## ⚙️ Descripción de BD y APIs

### 📊 Base de Datos

El proyecto utiliza una base de datos con tres tablas principales:

- **Questions**: Almacena las preguntas del cuestionario.
  - `idQuestion`: Identificador único de la pregunta (Primary Key).
  - `question`: Texto de la pregunta.
  - `createDate`: Fecha de creación de la pregunta.

- **Answers**: Almacena las posibles respuestas para cada pregunta.
  - `idAnswer`: Identificador único de la respuesta (Primary Key).
  - `idQuestion`: Relación con la tabla Questions.
  - `answer`: Texto de la respuesta.
  - `is_correct`: Indica si la respuesta es correcta.

- **Results**: Almacena los resultados del cuestionario.
  - `idResult`: Identificador único del resultado (Primary Key).
  - `idQuestion`: Relación con la tabla Questions.
  - `idAnswer`: Relación con la tabla Answers.
  - `is_correct`: Indica si la respuesta seleccionada fue correcta.
  - `UUIDResult`: Identificador único para agrupar respuestas de un mismo cuestionario.

---

### 📡 APIs

El proyecto expone cuatro endpoints principales para interactuar con la base de datos:

1. **GET `/api/[uuid].json`**  
   Obtiene los resultados del cuestionario asociados a un `UUIDResult`.
   - Parámetro requerido: `uuid` (UUID del cuestionario).
   - Respuesta exitosa:
     ```json
     {
       "success": true,
       "message": "Resultados obtenidos exitosamente.",
       "data": [ ... ]
     }
     ```
   - Respuesta de error:
     ```json
     {
       "success": false,
       "message": "Error al obtener los resultados.",
       "error": "Descripción del error"
     }
     ```

2. **GET `/api/questions.json`**  
   Obtiene el listado completo de preguntas.
   - Respuesta exitosa:
     ```json
     {
       "success": true,
       "message": "Listado obtenido exitosamente.",
       "data": [ ... ]
     }
     ```

3. **GET `/api/answers.json`**  
   Obtiene el listado completo de respuestas.
   - Respuesta exitosa:
     ```json
     {
       "success": true,
       "message": "Listado obtenido exitosamente.",
       "data": [ ... ]
     }
     ```

4. **POST `/api/results.json`**  
   Inserta los resultados de un cuestionario.
   - Cuerpo de la solicitud: Array de resultados con `idQuestion`, `idAnswer`, e `is_correct`.
   - Respuesta exitosa:
     ```json
     {
       "success": true,
       "message": "Datos insertados exitosamente.",
       "UUIDResult": "UUID generado"
     }
     ```
   - Respuesta de error:
     ```json
     {
       "success": false,
       "message": "Error al insertar datos.",
       "error": "Descripción del error"
     }
     ```

---
Estas APIs permiten gestionar de manera eficiente el flujo de datos de preguntas, respuestas y resultados en la aplicación.


