import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import Table from "./table/Table";
import AddOfficeForm from "./offices/form/AddOfficeForm";
import EditOfficeForm from "./offices/form/EditOfficeForm";
import AddBureauForm from "./bureaus/form/AddBureauForm";
import EditBureauForm from "./bureaus/form/EditBureauForm";

import styles from "./css/table/Table.css";



const SystemSettings = ()=> { 
    const [offices,setOffices] = useState([]);
    const [bureaus,setBureaus] = useState([]);
    useEffect(() => {
        getTableValues();
             
      },[]);

    const getTableValues = ()=>{
        const officesGet = axios.get('/getAllOffices');
        const bureausGet = axios.get('/getAllBureausOffices');
        axios.all([officesGet,bureausGet]).then(axios.spread(function(response,response2) {
            setOffices(response.data)
            setBureaus(response2.data)
        
        })).catch(error => {
            console.log("ERROR:: ",error.response.data);
            toastr.error("ERROR:: ",error.response.data);
        });
     }

     const refreshOffices = ()=>{
        axios.get('/getAllOffices', {})
        .then(function (response) {
            setOffices(response.data)
              }
            )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
            });
     }
     const refreshBurueaus = ()=>{
        axios.get('/getAllBureausOffices', {})
        .then(function (response) {
            setBureaus(response.data)
              }
            )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
            });
     }

    return (
                        <Routes>
        
       
                            <Route path='/systemSettings' element={
                                 <> 
                                    <div className="row justify-content-center">
                                        <div className="col-9">
                                            <h4>System Settings</h4>
                                            <nav>
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <button className="nav-link active" id="nav-offices-tab" data-bs-toggle="tab" data-bs-target="#nav-offices" type="button" role="tab" aria-controls="nav-offices" aria-selected="true">Offices</button>
                                                    <button className="nav-link" id="nav-bureaus-tab" data-bs-toggle="tab" data-bs-target="#nav-bureaus" type="button" role="tab" aria-controls="nav-bureaus" aria-selected="false">Bureaus/ROs/POs/CSCs</button>
                                                </div>
                                                </nav>
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-offices" role="tabpanel" aria-labelledby="nav-offices-tab">
                                                        <main className={styles.container}>
                                                            <div className={styles.wrapper}>
                                                            <Table data={offices} rowsPerPage={10}  type = {'offices'}/>
                                                            </div>
                                                        </main>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-bureaus" role="tabpanel" aria-labelledby="nav-bureaus-tab">
                                                        <main className={styles.container}>
                                                            <div className={styles.wrapper}>
                                                            <Table data={bureaus} rowsPerPage={10}  type = {'bureaus'}/>
                                                            </div>
                                                        </main>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </>
                                }
                                />  
                                <Route path='/AddNewOffice' element={
                                    <>
                                    <AddOfficeForm refreshOffices = {refreshOffices}/>
                                    </>
                                }
                                />
                                <Route path='/AddNewBureau' element={
                                    <>
                                    <AddBureauForm refreshBurueaus = {refreshBurueaus}/>
                                    </>
                                }
                                />
                                <Route exact path='/EditBureau/:bureauId' element={
                                <> 
                                    <EditBureauForm refreshBurueaus = {refreshBurueaus}/>
                                </>
                                }
                                />
                                <Route exact path='/EditOffice/:officeId' element={
                                <> 
                                    <EditOfficeForm refreshOffices = {refreshOffices}/>
                                </>
                                }
                                />
                        </Routes>
   
        
    )
}
export default SystemSettings;