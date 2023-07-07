import './App.css'
import Header from './components/QuizContainer/Header/Header';
import QuizApp from './components/QuizContainer/QuizApp';

const App = () => {
  

  return (
    <div className="App">
      <Header/>
      <QuizApp/>
      <Header/>
    </div>
  );
};

export default App;

