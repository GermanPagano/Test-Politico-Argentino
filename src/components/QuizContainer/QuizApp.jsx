import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import preguntas from "../../storage/Answers.json";
import "./quizappStyles.css";
import Massa  from '../../assets/img/massa.jpg';
import Grabois  from '../../assets/img/Grabois.jpg';
import { emphasize } from "@mui/material";

const QuizApp = () => {
  const [quizData, setQuizData] = useState("");

  useEffect(() => {
    const adaptedQuizData = {
      quizTitle: "Test Politico Argentino",
      appLocale: {
        landingHeaderText: "",
        question: "Pregunta",
        startQuizBtn: "Comenzar",
        resultFilterAll: "All",
      },
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


  let ultraIz = 0;
  let ultraDer = 0;
  let centroIz = 0;
  let centroDer = 0;
  const handleSelectOption = (opcion) => {
    switch (opcion.userAnswer) {
      case 1:
        ultraIz +=1
        break;
      case 2:
        ultraDer += 1;
        break;
      case 3:
        centroIz += 1;
        break;
      case 4:
        centroDer += 1;
        break;
      default:
        console.log("Respuesta no reconocida");
        break;
    }
    
  };


  const renderCustomResultPage = (obj) => {

    let maxCount = Math.max(ultraIz, ultraDer, centroIz, centroDer);
    let message = "";
    let vote ;
    if (maxCount === ultraIz) {
      message = `Elegiste ${ultraIz} respuestas de la tendencia ultra izquierda.`;
      vote= Grabois;
    } else if (maxCount === ultraDer) {
      message = `Elegiste ${ultraDer} respuestas de la tendencia ultra derecha.`;
    } else if (maxCount === centroIz) {
      message = `Elegiste ${centroIz} respuestas de la tendencia centro izquierda.`;
      vote = Massa
    } else if (maxCount === centroDer) {
      message = `Elegiste ${centroDer} respuestas de la tendencia centro derecha.`;
    } else {
      message = "No se identifica una tendencia predominante.";
    }
    return (
      <div className="result-Box">
        <p>{message}</p>
        <img
          alt="result"
          src={Massa}
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
          onQuestionSubmit={handleSelectOption}
        />
      ) : (
        <p>Cargando preguntas...</p>
      )}
    </div>
  );
};

export default QuizApp;
