import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

import { 
    Accordion, 
    AccordionDetails,   
    Checkbox, 
    FormControl, 
    FormControlLabel,
    TextField,
    Link, 
    Typography 
} from '@mui/material';

import { 
    questionnaireViewerFormStyle, 
    questionnaireViewerEntryStyle
} from '../../styles/QuestionnaireStyles';

import { 
    IS_FOR_PAY_CHECK_BOX_HEADER,
    PHONE_INNER_HEADER,
    EMAIL_INNER_HEADER,
    TELEGRAM_INNER_HEADER
} from '../../resources/QuestionnaireCreatorResources';

import {
    QUESTIONNAIRE_DATA, 
    NAME, 
    PRONOUN, 
    AGE, 
    TIMEZONE, 
    NEURO_DIFF, 
    MENTAL_SPEC, 
    PSY_WISHES, 
    PSY_REQUEST, 
    THERAPY_EXP,
    BACK_TO_QUESTIONNAIRELIST_BUTTON    
} from '../../resources/QuestionnaireViewResources';

import { QuestionnaireResponse } from '../../models/QuestionnaireResponse';
import { GET_QUESTIONNAIRES_REF } from '../../resources/Refs';

function QuestionnaireViewer() {

    const location = useLocation();
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse>();

    useEffect(() => {
        getQuestionnaireDataAsync();
    }, []);

    async function getQuestionnaireDataAsync() {        
        const response = await axios.get<string>(GET_QUESTIONNAIRES_REF + '\\' + location.state.id);
        const data = JSON.parse(JSON.stringify(response.data));
        console.log(data);
        setQuestionnaire(data);
    }

    const contents = questionnaire === undefined 
    ? <p><em>Loading...</em></p>
    : <FormControl style={questionnaireViewerFormStyle}>           
        <div><Typography variant='h4'>{QUESTIONNAIRE_DATA}</Typography></div>            
        <Accordion defaultExpanded>
            <AccordionDetails>
                <TextField        
                    inputProps={{readOnly: true, disabled: true}}             
                    label={NAME}
                    style={questionnaireViewerEntryStyle}                    
                    variant='outlined' 
                    value={questionnaire.name} />
                    <br /> 
                <TextField    
                    inputProps={{readOnly: true, disabled: true}}
                    label={PRONOUN}                       
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.pronouns} />
                <br />
                <TextField    
                    inputProps={{readOnly: true, disabled: true}}   
                    label = {AGE}
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.age} />
                <br /> 
                <TextField   
                    inputProps={{readOnly: true, disabled: true}}     
                    label={TIMEZONE}
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.timeZone} />
                <br /> 
                <TextField    
                    inputProps={{readOnly: true, disabled: true}}      
                    label={PHONE_INNER_HEADER}
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.contact.phone} />
                <br />         
                <TextField  
                    inputProps={{readOnly: true, disabled: true}}      
                    label={EMAIL_INNER_HEADER}
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.contact.email} />
                <br />    
                <TextField  
                    inputProps={{readOnly: true, disabled: true}}        
                    label={TELEGRAM_INNER_HEADER}
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.contact.telegram} />
                <br />                         
                <FormControlLabel 
                    control={<Checkbox  checked={location.state.isForPay}/>}  
                    label={IS_FOR_PAY_CHECK_BOX_HEADER} />    
                <TextField    
                    inputProps={{readOnly: true, disabled: true}}     
                    label={NEURO_DIFF}
                    multiline
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.neuroDifferences} />                        
                <br /> 
                <TextField      
                    inputProps={{readOnly: true, disabled: true}} 
                    label={MENTAL_SPEC}
                    multiline
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.mentalSpecifics} />
                <br />      
                <TextField    
                    inputProps={{readOnly: true, disabled: true}}      
                    label={PSY_WISHES}
                    multiline
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.psyWishes}/>
                <br />       
                <TextField     
                    inputProps={{readOnly: true, disabled: true}}   
                    label={PSY_REQUEST}
                    multiline
                    style={questionnaireViewerEntryStyle}
                    variant='outlined' 
                    value={questionnaire.psyQuery}/>
                <br />  
                <TextField     
                    inputProps={{readOnly: true, disabled: true}}   
                    label={THERAPY_EXP}
                    multiline
                    style={questionnaireViewerEntryStyle}
                    variant='outlined'
                    value={questionnaire.therapyExperience} />
                <br />                    
            </AccordionDetails>
        </Accordion>
        <br />
        <Link 
            className='link_field'
            variant='body2'
            href='/questionnairelist'>
            {BACK_TO_QUESTIONNAIRELIST_BUTTON}
        </Link>  
    </FormControl>;  
          
    return (       
        <div>
            {contents}
        </div>
    );
}

export default QuestionnaireViewer;