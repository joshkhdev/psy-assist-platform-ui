// MUI
import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Grid, 
    Typography 
} from '@mui/material';
// Styles and Resources
import { HOME_REF } from '../../resources/Refs';

function NoContent() {    
    return (   
        <Grid item={true} xs={9}
                  md={5}>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 24}} color='text.secondary' gutterBottom>
                            Страница не найдена: 404
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' href={HOME_REF}>Back</Button>
                    </CardActions>
                </Card>
            </Grid>          
    );
}

export default NoContent;
