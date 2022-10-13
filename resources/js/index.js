import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import About from './components/calendarHome/About'


const logoutClick = (e)=>{
  console.log("Logout")
  e.preventDefault();
  document.getElementById('logout-form').submit()
}

const root = ReactDOM.createRoot(document.getElementById('container'));
const nav = ReactDOM.createRoot(document.getElementById('ncipCalendarNavDropdown'));
/*
nav.render( 
    <>      

      <switch>

      <Route exact path='/about' element={
            <>
              <p className="dropdown-item">About</p>
              
            </>
        }
      />
      </switch>
    
    </>   
)*/

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );