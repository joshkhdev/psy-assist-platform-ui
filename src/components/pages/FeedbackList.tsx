// System
import { 
    useEffect, 
    useState } from 'react';
import axios from 'axios';
import moment from 'moment';
// MUI
import { Link } from '@mui/material';
// Classes
import { FeedbackResponse } from '../../models/FeedbackResponse';
// Styles and Resources
import { GET_FEEDBACKS_REF, HOME_REF } from '../../resources/Refs';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import { 
    feedbackListContentStyle, 
    tableFeedbackTextLineStyle 
} from '../../styles/FeedbackListStyles';

function FeedbackList() {
    // HOCs
    const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>();
    useEffect(() => { getFeedbackDataAsync(); }, []);

    // Actions
    async function getFeedbackDataAsync() {        
        const response = await axios.get<string>(GET_FEEDBACKS_REF);
        const data = JSON.parse(JSON.stringify(response.data));
        console.log(data);
        setFeedbacks(data);
    }

    const handleClick = (state: FeedbackResponse) => {
        console.log('feedback ', state);
        alert(state.feedbackText);
    }      

    // Table
    const contents = feedbacks === undefined
        ? <p><em>Loading...</em></p>
        : <table className='table table-hover' aria-labelledby='tabelLabel'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Дата отзыва</th>
                    <th>Telegram</th>
                    <th>Текст отзыва</th>
                </tr>
            </thead>
            <tbody>
                {feedbacks.map(elem =>
                    <tr   
                        key={elem.id} 
                        onClick={() => handleClick(elem)}>                        
                        <td>{elem.id}</td>
                        <td>{moment(elem.feedbackDate).format('lll')}</td>
                        <td>{elem.telegram}</td>
                        <td style={tableFeedbackTextLineStyle}>{elem.feedbackText}</td>
                    </tr>
                )}            
            </tbody>            
        </table>;    

    // Render
    return (
        <div style={feedbackListContentStyle}>
            <h2 id='tabelLabel'>Просмотр отзывов</h2>
            {contents} 
            <Link 
                className='link_field'
                variant='body2'
                href={HOME_REF}>
                {BACK_TO_HOME_BUTTON_HEADER}
            </Link>             
        </div>
    );   
}

export default FeedbackList;
