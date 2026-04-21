const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Check if DB already has data
  const existingQuiz = await prisma.quiz.findFirst({
    include: {
      questions: true,
    },
  });

  if (existingQuiz && existingQuiz.questions.length > 0) {
    console.log("✅ Database already seeded. Skipping...");
    return;
  }

  // 2. Create quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: "Recycling and Waste Management Quiz",
    },
  });

  console.log("🧠 Created quiz:", quiz.title);

  // 3. Question data
  const questions = [
    {
      text: "When should Montclair residents put their garbage out for collection?",
      answers: [
        { text: "Anytime during the day", correct: false },
        { text: "Between 6 a.m. and noon on collection day", correct: false },
        { text: "Between 6 p.m. the day before and 6 a.m. the day of collection", correct: true },
        { text: "Only after 8 p.m. the night before", correct: false },
      ],
    },
    {
      text: "Which of the following items is currently NOT accepted for recycling in Montclair?",
      answers: [
        { text: "Glass bottles", correct: false },
        { text: "Aluminum cans", correct: false },
        { text: "Mixed paper", correct: false },
        { text: "Styrofoam", correct: true },
      ],
    },
    {
      text: "How many large household items (mattress, box spring, etc.) may a Montclair resident leave at the curb for bulky waste collection?",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: false },
        { text: "3", correct: true },
        { text: "5", correct: false },
      ],
    },
    {
      text: "What must residents do with mattresses and box springs before putting them out for collection?",
      answers: [
        { text: "Wrap them in cardboard", correct: false },
        { text: "Place them in a plastic bag", correct: true },
        { text: "Place them in a biodegradable paper bag", correct: false },
        { text: "Call ahead to schedule a pickup", correct: false },
      ],
    },
    {
      text: "During which two periods does Montclair collect loose leaves at the curb?",
      answers: [
        { text: "Oct 15 – Dec 1 and April 1 – April 30", correct: true },
        { text: "Sept 1 – Nov 30 and March 1 – March 31", correct: false },
        { text: "Oct 1 – Nov 30 and March 15 – April 15", correct: false },
        { text: "Nov 1 – Dec 15 and April 1 – April 30", correct: false },
      ],
    },
  ];

  // 4. Insert questions + answers
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const question = await prisma.question.create({
      data: {
        quiz_id: quiz.id,
        question_text: q.text,
        order_number: i + 1,
      },
    });

    await prisma.answer.createMany({
      data: q.answers.map((a) => ({
        question_id: question.id,
        answer_text: a.text,
        is_correct: a.correct,
      })),
    });
  }

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });