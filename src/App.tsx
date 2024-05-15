import './App.css';
import Home from './components/Home';
import QuestionnaireCreator from './components/QuestionnaireCreator';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoContent from './components/NoContent';
import QuestionnaireSuccess from './components/QuestionnaireSuccess';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> 
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* подстановочный путь */}
              <Route path="createQuestionnaire" element={<QuestionnaireCreator />} />
              <Route path='createQuestionnaireSuccess' element={<QuestionnaireSuccess />} />
              <Route path='*' element={<NoContent />} />
            </Routes>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;