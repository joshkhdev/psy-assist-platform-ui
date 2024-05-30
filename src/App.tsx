import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/pages/Home';
import QuestionnaireCreator from './components/pages/QuestionnaireCreator';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import QuestionnaireSuccess from './components/pages/QuestionnaireSuccess';
import PsychologistsViewer from './components/pages/PsychologistsViewer';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p> 
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* подстановочный путь */}
              <Route path='createQuestionnaire' element={<QuestionnaireCreator />} />
              <Route path='psychologists' element={<PsychologistsViewer />} />
              <Route path='createQuestionnaireSuccess' element={<QuestionnaireSuccess />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;