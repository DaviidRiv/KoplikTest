import { defineDb, defineTable, column, NOW } from 'astro:db';

//Define the tables for database
const Questions = defineTable({
  columns: {
    idQuestion: column.number({ primaryKey: true, unique: true }),
    question: column.text({unique: true}),
    createDate: column.date({ default: NOW })
  },
})

const Answers = defineTable({
  columns: {
    idAnswer: column.number({ primaryKey: true, unique: true }),
    idQuestion: column.number({ references: () => Questions.columns.idQuestion }),
    answer: column.text(),
    is_correct: column.boolean({default: false}),
  },
})

const Results = defineTable({
  columns: {
    idResult: column.number({ primaryKey: true, unique: true }),
    idQuestion: column.number({ references: () => Questions.columns.idQuestion }),

    idAnswer: column.number({ references: () => Answers.columns.idAnswer }),
    is_correct: column.boolean(),

    UUIDResult: column.text(),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: {Questions, Answers, Results},
});
