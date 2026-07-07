import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = getCloudflareContext();
    const db = env.DB;

    const quiz = await db
      .prepare("SELECT * FROM quizzes LIMIT 1")
      .first();

    if (!quiz) {
      return Response.json(
        { error: "No quiz found" },
        { status: 404 }
      );
    }

    const questions = await db
      .prepare(
        "SELECT * FROM questions WHERE quiz_id = ? ORDER BY order_number ASC"
      )
      .bind(quiz.id)
      .all();

    const questionIds = questions.results.map(q => q.id);

    let answers = { results: [] };

    if (questionIds.length > 0) {
      const placeholders = questionIds.map(() => "?").join(",");

      answers = await db
        .prepare(
          `SELECT * FROM answers WHERE question_id IN (${placeholders})`
        )
        .bind(...questionIds)
        .all();
    }

    return Response.json({
      quiz_name: quiz.title,
      questions: questions.results.map(q => ({
        id: q.id,
        text: q.question_text,
        options: answers.results
          .filter(a => a.question_id === q.id)
          .map(a => a.answer_text),
        correct_answer: answers.results.find(
          a => a.question_id === q.id && a.is_correct
        )?.answer_text,
      })),
    });
  } catch (err) {
    return Response.json(
      {
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}