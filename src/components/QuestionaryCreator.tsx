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
import { Questionary } from '../models/Questionary';
import { questionaryFormStyle, questionaryEntryStyle, questionaryButtonStyle } from '../styles/QuestionaryStyles';
import { aboutHeaderOuter, ageHeaderInner, backToHomeButtonHeader, contactsHeaderOuter, eMailHeaderInner, isForPayCheckBoxHeader, isForPayHeader, mentalSpecHeaderInner, nameHeaderInner, nameHeaderOuter, neuroDiffHeaderInner, phoneHeaderInner, pronounHeaderInner, psyRequestHeaderInner, psyRequestHeaderOuter, psyWishAttentionHeaderInner, psyWishesHeaderInner, psyWishesHeaderOuter, psyWishesPlaceholder, questionaryCreateHeader, sendButtonHeader, telegramHeaderInner, therapyExpHeaderInner, therapyExpHeaderOuter, timezoneHeaderInner } from '../resources/QuestionaryCreatorResources';
import { localhostPath } from '../resources/TempConfig';

const QuestionaryCreator = () => {   
    // Constants
    const postQuestionaryRef = `${localhostPath}/questionnaire`;
    const requestTimeout = 5000;
    const timeLocale = 'en';
    const dateFormat = 'yyyy-MM-DDTHH:mm:ss';
    const maxAge = 151;
    const createQuestionarySuccessRef = "../createQuestionarySuccess";
    const homeRef = "/home";
    
    // HOCs
    const [questionary, setQuestionary] = useState<Partial<Questionary>>({});
    let navigate = useNavigate();

    // Properties On Change
    const onChangePhone = (value: any) => {
        setQuestionary({...questionary, contactPhone: value });
    };

    const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rule = /^[0-9\b]+$/;
        if ((e.target.value === '' 
            || rule.test(e.target.value))
            && Number(e.target.value) < maxAge) {
            setQuestionary({...questionary, age: Number(e.target.value) });
        }
        else {
            e.target.value = e.target.value.slice(0, -1);
        }
    }

    // Actions
    async function registerQuestionary() {
        Moment.locale(timeLocale);
        questionary.registrationDate = 
            String(Moment(new Date()).format(dateFormat));
        let questionaryJson = JSON.stringify(questionary);
        
        const response = await axios.post(
            postQuestionaryRef, 
            questionaryJson,
            {
                timeout: requestTimeout,
                headers: { 'Content-Type': 'application/json' }
            });

        alert('Addition result: ' + response.statusText); 
        
        if (response.statusText === 'OK') {
            navigate(createQuestionarySuccessRef);
        }
    };

    // Render
    return (        
        <FormControl style={questionaryFormStyle}>
            <div><Typography variant="h4">{questionaryCreateHeader}</Typography></div>
            <br />

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                <Typography variant="h6">{nameHeaderOuter}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField 
                        label={nameHeaderInner} 
                        onChange={e => setQuestionary({...questionary, name: e.target.value})} 
                        required
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={pronounHeaderInner}
                        onChange={e => setQuestionary({...questionary, pronouns: e.target.value})} 
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                </AccordionDetails>
            </Accordion>

            <Accordion>
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
                        value={questionary.contactPhone}
                    />
                    <br />
                    <TextField 
                        label={eMailHeaderInner}
                        onChange={e => setQuestionary({...questionary, contactEmail: e.target.value})} 
                        required
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={telegramHeaderInner}
                        onChange={e => setQuestionary({...questionary, contactTelegram: e.target.value})} 
                        required
                        style={questionaryEntryStyle}
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
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={timezoneHeaderInner}
                        onChange={e => setQuestionary({...questionary, timeZone: e.target.value})}  
                        required
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={neuroDiffHeaderInner}
                        multiline
                        onChange={e => setQuestionary({...questionary, neuroDifferences: e.target.value})} 
                        rows={5}
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{mentalSpecHeaderInner}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionary({...questionary, mentalSpecifics: e.target.value})} 
                        rows={5}
                        style={questionaryEntryStyle}
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
                        onChange={e => setQuestionary({...questionary, psyWishes: e.target.value})} 
                        placeholder={psyWishesPlaceholder}
                        rows={5}
                        style={questionaryEntryStyle}
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
                        onChange={e => setQuestionary({...questionary, psyRequest: e.target.value})} 
                        required
                        rows={5}
                        style={questionaryEntryStyle}
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
                        onChange={e => setQuestionary({...questionary, therapyExperience: e.target.value})} 
                        rows={5}
                        style={questionaryEntryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{isForPayHeader}
                    </Typography>
                    <FormControlLabel 
                        control={<Checkbox onChange={e => setQuestionary({...questionary, isForPay: Boolean(e.target.value)})}/>}  
                        label={isForPayCheckBoxHeader} />
                </AccordionDetails>
            </Accordion>

            <Button 
                onClick={registerQuestionary}
                style={questionaryButtonStyle}
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

export default QuestionaryCreator;

