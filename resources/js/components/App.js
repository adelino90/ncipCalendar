import { useState, useEffect } from 'react'
import AddCalendar from './calendarHome/AddCalendar' // a plugin!
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import toastr from "toastr"
import NotificationTypeRadio from './calendarHome/NotificationTypeRadio';
//import ToastMessagejQuery from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";
import About from './calendarHome/About'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 

 const App = ({})=> {  
    const [events,setEvents] = useState([]),
    [eventTypes,setEventTypes] = useState([])

    useEffect(() => {
        axios.get('/getAllEvents', {})
          .then(function (response) {
                  setEvents(response.data)
                }
              )
          .catch(error => {
              console.log("ERROR:: ",error.response.data);
        });
        axios.get('/getAllEventTypes', {})
        .then(function (response) {
            setEventTypes(response.data)
                }
            )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
        });
        
      },[]);
      const addEvent = (event) => {
        axios.post('/saveEvent', event)
          .then(function (response) {
            setEvents([...events,{title:event.text,start:event.dayFrom,end:event.dayTo}])
            toastr.success("Event Added!");
                }
              )
          .catch(error => {
              console.log("ERROR:: ",error.response.data);
              });   
      }
      
      const eventClicked = (info) =>{
        info.jsEvent.preventDefault(); // don't let the browser navigate
        console.log(info.event.title)
        if (info.event.url) {
            window.open(info.event.url);
        }
      }
        return (
                <Router>
                    <Routes>
                            <Route path='/' element={
                            <>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <AddCalendar onAddEvent = {addEvent}/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header">NCIP Welcome to Calendar of Activities</div>
                                                <div className="col-md-12">
                                                        <FullCalendar eventClick ={eventClicked}
                                                            plugins={[ dayGridPlugin ]}
                                                            initialView="dayGridMonth"
                                                            events={events}
                                                        />
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='footer-copyright text-center py-3'>
                                {location.pathname !== '/about' && (
                                    <>
                                        <p>Copyright NCIP @2022</p>
                                        <Link to="/about">About</Link>
                                    </>
                                    )}
                                </div>
                            </>
                            }
                            />
                            <Route path='/about' element={<About />}/>
                        </Routes>
                   
                </Router>
                  
        );
    
}


export default App;