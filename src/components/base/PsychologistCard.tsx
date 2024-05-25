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
    descriptionHeader, 
    moreButtonHeader, 
    psyRequestsExcludeHeader, 
    psyRequestsIncludeHeader 
} from '../../resources/PsychologistCardResources';

// Component Properties
interface Props {
    psyIndex: number,
    psyImage: string,
    psyName: string,
    psyDescription: string,
    psyRequestsInclude: string,
    psyRequestsExclude: string
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
                component="img"
                alt="cat"
                height="140"
                image={props.psyImage} />
            
            <CardContent>
                <Typography 
                    gutterBottom variant="h5" 
                    component="div">
                    {props.psyName}
                </Typography>
                <br/>

                <Typography
                    gutterBottom variant="subtitle2" 
                    component="div" 
                    fontWeight={'bold'}>
                    {descriptionHeader}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary">
                    {props.psyDescription}
                </Typography>
                <br/>

                <Typography
                    gutterBottom variant="subtitle2" 
                    component="div" 
                    fontWeight={'bold'}>
                    {psyRequestsIncludeHeader}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary">
                    {props.psyRequestsInclude}
                </Typography>
                <br/>

                <Typography 
                    gutterBottom variant="subtitle2" 
                    component="div" 
                    fontWeight={'bold'}>
                    {psyRequestsExcludeHeader}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary">
                    {props.psyRequestsExclude}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">{moreButtonHeader}</Button>
            </CardActions>
        </Card>
    );
}

export default PsychologistCard;