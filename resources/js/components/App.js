import AddCalendar from './calendarHome/AddCalendar' // a plugin!
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import About from './calendarHome/About'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 

 const App = ({})=> {  
        return (
            <div className="container">
                <Router>
                    <Routes>
                            <Route path='/home' element={
                            <>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <AddCalendar/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header">NCIP Welcome to Calendar of Activities</div>
                                                <div className="col-md-12">
                                                        <FullCalendar
                                                            plugins={[ dayGridPlugin ]}
                                                            initialView="dayGridMonth"
                                                        />
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                {location.pathname !== '/about' && (
                                    <>
                                        <p>Copyright NCIP @2022</p>
                                        <Link to="/about">About</Link>
                                    </>
                                    )}
                                </footer>
                            </>
                            }
                            />

                                
                            
                                <Route path='/about' element={<About />}/>
                        </Routes>
                   
                </Router>
                  
            </div>
        );
    
}


export default App;