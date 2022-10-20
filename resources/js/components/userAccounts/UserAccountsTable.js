import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import AddAccountForm from "./form/AddAccountForm";
import EditAccountForm from "./form/EditAccountForm";
import Table from "./table/Table";
import styles from "./Table.css";

const UserAccountsTable = ()=> { 
    const [userAccounts,setUserAccounts] = useState([]);

    useEffect(() => {
       getUsers();
            
     },[]);

    const getUsers = ()=>{
        axios.get('/getAlluserAccounts', {})
        .then(function (response) {
           setUserAccounts(response.data)
              }
            )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
            });
     }
    return (
                        <Routes>
        
       
                            <Route path='/userAccounts' element={
                                 <> 
                                    <div className="row justify-content-center">
                                    <div className="col-6">
                                    <h4>User Accounts</h4>
                                        <main className={styles.container}>
                                            <div className={styles.wrapper}>
                                            <Table data={userAccounts} rowsPerPage={4} />
                                            </div>
                                        </main>
                                        </div>
                                    </div>
                                </>
                                }
                                />  
                                <Route path='/AddNewUserAccount' element={
                                <> 
                                    <AddAccountForm refreshUsers ={getUsers}/>
                                </>
                                }
                                />
                                 <Route exact path='/EditUserAccount/:Uuid' element={
                                <> 
                                    <EditAccountForm refreshUsers ={getUsers}/>
                                </>
                                }
                                />
        
                        </Routes>
   
        
    )
}
export default UserAccountsTable;