import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import preguntas from "../../storage/Answers.json";
import "./quizappStyles.css";
import Cano from "../../assets/img/caño.jpg";
import Grabois from "../../assets/img/Grabois.jpg";
import Larreta from "../../assets/img/larreta.jpg";
import Massa from "../../assets/img/massa.jpg";
import Biondini from "../../assets/img/biondini.jpg";
import Milei from "../../assets/img/milei.jpg";
import Bullrich from "../../assets/img/Bullrich.jpg";
import Schi from "../../assets/img/schiaretti.jpg";

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
        ultraIz += 1;
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
    let percentage = Math.round((maxCount / 18) * 100);
    let message = "";
    let vote;

    const candidateOptions = {
      ultraIzquierda: {
        threshold: 70,
        options: {
          high: Cano,
          low: Grabois,
        },
      },
      ultraDerecha: {
        threshold: 70,
        options: {
          high: Biondini,
          low: Milei,
        },
      },
      centroIzquierda: {
        threshold: 70,
        options: {
          high: Larreta,
          low: Massa,
        },
      },
      centroDerecha: {
        threshold: 70,
        options: {
          high: Bullrich,
          low: Schi,
        },
      },
    };

    const findCandidate = (tendency) => {
      const { threshold, options } = candidateOptions[tendency];
      return percentage > threshold ? options.high : options.low;
    };

    if (maxCount === ultraIz) {
      message = `Tendencia ${percentage}% de ultra izquierda`;
      vote = findCandidate("ultraIzquierda");
    } else if (maxCount === ultraDer) {
      message = `Tendencia ${percentage}% de ultra derecha`;
      vote = findCandidate("ultraDerecha");
    } else if (maxCount === centroIz) {
      message = `Tendencia ${percentage}% de centro izquierda`;
      vote = findCandidate("centroIzquierda");
    } else if (maxCount === centroDer) {
      message = `Tendencia ${percentage}% de centro derecha`;
      vote = findCandidate("centroDerecha");
    } else {
      message = "No se identifica una tendencia predominante.";
    }

    return (
      <div className="result-Box">
        <p>{message}</p>
        <img className="img-result" alt="result" src={vote} />
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
