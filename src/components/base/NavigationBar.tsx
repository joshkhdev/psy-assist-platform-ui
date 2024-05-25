import Container from "@mui/material/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

function NavigationBar() {    
    return (   
        <Navbar 
            bg="light" 
            data-bs-theme="light">
            <Container>
            <Navbar.Brand href="/">Psy Assist Platform</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">В Начало</Nav.Link>
                <Nav.Link href="createQuestionnaire">Оставить заявку</Nav.Link>
                <Nav.Link href="psychologists">Каталог психологов</Nav.Link>
            </Nav>
            </Container>
        </Navbar>        
    );
}

export default NavigationBar;