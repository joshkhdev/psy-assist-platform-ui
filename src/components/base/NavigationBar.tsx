import Container from '@mui/material/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';

import { 
    CREATE_QUESTIONNAIRE_REF, 
    HOME_REF, 
    PSYCHOLOGIST_CATALOG_REF
} from '../../resources/Refs';

function NavigationBar() {    
    return (   
        <Navbar 
            bg='light'
            data-bs-theme='light'>
            <Container>
            <Navbar.Brand href={HOME_REF}>Psy Assist Platform</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href={HOME_REF}>В Начало</Nav.Link>
                <Nav.Link href={CREATE_QUESTIONNAIRE_REF}>Оставить заявку</Nav.Link>
                <Nav.Link href={PSYCHOLOGIST_CATALOG_REF}>Каталог психологов</Nav.Link>
            </Nav>
            </Container>
        </Navbar>        
    );
}

export default NavigationBar;