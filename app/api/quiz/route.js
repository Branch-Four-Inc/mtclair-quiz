export async function GET(request, { env }) {
  try {
    // 1. Get quiz
    const quiz = await env.DB
      .prepare("SELECT * FROM quizzes LIMIT 1")
      .first();

    if (!quiz) {
      return Response.json({ error: "No quiz found" }, { status: 404 });
    }

    // 2. Get questions
    const questions = await env.DB
      .prepare(
        "SELECT * FROM questions WHERE quiz_id = ? ORDER BY order_number ASC"
      )
      .bind(quiz.id)
      .all();

    // 3. Get answers for all questions
    const questionIds = questions.results.map(q => q.id);

    let answers = [];
    if (questionIds.length > 0) {
      const placeholders = questionIds.map(() => "?").join(",");

      answers = await env.DB
        .prepare(
          `SELECT * FROM answers WHERE question_id IN (${placeholders})`
        )
        .bind(...questionIds)
        .all();
    }

    // 4. Build response structure
    const formatted = {
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
    };

    return Response.json(formatted);

  } catch (err) {
    return Response.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}