const Quiz = require("../models/quiz");
const QuizAttempt = require("../models/quizAttempt");

const createQuiz = async (quiz) => {
    const newQuiz = new Quiz(quiz);
    await newQuiz.save();
};

const deleteQuiz = async (quizId) => {
    await Quiz.findByIdAndDelete(quizId);
};

const getAllQuizzes = async (course) => {
    const quizzes = await Quiz.find({ course });
    return quizzes;
};

const getQuiz = async (quizId) => {
    const quiz = await Quiz.findById(quizId);
    return quiz;
};

const attemptQuiz = async (attempt) => {
    // prevent multiple attempts by the same student
    const existingAttempt = await QuizAttempt.findOne({
        quiz: attempt.quiz,
        student: attempt.student,
    });
    if (existingAttempt) {
        throw new Error("You have already attempted this quiz");
    }

    const quiz = await Quiz.findById(attempt.quiz);
    let correctAnswerCount = 0;

    for (let i = 0; i < quiz.questions.length; i++) {
        const options = quiz.questions[i].options;
        const attemptedAnswer = attempt.answers[i].option;
        const currentAsnswer = options.find((option) => option.option === attemptedAnswer);

        if (currentAsnswer.isCorrect) {
            correctAnswerCount++;
        }
    }

    attempt.score = (correctAnswerCount / quiz.questions.length) * 100;

    const newAttempt = new QuizAttempt(attempt);
    await newAttempt.save();
    return { score: attempt.score };
};

const studentQuizzes = async (course, student) => {
    const quizzes = await Quiz.find({ course }).lean();

    for (let i = 0; i < quizzes.length; i++) {
        const quiz = quizzes[i];
        console.log(quiz);
        const attempt = await QuizAttempt.findOne({
            quiz: quiz._id,
            student,
        });
        if (attempt) {
            quizzes[i].score = attempt.score;
        }
    }

    return quizzes;
};

module.exports = {
    createQuiz,
    deleteQuiz,
    getAllQuizzes,
    getQuiz,
    attemptQuiz,
    studentQuizzes,
};
