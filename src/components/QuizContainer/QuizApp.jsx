import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import preguntas from "../../storage/Answers.json";
import "./quizappStyles.css";

const QuizApp = () => {
  const [quizData, setQuizData] = useState("");

  useEffect(() => {
    const adaptedQuizData = {
      quizTitle: " Test Politico Argentino ",
      questions: preguntas.map((pregunta) => ({
        question: pregunta.question,
        questionType: pregunta.questionType,
        answerSelectionType: pregunta.answerSelectionType,
        answers: pregunta.answers,
        correctAnswer: pregunta.correctAnswer,
        point: pregunta.point,
      })),
    };

    setQuizData(adaptedQuizData);
  }, []);

  const renderCustomResultPage = (obj) => {
    console.log(obj);
    return (
      <div className="result-Box">
        <p> Segun tus respuestas tu candidato es </p>
        <img
          alt="result"
          src="https://media.lmneuquen.com/p/8c8ade600b12cab721dd9463cd11d518/adjuntos/242/imagenes/007/227/0007227974/730x0/smart/tagreuterscom2022newsml_kbn2p325x.jpeg"
        />
      </div>
    );
  };
  return (
    <div className="QuizContainer">
      {quizData ? (
          <Quiz
            className="Quiz-External"
            shuffle={true}
            quiz={quizData}
            showDefaultResult={false}
            customResultPage={renderCustomResultPage}

          />
      ) : (
        <p>Cargando preguntas...</p>
      )}
    </div>
  );
};

export default QuizApp;
