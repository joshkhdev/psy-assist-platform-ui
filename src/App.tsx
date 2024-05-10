import './App.css';
import Home from './components/Home';
import QuestionaryCreator from './components/QuestionaryCreator';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import NoContent from './components/NoContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> 
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* подстановочный путь */}
              <Route path="createQuestionary" element={<QuestionaryCreator />} />
              <Route path='*' element={<NoContent />} />
            </Routes>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;