import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import UserAccountsTable from './components/userAccounts/UserAccountsTable';
import SystemSettings from './components/systemSettings/SystemSettings';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import About from './components/calendarHome/About'


var root;

const nav = ReactDOM.createRoot(document.getElementById('ncipCalendarNavDropdown'));
if (location.pathname == '/'){
   root = ReactDOM.createRoot(document.getElementById('container'));
}
else if (location.pathname == '/userAccounts'){
   root = ReactDOM.createRoot(document.getElementById('userAccounts'));
}
else if (location.pathname == '/systemSettings'){
   root = ReactDOM.createRoot(document.getElementById('systemSettings'));
}


root.render(
    <React.StrictMode>
    
         <Router>
          
               {location.pathname === "/" ? ( <App />) : location.pathname == '/userAccounts' ?  (<UserAccountsTable/>) : location.pathname == '/systemSettings' ?  (<SystemSettings/>) : <h1>Not Found</h1>}

         </Router>
 
    </React.StrictMode>
  );



