import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GET_QUESTIONNAIRES_REF, HOME_REF } from '../../resources/Refs';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import { Link } from '@mui/material';
import { QuestionnaireResponse } from '../../models/QuestionnaireResponse';

function QuestionnairesList() {

    const navigate = useNavigate();
    const [questionnaires, setQuestionnaires] = useState<QuestionnaireResponse[]>();

    useEffect(() => {
        getQuestionnaireDataAsync();
    }, []);

    async function getQuestionnaireDataAsync() {        
        const response = await axios.get<string>(GET_QUESTIONNAIRES_REF);
        const data = JSON.parse(JSON.stringify(response.data));
        console.log(data);
        setQuestionnaires(data);
    }

    const handleClick = (state: QuestionnaireResponse) => {
        console.log('questionnaire ', state);
        navigate(`/questionnairelist/${state.id}`, {state});
    }      

    const contents = questionnaires === undefined
        ? <p><em>Loading...</em></p>
        : <table className='table table-hover' aria-labelledby='tabelLabel'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Pronouns</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {questionnaires.map(elem =>
                    <tr   
                        key={elem.id} 
                        onClick={() => handleClick(elem)}>                        
                        <td>{elem.id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.pronouns}</td>
                        <td>{elem.age}</td>
                    </tr>
                )}            
            </tbody>            
        </table>;    

    return (
        <div>
            <h1 id='tabelLabel'>Список заявок</h1>
            {contents} 
            <Link 
                className='link_field'
                variant='body2'
                href={HOME_REF}>
                {BACK_TO_HOME_BUTTON_HEADER}
            </Link>             
        </div>
    );   
}

export default QuestionnairesList;