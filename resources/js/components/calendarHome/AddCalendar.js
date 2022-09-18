import { useState } from 'react'

const AddCalendar= ({ onAdd }) => {
    const [text,setText] = useState('') ,
    [day,setDay] = useState(''),
    [reminder,setReminder] = useState(false);
    const onSubmit = (e) =>{
        e.preventDefault();    
        if(!text){
            alert("Please add Task Text")
            return;
        }
        onAdd({text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)
    };
  return (
    <form className = 'add-form' onSubmit={onSubmit}>
        <div className='form-group'>
            <label>Event</label>
            <input type='text' className='form-control' placeholder='Add Event' value ={text} onChange={(e) => setText(e.target.value)}/>

            <label>Day & Time From</label>
            <input type='text' className='form-control' placeholder='Add Day and Time' value ={day} onChange={(e) => setDay(e.target.value)}/>

            <label>Day & Time To</label>
            <input type='text' className='form-control' placeholder='Add Day and Time' value ={day} onChange={(e) => setDay(e.target.value)}/>

            <label>Set Reminder</label>
            <input type='checkbox' className='form-control-input' checked={reminder} value ={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>
        <input type = 'submit' className='btn btn-primary' value='Save Event'/>
    </form>
  )
}

export default AddCalendar
