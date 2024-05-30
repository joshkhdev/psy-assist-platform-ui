//#region Imports

// System
import axios from 'axios';
import React, { useEffect } from 'react';
// MUI
import { 
    FormControl,
    Grid,
    Link
} from '@mui/material';
// Components
import NavigationBar from '../base/NavigationBar';
import PsychologistCard from '../base/PsychologistCard';
// Classes
import { PsychologistProfile } from '../../models/PsychologistProfile';
import { PsychologistProfileCard } from '../../models/PsychologistProfileCard';
// Styles and Resources
import { psychologistFormStyle } from '../../styles/PsychologistViewerStyles';
import { 
    GET_PSYCHOLOGISTS_REF, 
    HOME_REF 
} from '../../resources/Refs';
import { 
    CAT_PICS, 
    PSY_PAGE_HEADER } from '../../resources/PsychologistsViewerResources';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';

//#endregion

const PsychologistsViewer = () => {
    // HOCs
    let [cards, setCards] = React.useState([new PsychologistProfileCard()]);
    
    useEffect(() => {
        getPsychologists();
     });

     // Actions
    async function getPsychologists() {
        const response = await axios.get<string>(GET_PSYCHOLOGISTS_REF);
        const items: Array<PsychologistProfile> = JSON.parse(JSON.stringify(response.data));
        const sliderObjects = items.map(item => new PsychologistProfile(item));
        
        cards = [];
        let index = 0;
        sliderObjects.forEach((element) => {
            let newCard = new PsychologistProfileCard();
            newCard.image = CAT_PICS[index];
            newCard.name = element.name;
            newCard.description = element.description;
            newCard.includingQueries = element.includingQueries;
            newCard.exclusionQueries = element.exclusionQueries;
            cards.push(newCard);
            index++;
        });
        
        setCards(cards);
    };
  
    // Render
    return (
        <FormControl style={psychologistFormStyle}>
        <div className='root'>
            <div>
                <NavigationBar />
                <h2>{PSY_PAGE_HEADER}</h2>
            </div>
            <br/>

            <Grid container spacing={1}>
                {cards.map((card, index) => {
                    const { 
                        image, 
                        name, 
                        description, 
                        includingQueries, 
                        exclusionQueries 
                    } = card;
                    
                    return (
                    <Grid item>
                        <PsychologistCard 
                            psyIndex={index}
                            psyImage={image}
                            psyName={name}
                            psyDescription={description}
                            psyRequestsInclude={includingQueries}
                            psyRequestsExclude={exclusionQueries} />
                        <br/>
                    </Grid>
                    );
                })}
            </Grid>
            <br/>

            <Link 
                className='link_field'
                variant='body2'
                href={HOME_REF}>
                {BACK_TO_HOME_BUTTON_HEADER}
            </Link>

      </div>
      </FormControl>
    );
}

export default PsychologistsViewer;