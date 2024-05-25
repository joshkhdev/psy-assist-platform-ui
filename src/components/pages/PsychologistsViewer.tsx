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
    getPsychologistsRef, 
    homeRef 
} from '../../resources/Refs';
import { 
    catPics, 
    pageHeader } from '../../resources/PsychologistsViewerResources';
import { backToHomeButtonHeader } from '../../resources/CommonResources';

const PsychologistsViewer = () => {
    // HOCs
    let [cards, setCards] = React.useState([new PsychologistProfileCard()]);
    
    useEffect(() => {
        getPsychologists();
     });

     // Actions
    async function getPsychologists() {
        const response = await axios.get<string>(getPsychologistsRef);
        const items: Array<PsychologistProfile> = JSON.parse(JSON.stringify(response.data));
        const sliderObjects = items.map(item => new PsychologistProfile(item));
        
        cards = [];
        let index = 0;
        sliderObjects.forEach((element) => {
            let newCard = new PsychologistProfileCard();
            newCard.image = catPics[index];
            newCard.name = element.name;
            newCard.description = element.description;
            newCard.requestsInclude = element.requestsInclude;
            newCard.requestsExclude = element.requestsExclude;
            cards.push(newCard);
            index++;
        });
        
        setCards(cards);
    };
  
    // Render
    return (
        <FormControl style={psychologistFormStyle}>
        <div className="root">
            <div>
                <NavigationBar />
                <h2>{pageHeader}</h2>
            </div>
            <br/>

            <Grid container spacing={1}>
                {cards.map((card, index) => {
                    const { image, name, description, requestsInclude, requestsExclude } = card;
                    return (
                    <Grid item>
                        <PsychologistCard 
                            psyIndex={index}
                            psyImage={image}
                            psyName={name}
                            psyDescription={description}
                            psyRequestsInclude={requestsInclude}
                            psyRequestsExclude={requestsExclude} />
                        <br/>
                    </Grid>
                    );
                })}
            </Grid>
            <br/>

            <Link 
                className="link_field"
                variant="body2"
                href={homeRef}>
                {backToHomeButtonHeader}
            </Link>

      </div>
      </FormControl>
    );
}

export default PsychologistsViewer;