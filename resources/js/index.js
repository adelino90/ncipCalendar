import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import UserAccountsTable from './components/userAccounts/UserAccountsTable';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import About from './components/calendarHome/About'


var root;

const nav = ReactDOM.createRoot(document.getElementById('ncipCalendarNavDropdown'));
if (location.pathname == '/'){
   root = ReactDOM.createRoot(document.getElementById('container'));
}
if (location.pathname == '/userAccounts'){
   root = ReactDOM.createRoot(document.getElementById('userAccounts'));
}


root.render(
    <React.StrictMode>
    
         <Router>
          
               {location.pathname === "/" ? ( <App />) : location.pathname == '/userAccounts' ?  (<UserAccountsTable/>) : <h1>Not Found</h1>}

         </Router>
 
    </React.StrictMode>
  );

