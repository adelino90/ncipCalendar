import { useState, useEffect,useRef  } from 'react'
import ReactDOM from 'react-dom/client';
import {Collapse} from 'react-collapse';
import SimpleReactValidator from 'simple-react-validator';
import NotificationTypeRadio from './NotificationTypeRadio';

const AddCalendar= ({ onAddEvent }) => {
   
    const [text,setText] = useState('') ,
    [dayFrom,setDayFrom] = useState(''),
    [dayTo,setDayTo] = useState(''),
    [collapse,setCollapse] = useState(false),
    [eventTypeId,setEventType] = useState(''),
    [eventTypes,setEventTypes] = useState([]),
    [eventZoomLink,setEventZoomLink] = useState(''),
    [eventDetails,setEventEventDetails] = useState(''),
    [eventNotificationSchedule,seteventNotificationSchedule] = useState('');
    const [, forceUpdate] = useState()


    const validator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}))

    useEffect(() => {
      axios.get('/getAllEventTypes', {})
       .then(function (response) {
         setEventTypes(response.data)
             }
           )
       .catch(error => {
           console.log("ERROR:: ",error.response.data);
           });
          
   },[]);
   
   
    const onSubmit = (e) =>{
        e.preventDefault();    
        if (validator.current.allValid()) {
          onAddEvent({text,dayFrom,dayTo,eventTypeId,eventDetails,eventNotificationSchedule,eventZoomLink})
          setText('')
          setDayFrom('')
          setDayTo('')
          setEventZoomLink('')
          seteventNotificationSchedule('')
          setEventEventDetails('')
          setEventType('')
          document.getElementById(eventNotificationSchedule).checked = false
          validator.current.hideMessages();
        }else {
          validator.current.showMessages();
          // rerender to show messages for the first time
          forceUpdate(2)
        }

    };

    
    const radioOnChange = (e) => {
        seteventNotificationSchedule(e.target.value)
      }

    const clickCollapse = (e) =>{
      if (collapse) 
        setCollapse(false)
      else
        setCollapse(true)
    };
   
  return (
    <form className = 'add-form' onSubmit={onSubmit}>
        <div className='form-group'>
            <label>Event</label>
            <input type='text' className='form-control' placeholder='Add Event' value ={text} onChange={(e) => setText(e.target.value)}/>
            <div style={{color: "red"}}>{validator.current.message('text', text, 'required')}</div>
        </div>
        <div className='form-group'>
            <label>Day & Time From</label>
            <input type='date' className='form-control' placeholder='Add Event' onChange={(e) =>setDayFrom(e.target.value)} value={dayFrom}  />
            <div style={{color: "red"}}>{validator.current.message('dayFrom', dayFrom, 'required')}</div>

            <label>Day & Time To</label>
            <input type='date' className='form-control' placeholder='Add Event' onChange={(e) =>setDayTo(e.target.value)} value={dayTo} />
            <div style={{color: "red"}}>{validator.current.message('dayTo', dayTo, 'required')}</div>
        </div>
        <div className='form-group'>
            <select className="form-select" aria-label="Default select example" value={eventTypeId} onChange={(e) =>setEventType(e.target.value)} defaultValue={'DEFAULT'}>
              <option value="">Select Event Type</option>
              {eventTypes.map((eventType) => {
                  return <option key={eventType.eventTypeId} value={eventType.eventTypeId}>{eventType.eventTypeName}</option>;
              })}
            </select>
            <div style={{color: "red"}}>{validator.current.message('eventTypeId', eventTypeId, 'required')}</div>
        </div>
        <div className='form-group'>
            <button type="button" className="btn btn-light" onClick={clickCollapse}>Additional Details</button>
              <Collapse isOpened={collapse} style={{marginTop: "5px"}}>
              <div className="card card-body">
                  <div className="form-group">
                    <label htmlFor="EventDetails">Details:</label>
                    <textarea className="form-control" id="EventDetails" rows="3"  value={eventDetails}  onChange={(e) =>setEventEventDetails(e.target.value)}></textarea>
                  </div>
 
                  <div className="form-group">
                    <label htmlFor="EventZoomLink">Zoom Link</label>
                    <textarea className="form-control" id="EventZoomLink" rows="3"  value={eventZoomLink}  onChange={(e) =>setEventZoomLink(e.target.value)}></textarea>
                  </div>
                </div>
              </Collapse>
        </div>

        <NotificationTypeRadio onChange = {radioOnChange} value = {eventNotificationSchedule}/>
        <div style={{color: "red"}}>{validator.current.message('eventNotificationSchedule', eventNotificationSchedule, 'required')}</div>

        <input type = 'submit' className='btn btn-primary' value='Save Event'/>
    </form>
  )
}

export default AddCalendar
