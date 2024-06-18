//#region Imports

// System
import './App.css';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// MUI
import Home from './components/pages/Home';
import { 
    BrowserRouter,
    Route, 
    Routes
} from 'react-router-dom';
// Components
import QuestionnaireCreator from './components/pages/QuestionnaireCreator';
import QuestionnaireSuccess from './components/pages/QuestionnaireSuccess';
import PsychologistsViewer from './components/pages/PsychologistsViewer';
import SignUp from './components/pages/SignUp';
// Styles and Resources
import { 
    CREATE_QUESTIONNAIRE_REF, 
    CREATE_QUE_SUCCESS_REF, 
    HOME_REF, 
    PSYCHOLOGIST_CATALOG_REF,
    SIGN_UP_REF
} from './resources/Refs';

//#endregion

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p> 
          <BrowserRouter>
            <Routes>
              <Route path={HOME_REF} element={<Home />} />
              {/* подстановочный путь */}
              <Route path={CREATE_QUESTIONNAIRE_REF} element={<QuestionnaireCreator />} />
              <Route path={PSYCHOLOGIST_CATALOG_REF} element={<PsychologistsViewer />} />
              <Route path={CREATE_QUE_SUCCESS_REF} element={<QuestionnaireSuccess />} />
              <Route path={SIGN_UP_REF} element={<SignUp />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;