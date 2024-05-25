import { Button, Card, CardActions, CardContent, Grid, Typography } 
from "@mui/material";

function QuestionnaireSuccess()
{    
    return (   
        <Grid item={true} xs={9}
                  md={5}>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 24}} color="text.secondary" gutterBottom>
                            Анкета успешно отправлена!
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href="/">Back</Button>
                    </CardActions>
                </Card>
            </Grid>          
    );
}

export default QuestionnaireSuccess;
