import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_PSYCHOLOGISTS_REF } from '../../resources/Refs';

// MUI
import { 
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

// App
import { 
    DESCRIPTION_HEADER, 
    MORE_BUTTON_HEADER, 
    EXCLUSION_QUERIES_HEADER, 
    INCLUDING_QUERIES_HEADER 
} from '../../resources/PsychologistCardResources';

// Component Properties
interface Props {
    psyIndex: number,
    psyImage: string,
    psyName: string,
    psyDescription: string,
    includingQueries: string,
    excludingQueries: string
}

const PsychologistCard = (props: Props) => {

    const [image, setImage] = useState<string>();

    useEffect(() => {
        getImageAsync();
    });

    async function getImageAsync() {   
        const response = await axios.get(`${GET_PSYCHOLOGISTS_REF}/${props.psyIndex}/content?type=1`); 
        const data = JSON.parse(JSON.stringify(response.data));
        setImage(data[0].fileContents);                
    }

    return (
        <Card
            key={props.psyIndex} 
            sx={{ 
                minWidth: 300, 
                maxWidth: 300, 
                minHeight: 400, 
                marginLeft: 3 
            }}>
            
            <CardMedia
                component='img'
                alt='cat'
                height='auto'
                src={`data:image/png;base64, ${image}`} />
            
            <CardContent>
                <Typography 
                    gutterBottom variant='h5' 
                    component='div'>
                    {props.psyName}
                </Typography>
                <br/>

                <Typography
                    gutterBottom variant='subtitle2' 
                    component='div'
                    fontWeight={'bold'}>
                    {DESCRIPTION_HEADER}
                </Typography>
                <Typography 
                    variant='body2'
                    color='text.secondary'>
                    {props.psyDescription}
                </Typography>
                <br/>

                <Typography
                    gutterBottom variant='subtitle2' 
                    component='div'
                    fontWeight={'bold'}>
                    {INCLUDING_QUERIES_HEADER}
                </Typography>
                <Typography 
                    variant='body2' 
                    color='text.secondary'>
                    {props.includingQueries}
                </Typography>
                <br/>

                <Typography 
                    gutterBottom variant='subtitle2' 
                    component="div" 
                    fontWeight={'bold'}>
                    {EXCLUSION_QUERIES_HEADER}
                </Typography>
                <Typography 
                    variant='body2'
                    color='text.secondary'>
                    {props.excludingQueries}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size='small'>{MORE_BUTTON_HEADER}</Button>
            </CardActions>
        </Card>
    );
}

export default PsychologistCard;