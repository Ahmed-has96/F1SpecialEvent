import React, { useState } from "react";
// Definerer en liste over spørsmål til quiz gamet
const questions = [
  {
    questionText: "Hvilken Formel 1-fører vant verdensmesterskapet i 2021?",
    imageUrl: "/images/Formula1hjem.jpg",
    answerOptions: [
      { answerText: "Lewis Hamilton", isCorrect: false },
      { answerText: "Max Verstappen", isCorrect: true },
      { answerText: "Sebastian Vettel", isCorrect: false },
      { answerText: "Daniel Ricciardo", isCorrect: false },
    ],
  },
  {
    questionText: "Hvilket team vant konstruktør-mesterskapet i 2020?",
    imageUrl: "/images/quizImg2.gif",
    answerOptions: [
      { answerText: "Ferrari", isCorrect: false },
      { answerText: "Red Bull Racing", isCorrect: false },
      { answerText: "Mercedes", isCorrect: true },
      { answerText: "McLaren", isCorrect: false },
    ],
  },

  {
    questionText: "Hvilket år ble DRS introdusert i Formel 1?",
    imageUrl: "/images/f1-gif2.gif",
    answerOptions: [
      { answerText: "2009", isCorrect: false },
      { answerText: "2011", isCorrect: true },
      { answerText: "2007", isCorrect: false },
      { answerText: "2013", isCorrect: false },
    ],
  },
  {
    questionText: "Hvem ble verdensmester i Formel 1 i 2007?",
    imageUrl: "/images/F1DriversQuiz4.jpeg",
    answerOptions: [
      { answerText: "Fernando Alonso", isCorrect: false },
      { answerText: "Kimi Räikkönen", isCorrect: true },
      { answerText: "Felipe Massa", isCorrect: false },
      { answerText: "Lewis Hamilton", isCorrect: false },
    ],
  },
];

const QuizGame = () => {
  // Tilstand for å finne gjeldende spørsmål og poengsum
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Håndterer klikk på svaralternativer
  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsGameOver(true);
    }
  };
  // Håndterer restart av spillet
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsGameOver(false); // Tilbakestiller tilstanden for å tillate nytt spill
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: "600px" }}>
        {isGameOver ? (
          <GameOverSection
            score={score}
            total={questions.length}
            onRestart={restartGame}
          />
        ) : (
          <QuestionSection
            question={questions[currentQuestion]}
            onAnswer={handleAnswerButtonClick}
          />
        )}
      </div>
    </div>
  );
};
// Komponent for spillavslutning med poengsum og restartknapp
const GameOverSection = ({ score, total, onRestart }) => (
  <div className="text-center">
    Du scoret {score} av {total}
    <div className="mt-3">
      <button className="btn btn-danger" onClick={onRestart}>
        Start på nytt
      </button>
    </div>
  </div>
);
// Komponent for visning av spørsmål og svaralternativer
const QuestionSection = ({ question, onAnswer }) => (
  <>
    <div className="text-center">
      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Spørsmålsbilde"
          className="img-fluid my-3"
        />
      )}
      <div className="question-count">
        <span>Spørsmål</span>
      </div>
      <div className="question-text">{question.questionText}</div>
    </div>
    <div className="d-flex flex-wrap justify-content-center">
      {question.answerOptions.map((option, index) => (
        <div key={index} className="col-12 col-md-6 text-center">
          <button
            className="btn btn-danger my-2 w-75"
            onClick={() => onAnswer(option.isCorrect)}
          >
            {option.answerText}
          </button>
        </div>
      ))}
    </div>
  </>
);

export default QuizGame;
