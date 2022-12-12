import { useState, useEffect } from "react";
import AddCalendar from "./calendarHome/AddCalendar"; // a plugin! 
import UpdateCalendar from "./calendarHome/UpdateCalendar"; // a plugin!
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import toastr from "toastr";
import NotificationTypeRadio from "./calendarHome/NotificationTypeRadio";

import About from "./calendarHome/About";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import moment from "moment/moment";
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import interactionPlugin from "@fullcalendar/interaction";



const App = ({}) => {
    const [events, setEvents] = useState([]),
        [eventTypes, setEventTypes] = useState([]),
        [eventTypeID,seteventTypeID] = useState('');

    useEffect(() => {
        axios
            .get("/getAllEvents", {})
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var calendarData = response.data[i];

                    const dayplus1moments = moment(calendarData.end)
                        .add(1, "d")
                        .format("YYYY-MM-DD");

                    response.data[i] = {
                        id: calendarData.id,
                        title: calendarData.title,
                        start: calendarData.start,
                        end: dayplus1moments,
                        eventTypeId: calendarData.eventTypeId
                    };
                }
                setEvents(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
        axios
            .get("/getAllEventTypes", {})
            .then(function (response) {
                setEventTypes(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    }, []);

    const addEvent = (event) => {
        const dayplus1moments = moment(event.dayTo)
            .add(1, "d")
            .format("YYYY-MM-DD");
        axios
            .post("/saveEvent", event)
            .then(function (response) {
                setEvents([
                    ...events,
                    {
                        id: response.data.id,
                        title: event.text,
                        start: event.dayFrom,
                        end: dayplus1moments,
                    },
                ]);
                swal.fire("Added!", "The event has been added.", "success");
                toastr.success("Event Added!");
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    

    const refreshEvents = () => {
      axios
          .get("/getAllEvents", {})
          .then(function (response) {
              for (var i = 0; i < response.data.length; i++) {
                  var calendarData = response.data[i];

                  const dayplus1moments = moment(calendarData.end)
                      .add(1, "d")
                      .format("YYYY-MM-DD");

                  response.data[i] = {
                      id: calendarData.id,
                      title: calendarData.title,
                      start: calendarData.start,
                      end: dayplus1moments,
                      eventTypeId: calendarData.eventTypeId
                  };
              }
              setEvents(response.data);
          })
          .catch((error) => {
              console.log("ERROR:: ", error.response.data);
          });
  };


    const eventRadioOnChange = async(e) => {
      seteventTypeID(e.target.value)
       await axios
        .post("/filterEvents", {eventTypeId:e.target.value})
        .then(function (response) {
          
          for (var i = 0; i < response.data.length; i++) {
            var calendarData = response.data[i];

            const dayplus1moments = moment(calendarData.end)
                .add(1, "d")
                .format("YYYY-MM-DD");

            response.data[i] = {
                id: calendarData.id,
                title: calendarData.title,
                start: calendarData.start,
                end: dayplus1moments,
                eventTypeId: calendarData.eventTypeId
            };
        }
          setEvents(response.data);
          
        })
        .catch((error) => {
            console.log("ERROR:: ", error.response.data);
        });
    }

    

    const  eventClicked = (info) => {
        const MySwal = withReactContent(swal)

        
            info.jsEvent.preventDefault(); // don't let the browser navigate
            
            const obj = JSON.parse(JSON.stringify(info.event));
            console.log(obj)
            const eventTypeId = obj.extendedProps.eventTypeId;

            console.log(`Event Type ID: ${eventTypeId}\n`);

            const swalWithBootstrapButtons = MySwal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  denyButton:'btn btn-info',
                  cancelButton: 'btn btn-danger'
                 
                },
                buttonsStyling: false
              })
            var swalObj = {
                title: <p>Hello World</p>,
                html: <><div>
                <b>Title:</b> {info.event.title} <br></br>
                <b>Date:</b> {moment(info.event.start).format('MM/DD/YYYY')} <b>to</b> 
                {moment(info.event.end).format('MM/DD/YYYY')}
                </div></>,
                icon: "info",
                showCancelButton: true,
                showDenyButton: (eventTypeId != 47),
                showConfirmButton: (eventTypeId != 47),
                confirmButtonColor:"#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText:"Delete Event",
                denyButtonText:"Edit",
                cancelButtonText: "Close"
            
            };


            swalWithBootstrapButtons.fire(swalObj).then((result) => {
        console.log(result);
                switch(true){


                    case result.isConfirmed:
                        axios
                        .post("/deleteEvent", { eventId: info.event.id })
                        .then(function (response) {
                            info.event.remove();
                            
                            refreshEvents();
                            
                        })
                        .catch((error) => {
                            console.log("ERROR:: ", error);
                        });
                        swal.fire("Deleted!", "The event has been deleted.", "success");
                    break;

                    case result.isDenied:
                        console.log(obj.id)

                        axios
                        .post("/retrieveEvent", { eventId: parseInt(obj.id) })
                        .then(function (response) {
                            console.log(response.data)
                             MySwal.fire({
                                title: <>Update Event</>,
                                html:<>
                                     <UpdateCalendar onAddEvent={addEvent} 
                                        obj = {{id: obj.id,
                                            text: response.data.eventName, 
                                            dayFrom: moment(response.data.eventDateFrom).format('YYYY-MM-DD'),
                                            dayTo: moment(response.data.eventDateTo).format('YYYY-MM-DD'),
                                            eventTypeId: response.data.eventTypeId,
                                            eventZoomLink:response.data.eventZoomLink,
                                            eventDetails:response.data.eventDetails,
                                            eventNotificationSchedule:response.data.eventNotificationSchedule
                                            }} />

                                    </>,
                                focusConfirm: false,
                                showConfirmButton: false,
                                preConfirm: () => {
                                  return [
                                    document.getElementById('swal-input1').value,
                                    document.getElementById('swal-input2').value
                                  ]
                                }
                              })
                            
                        })
                        .catch((error) => {
                            console.log("ERROR:: ", error);
                        });


          
                          
           
                    break;
                }
               


                    /*
                    if (result.isConfirmed) {
                        axios
                            .post("/deleteEvent", { eventId: info.event.id })
                            .then(function (response) {
                                info.event.remove();
                                
                                refreshEvents();
                                
                            })
                            .catch((error) => {
                                console.log("ERROR:: ", error);
                            });
                            Swal.fire("Deleted!", "The event has been deleted.", "success");
                    }*/
                    
       
                
 
    
        });
        

    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <AddCalendar onAddEvent={addEvent} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header">
                                            NCIP Welcome to Calendar of
                                            Activities
                                        </div>
                                        <div className="col-md-12">
                                            <form>
                                            <br></br>
                                                <label>Filter By Event Type:</label> <br></br>

                                                {eventTypes.map((eventType) => {
                                                    return <><input  type="radio" id = {eventType.eventTypeId} key={eventType.eventTypeId} value={eventType.eventTypeId} name="eventType" onChange = {eventRadioOnChange}/> 
                                                    &nbsp;
                                                    <label htmlFor={eventType.eventTypeId}>{eventType.eventTypeName}</label> <br></br></>;
                                                })}
                                            </form>

                                            <FullCalendar
                                                eventClick={eventClicked}
                                                plugins={[dayGridPlugin]}
                                                initialView="dayGridMonth"
                                                events={events}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-copyright text-center py-3">
                                {location.pathname !== "/about" && (
                                    <>
                                        <p>Copyright NCIP @2022</p>
                                        <Link to="/about">About</Link>
                                    </>
                                )}
                            </div>
                        </>
                    }
                />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
};

export default App;
