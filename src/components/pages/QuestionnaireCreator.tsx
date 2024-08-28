//#region Imports

// System
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// MUI
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Button, 
    Checkbox, 
    FormControl, 
    FormControlLabel, 
    Link, 
    TextField, 
    Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiTelInput } from 'mui-tel-input';
// Classes
import { Questionnaire } from '../../models/Questionnaire';
// Styles and Resources
import { questionnaireFormStyle, questionnaireEntryStyle, questionnaireButtonStyle } from '../../styles/QuestionnaireStyles';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import { 
    ABOUT_OUTER_HEADER, 
    AGE_INNER_HEADER, 
    CONTACTS_OUTER_HEADER, 
    EMAIL_INNER_HEADER, 
    IS_FOR_PAY_CHECK_BOX_HEADER, 
    IS_FOR_PAY_HEADER, 
    MENTAL_SPEC_INNER_HEADER, 
    NAME_INNER_HEADER, 
    NAME_OUTER_HEADER, 
    NEURO_DIFF_INNER_HEADER, 
    PHONE_INNER_HEADER, 
    PRONOUN_INNER_HEADER, 
    PSY_REQUEST_INNER_HEADER, 
    PSY_REQUEST_OUTER_HEADER, 
    PSY_WISHES_ATNN_INNER_HEADER, 
    PSY_WISHES_INNER_HEADER, 
    PSY_WICHES_OUTER_HEADER, 
    PSY_WISHES_PLACEHOLDER, 
    QUESTIONNAIRE_HEADER, 
    REG_CONDITION_HEADER, 
    SEND_BUTTON_HEADER, 
    TELEGRAM_INNER_HEADER, 
    THERAPY_EXP_INNER_HEADER, 
    THERAPY_EXP_OUTER_HEADER, 
    TIMEZONE_INNER_HEADER 
} from '../../resources/QuestionnaireCreatorResources';
import { CREATE_QUE_SUCCESS_REF, HOME_REF, POST_QUESTIONNAIRE_REF } from '../../resources/Refs';
import { validateAge } from '../common/Validation';
import { INVALID_AGE_ERR } from '../../resources/ValidationResources';

//#endregion

const QuestionnaireCreator = () => {   
    // Constants
    const requestTimeout = 5000;
    
    // HOCs
    const [ageIsValid, setAgeIsValid] = useState(false);
    const [questionnaire, setQuestionnaire] = useState<Partial<Questionnaire>>({});
    const navigate = useNavigate();

    // Properties On Change
    const onChangePhone = (value: any) => {
        setQuestionnaire({...questionnaire, phone: value });
    };

    const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const age = e.target.value;

        const isValid = validateAge(age);
        
        setAgeIsValid(isValid);

        if (isValid) {
            setQuestionnaire({...questionnaire, age: Number(age) });
        } else {
            setQuestionnaire({...questionnaire, age: undefined });
        }
    }

    const onBlurAge = () => {
        if (!ageIsValid) {
            alert(INVALID_AGE_ERR);
        }
    }

    const onRegisterEnabled 
        = questionnaire.telegram
        && questionnaire.email
        && questionnaire.phone
        && questionnaire.name
        && questionnaire.pronouns
        && questionnaire.age
        && questionnaire.timeZone
        && questionnaire.neuroDifferences
        && questionnaire.mentalSpecifics
        && questionnaire.psyWishes
        && questionnaire.psyQuery
        && questionnaire.therapyExperience;

    // Actions
    async function registerQuestionnaire() {
        const questionnaireJson = JSON.stringify(questionnaire);
        
        const response = await axios.post(
            POST_QUESTIONNAIRE_REF, 
            questionnaireJson,
            {
                timeout: requestTimeout,
                headers: { 'Content-Type': 'application/json' }
            });

        alert('Addition result: ' + response.statusText); 
        
        if (response.statusText === 'OK') {
            navigate(`../${CREATE_QUE_SUCCESS_REF}`);
        }
    }

    // Render
    return (        
        <FormControl style={questionnaireFormStyle}>
            <div><Typography variant='h4'>{QUESTIONNAIRE_HEADER}</Typography></div>
            <br />

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{NAME_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <TextField 
                        label={NAME_INNER_HEADER} 
                        onChange={e => setQuestionnaire({...questionnaire, name: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <TextField 
                        label={PRONOUN_INNER_HEADER}
                        onChange={e => setQuestionnaire({...questionnaire, pronouns: e.target.value})} 
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{CONTACTS_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <MuiTelInput 
                        defaultCountry='RU'
                        label={PHONE_INNER_HEADER} 
                        onChange={onChangePhone}
                        required
                        value={questionnaire.phone}
                    />
                    <br />
                    <TextField 
                        label={EMAIL_INNER_HEADER}
                        onChange={e => setQuestionnaire({...questionnaire, email: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <TextField 
                        label={TELEGRAM_INNER_HEADER}
                        onChange={e => setQuestionnaire({...questionnaire, telegram: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                </AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{ABOUT_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <TextField 
                        label={AGE_INNER_HEADER}
                        onBlur={onBlurAge}
                        onChange={onChangeAge} 
                        required
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <TextField 
                        label={TIMEZONE_INNER_HEADER}
                        onChange={e => setQuestionnaire({...questionnaire, timeZone: e.target.value})}  
                        required
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <TextField 
                        label={NEURO_DIFF_INNER_HEADER}
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, neuroDifferences: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant='body1'>{MENTAL_SPEC_INNER_HEADER}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, mentalSpecifics: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{PSY_WICHES_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography 
                        fontStyle={'italic'} 
                        variant='body1'>{PSY_WISHES_INNER_HEADER}<br />{PSY_WISHES_ATNN_INNER_HEADER}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, psyWishes: e.target.value})} 
                        placeholder={PSY_WISHES_PLACEHOLDER}
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{PSY_REQUEST_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <TextField 
                        label={PSY_REQUEST_INNER_HEADER} 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, psyQuery: e.target.value})} 
                        required
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <Typography variant='h6'>{THERAPY_EXP_OUTER_HEADER}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography
                        fontStyle={'italic'} 
                        variant='body1'>{THERAPY_EXP_INNER_HEADER}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, therapyExperience: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant='outlined' />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant='body1'>{IS_FOR_PAY_HEADER}
                    </Typography>
                    <FormControlLabel 
                        control={<Checkbox onChange={e => setQuestionnaire({...questionnaire, isForPay: Boolean(e.target.value)})}/>}  
                        label={IS_FOR_PAY_CHECK_BOX_HEADER} />
                </AccordionDetails>
            </Accordion>

            <br/>  
            <Typography 
                fontStyle={'italic'} 
                variant='body1'>{REG_CONDITION_HEADER}
            </Typography>

            <Button 
                disabled={!onRegisterEnabled}
                onClick={registerQuestionnaire}
                style={questionnaireButtonStyle}
                variant={'contained'}>
                    {SEND_BUTTON_HEADER}
            </Button>  
            <br/>   

            <Link 
                className='link_field'
                variant='body2'
                href={HOME_REF}>
                {BACK_TO_HOME_BUTTON_HEADER}
            </Link>     
            <br/>    
        </FormControl>              
    );
}

export default QuestionnaireCreator;