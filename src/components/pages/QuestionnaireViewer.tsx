import {useLocation} from 'react-router-dom';

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
    questionnaireFormStyle, 
    questionnaireEntryStyle
} from '../../styles/QuestionnaireStyles';

import { 
    IS_FOR_PAY_CHECK_BOX_HEADER 
} from '../../resources/QuestionnaireCreatorResources';

import { 
    NAME, 
    PRONOUN, 
    AGE, 
    TIMEZONE, 
    NEURO_DIFF, 
    MENTAL_SPEC, 
    PSY_WICHES, 
    PSY_REQUEST, 
    THERAPY_EXP
} from '../../resources/QuestionnaireViewResources';

function QuestionnaireViewer() {

    const location = useLocation();

    return (
        <FormControl style={questionnaireFormStyle}>
            <div><Typography variant='h4'>Данные анкеты</Typography></div>
            <Accordion defaultExpanded>
                <AccordionDetails>
                <TextField 
                        label={NAME}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.name} />
                <br /> 
                <TextField 
                        label={PRONOUN}                       
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.pronouns} />
                <br />
                <TextField 
                        label = {AGE}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.age} />
                <br /> 
                <TextField  
                        label={TIMEZONE}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.timeZone} />
                <br /> 
                <FormControlLabel 
                        control={<Checkbox  checked={location.state.isForPay}/>}  
                        label={IS_FOR_PAY_CHECK_BOX_HEADER} />    
                <TextField 
                        label={NEURO_DIFF}
                        multiline
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.neuroDifferences} />                        
                <br /> 
                <TextField 
                        label={MENTAL_SPEC}
                        multiline
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.mentalSpecifics} />
                <br />      
                <TextField 
                        label={PSY_WICHES}
                        multiline
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.psyWishes}/>
                <br />       
                <TextField 
                        label={PSY_REQUEST}
                        multiline
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' 
                        value={location.state.psyQuery}/>
                <br />  
                <TextField 
                        label={THERAPY_EXP}
                        multiline
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined'
                        value={location.state.therapyExperience} />
                <br />                    
                </AccordionDetails>
            </Accordion>
            <br />
            <Link 
                className='link_field'
                variant='body2'
                href='/questionnairelist'>
                Вернуться на страницу с заявками
            </Link>  
        </FormControl>     
    );
}

export default QuestionnaireViewer;