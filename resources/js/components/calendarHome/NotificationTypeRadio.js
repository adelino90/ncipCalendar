import { useState, useEffect } from 'react'
import {Collapse} from 'react-collapse';


const NotificationTypeRadio= ({ onChange }) => {
    const question= 'Reminder Frequency',
    [notificationTypes,setNotificationTypes] = useState( 
        [
            { text: 'Daily', value: 'Daily'},
            { text: 'Weeks Before', value: 'Weeks Before'}
        ])

    return (<>
                    <label htmlFor="notifSched">{question}:</label>
                    {notificationTypes.map((notificationType) => {
                        return(
                                <div className="form-check"  key={notificationType.value}>
                                      
                                        <input type="radio"
                                            id={notificationType.value}
                                            name="notifType"
                                            className="form-check-input notifCheck"
                                            value={notificationType.value}
                                            onChange={onChange} />
                                        <label className="form-check-label">{notificationType.text}</label>
                                </div>
                            )
                    })}

            </>)
}
export default NotificationTypeRadio