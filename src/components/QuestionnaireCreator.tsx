// переименовать Questionnaire -> nn
// Правки из чата

// System
import axios from 'axios';
import Moment from 'moment';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// MUI
import { Button, Link, TextField, Typography, FormControlLabel, Checkbox, FormControl } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiTelInput } from "mui-tel-input";

// App
import { Questionnaire } from '../models/Questionnaire';
import { questionnaireFormStyle, questionnaireEntryStyle, questionnaireButtonStyle } from '../styles/QuestionnaireStyles';
import { aboutHeaderOuter, ageHeaderInner, backToHomeButtonHeader, contactsHeaderOuter, eMailHeaderInner, isForPayCheckBoxHeader, isForPayHeader, mentalSpecHeaderInner, nameHeaderInner, nameHeaderOuter, neuroDiffHeaderInner, phoneHeaderInner, pronounHeaderInner, psyRequestHeaderInner, psyRequestHeaderOuter, psyWishAttentionHeaderInner, psyWishesHeaderInner, psyWishesHeaderOuter, psyWishesPlaceholder, questionnaireCreateHeader, sendButtonHeader, telegramHeaderInner, therapyExpHeaderInner, therapyExpHeaderOuter, timezoneHeaderInner } from '../resources/QuestionnaireCreatorResources';
import { localhostPath } from '../resources/TempConfig';

const QuestionnaireCreator = () => {   
    // Constants
    const postQuestionnaireRef = `${localhostPath}/questionnaire`;
    const requestTimeout = 5000;
    const timeLocale = 'en';
    const dateFormat = 'yyyy-MM-DDTHH:mm:ss';
    const maxAge = 151;
    const createQuestionnaireSuccessRef = "../createQuestionnaireSuccess";
    const homeRef = "/home";
    
    // HOCs
    const [questionnaire, setQuestionnaire] = useState<Partial<Questionnaire>>({});
    let navigate = useNavigate();

    // Properties On Change
    const onChangePhone = (value: any) => {
        setQuestionnaire({...questionnaire, contactPhone: value });
    };

    const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rule = /^[0-9\b]+$/;
        if ((e.target.value === '' 
            || rule.test(e.target.value))
            && Number(e.target.value) < maxAge) {
            setQuestionnaire({...questionnaire, age: Number(e.target.value) });
        }
        else {
            e.target.value = e.target.value.slice(0, -1);
        }
    }

    const onRegisterEnabled 
        = questionnaire.contactTelegram != undefined 
        && questionnaire.contactTelegram.length > 0
        && questionnaire.contactEmail != undefined 
        && questionnaire.contactEmail.length > 0
        && questionnaire.contactPhone != undefined 
        && questionnaire.contactPhone.length > 0
        && questionnaire.name != undefined 
        && questionnaire.name.length > 0
        && questionnaire.pronouns != undefined 
        && questionnaire.pronouns.length > 0
        && questionnaire.age != undefined 
        && questionnaire.age > 0
        && questionnaire.timeZone != undefined 
        && questionnaire.timeZone.length > 0
        && questionnaire.neuroDifferences != undefined 
        && questionnaire.neuroDifferences.length > 0
        && questionnaire.mentalSpecifics != undefined 
        && questionnaire.mentalSpecifics.length > 0
        && questionnaire.psyWishes != undefined 
        && questionnaire.psyWishes.length > 0
        && questionnaire.psyRequest != undefined 
        && questionnaire.psyRequest.length > 0
        && questionnaire.therapyExperience != undefined 
        && questionnaire.therapyExperience.length > 0;

    // Actions
    async function registerQuestionnaire() {
        Moment.locale(timeLocale);
        questionnaire.registrationDate = 
            String(Moment(new Date()).format(dateFormat));
        let questionnaireJson = JSON.stringify(questionnaire);
        
        const response = await axios.post(
            postQuestionnaireRef, 
            questionnaireJson,
            {
                timeout: requestTimeout,
                headers: { 'Content-Type': 'application/json' }
            });

        alert('Addition result: ' + response.statusText); 
        
        if (response.statusText === 'OK') {
            navigate(createQuestionnaireSuccessRef);
        }
    };

    // Render
    return (        
        <FormControl style={questionnaireFormStyle}>
            <div><Typography variant="h4">{questionnaireCreateHeader}</Typography></div>
            <br />

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{nameHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField 
                        label={nameHeaderInner} 
                        onChange={e => setQuestionnaire({...questionnaire, name: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={pronounHeaderInner}
                        onChange={e => setQuestionnaire({...questionnaire, pronouns: e.target.value})} 
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{contactsHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MuiTelInput 
                        defaultCountry='RU'
                        label={phoneHeaderInner} 
                        onChange={onChangePhone}
                        required
                        value={questionnaire.contactPhone}
                    />
                    <br />
                    <TextField 
                        label={eMailHeaderInner}
                        onChange={e => setQuestionnaire({...questionnaire, contactEmail: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={telegramHeaderInner}
                        onChange={e => setQuestionnaire({...questionnaire, contactTelegram: e.target.value})} 
                        required
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{aboutHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField 
                        label={ageHeaderInner} 
                        onChange={onChangeAge} 
                        required
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={timezoneHeaderInner}
                        onChange={e => setQuestionnaire({...questionnaire, timeZone: e.target.value})}  
                        required
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={neuroDiffHeaderInner}
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, neuroDifferences: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{mentalSpecHeaderInner}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, mentalSpecifics: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{psyWishesHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{psyWishesHeaderInner}<br />{psyWishAttentionHeaderInner}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, psyWishes: e.target.value})} 
                        placeholder={psyWishesPlaceholder}
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{psyRequestHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField 
                        label={psyRequestHeaderInner} 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, psyRequest: e.target.value})} 
                        required
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{therapyExpHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontStyle={'italic'} 
                        variant="body1">{therapyExpHeaderInner}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionnaire({...questionnaire, therapyExperience: e.target.value})} 
                        rows={5}
                        style={questionnaireEntryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{isForPayHeader}
                    </Typography>
                    <FormControlLabel 
                        control={<Checkbox onChange={e => setQuestionnaire({...questionnaire, isForPay: Boolean(e.target.value)})}/>}  
                        label={isForPayCheckBoxHeader} />
                </AccordionDetails>
            </Accordion>

            <Button 
                disabled={!onRegisterEnabled}
                onClick={registerQuestionnaire}
                style={questionnaireButtonStyle}
                variant={'contained'}>
                    {sendButtonHeader}
            </Button>  
            <br/>   

            <Link className="link_field"
                    variant="body2"
                    href={homeRef}>
                    {backToHomeButtonHeader}
            </Link>     
            <br/>    
        </FormControl>              
    );
}

export default QuestionnaireCreator;

