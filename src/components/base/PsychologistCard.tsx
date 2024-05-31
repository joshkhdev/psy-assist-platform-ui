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
                height='140'
                image={props.psyImage} />
            
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