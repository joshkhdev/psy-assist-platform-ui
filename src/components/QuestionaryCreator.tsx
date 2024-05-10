import { useState } from 'react';
import { Button, Link, TextField, Typography, FormControlLabel, Checkbox, FormControl } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Questionary } from '../models/questionary';

const QuestionaryCreator = () => {   

    // Constants
    const nameHeaderOuter = "Как вас зовут и какие местоимения вы используете?";
    const nameHeaderInner = "Напишите ваше имя";
    const pronounHeaderInner = "Как к вам обращаться (местоимение)";
    const aboutHeaderOuter = "Расскажите о себе";
    const ageHeaderInner = "Сколько вам полных лет?" ;
    const timezoneHeaderInner = "В каком часовом поясе вы живете?";
    const neuroDiffHeaderInner = "Какие у вас нейроотличия?" ;
    const mentalSpecHeaderInner = "Есть ли у вас другие ментальные особенности / растройства / другие состояния, о которых психологу будет важно знать?";
    const psyWishesHeaderOuter = "Укажите ваши предпочтения по психологам";
    const psyWishesHeaderInner = "Есть ли у вас предпочтение по тому, с кем из наших психологов вы будете работать? Вы также можете указать не имя специалиста, а другие параметры, которые для вас важны.";
    const psyWishAttentionHeaderInner = "Обращаем ваше внимание, что мы не можем гарантировать запись к конкретному психологу, но постараемся учесть ваши пожелания.";
    const psyWishesPlaceholder = "Например, вы хотите, чтобы консультации проводила женщина или специалист с определенным подходом";
    const psyRequestHeaderOuter = "Пожалуйста, сформулируйте ваш запрос";
    const psyRequestHeaderInner = "С какими трудностями вы сталкиваетесь?";
    const therapyExpHeaderOuter = "Опыт посещения психолога";
    const therapyExpHeaderInner = "Был ли у вас опыт прохождения психотерапии и/или посещения психолога?";
    const isForPayHeader = "Если вы готовы с самого начала заниматься с психологом платно, отметьте этот пункт:";
    const isForPayCheckBoxHeader = "Готов заниматься платно";

    // Styles
    const registrationFormStyle = {
        padding: "50px",
        background: "#f5f5f5",
        width: "70%",
        textAlign: "left"
    };

    const entryStyle = {
        backgroundColor: "#ffffff",
        marginTop: "20px",
        minWidth: "260px",
        width: "95%"
    };

    const buttonStyle = {
        marginTop: "20px",
        width: "120px"
    };

    // HOCs
    const [questionary, setQuestionary] = useState<Partial<Questionary>>({});

    // Properties On Change, age validation
    const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rule = /^[0-9\b]+$/;
        if ((e.target.value === '' 
            || rule.test(e.target.value))
            && Number(e.target.value) < 151) {
            setQuestionary({...questionary, age: Number(e.target.value) });
        }
        else {
            e.target.value = e.target.value.slice(0, -1);
        }
    }

    // Actions
    const registerQuestionary = () => {
        /* request required fields */
        let questionaryJson = JSON.stringify(questionary);

        alert('Good! ' + questionaryJson); 
    };

    // Render
    return (        
        <FormControl style={registrationFormStyle}>
            <div>
            <Typography variant="h4">Заполните анкету-заявку</Typography>
            </div>
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
                        onChange={e => setQuestionary({...questionary, name: e.target.value })} 
                        required
                        style={entryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={pronounHeaderInner}
                        onChange={e => setQuestionary({...questionary, pronouns: e.target.value })} 
                        style={entryStyle}
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
                        style={entryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={timezoneHeaderInner}
                        onChange={e => setQuestionary({...questionary, timeZone: e.target.value })}  
                        required
                        style={entryStyle}
                        variant="outlined" />
                    <br />
                    <TextField 
                        label={neuroDiffHeaderInner}
                        multiline
                        onChange={e => setQuestionary({...questionary, neuroDifferences: e.target.value })} 
                        rows={5}
                        style={entryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{mentalSpecHeaderInner}
                    </Typography>
                    <TextField 
                        multiline
                        onChange={e => setQuestionary({...questionary, mentalSpecifics: e.target.value })} 
                        rows={5}
                        style={entryStyle}
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
                        onChange={e => setQuestionary({...questionary, psyWishes: e.target.value })} 
                        placeholder={psyWishesPlaceholder}
                        rows={5}
                        style={entryStyle}
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
                        onChange={e => setQuestionary({...questionary, psyRequest: e.target.value })} 
                        required
                        rows={5}
                        style={entryStyle}
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
                        onChange={e => setQuestionary({...questionary, therapyExperience: e.target.value })} 
                        rows={5}
                        style={entryStyle}
                        variant="outlined" />
                    <br />
                    <br />
                    <Typography 
                        fontStyle={'italic'} 
                        variant="body1">{isForPayHeader}
                    </Typography>
                    <FormControlLabel 
                        control={<Checkbox onChange={e => setQuestionary({...questionary, isForPay: Boolean(e.target.value) })}/>}  
                        label={isForPayCheckBoxHeader} />
                </AccordionDetails>
            </Accordion>

            <Button 
                onClick={registerQuestionary}
                style={buttonStyle}
                variant={'contained'}>
                    Отправить
            </Button>  
            <br/>   

            <Link className="link_field"
                    variant="body2"
                    href="/home">
                    Вернуться на стартовую страницу
            </Link>     
            <br/>    
        </FormControl>              
    );
}

export default QuestionaryCreator;
