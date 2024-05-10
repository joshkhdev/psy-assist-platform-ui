import { Link } from "react-router-dom";

function Home()
{    
    return (     
        <div>  
            <div>
                <label>Home Page</label>   
            </div>
            <div>
                <div>
                    <Link to={'/createQuestionary'}>Оставить заявку </Link>
                </div> 
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                        Learn React
                </a>
            </div>
        </div>  
    );
}

export default Home;
