import React, { useState,useCallback,useEffect,useRef  } from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams } from 'react-router-dom' 
import SimpleReactValidator from 'simple-react-validator';
const EditAccountForm = ({refreshUsers})=> { 

    const [roles,setRoles] = useState([]);
    const [offices,setOffices] = useState([]);
    const [username,setUsername] = useState('');
    const [lastname,setLastname] = useState('');
    const [officeId,setOfficeId] = useState('');
    const [roleId,setRoleId] = useState('');
    const [firstname,setFirstname] = useState('');
    const [middlename,setMiddlename] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [, forceUpdate] = useState()
    let { Uuid } = useParams();
    const validator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}))


    useEffect(() => {
      

        loadValues();
    
    
                
     },[]);

    const loadValues = useCallback(()=>{
        const axiosrequest1 = axios.get('/getAllSelectValues');
        const axiosrequest2 = axios.get('/getUser/'+Uuid);
        axios.all([axiosrequest1,axiosrequest2]).then(axios.spread(function(response,response2) {
            setRoles(response.data.Roles)
            setOffices(response.data.Offices)
            setUsername(response2.data.username)
            setLastname(response2.data.lastname)
            setFirstname(response2.data.firstname)
            setMiddlename(response2.data.middlename)
            setContactNo(response2.data.contactNo)
            setEmail(response2.data.email)
            setOfficeId(response2.data.officeId)
            setRoleId(response2.data.roleId)
            
        }));
    }
    )
     const clearValues = ()=>{
        setUsername('');
        setLastname('');
        setOfficeId('');
        setRoleId('');
        setFirstname('');
        setMiddlename('');
        setContactNo('');
        setEmail('');
        setPassword('');

     }
     const submitAccountUpdate = (e) => {
        e.preventDefault();    
        var data = {
        Uuid:Uuid, 
        username:username,
        lastname:lastname,
        officeId: parseInt(officeId),
        roleId:parseInt(roleId),
        firstname:firstname,
        middlename:middlename,
        contactNo:contactNo,
        email:email,
        password:password}

        if (validator.current.allValid()) {
      
            axios.post('/submitUserAccountUpdate', data)
            .then(function (response) {
                toastr.success("Account Updated!");
                refreshUsers();
                //clearValues();
                    }
                )
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
                toastr.error("ERROR:: ",error.response.data);
                });
                validator.current.hideMessages();
        }else {
            validator.current.showMessages();
            // rerender to show messages for the first time
            forceUpdate(2)
          }
      }


    return (
    <>  
        <div className="row justify-content-center">
            <div className="col-5">
                <Link to='/userAccounts'>Go Back</Link>
                <form  onSubmit={submitAccountUpdate}>
                    <div className="form-group">
                    
                    <label htmlFor="username">User Name</label>
                    <input type="text" className="form-control" id="username" aria-describedby="username" value={username} onChange={(e) =>setUsername(e.target.value)} placeholder="Enter Username" autoComplete="off"/>
                    <div style={{color: "red"}}>{validator.current.message('username', username, 'required')}</div>

                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" aria-describedby="lastname" value={lastname} onChange={(e) =>setLastname(e.target.value)} placeholder="Enter Last Name" autoComplete="off"/>
                    <div style={{color: "red"}}>{validator.current.message('lastname', lastname, 'required')}</div>

                    <label htmlFor="lastname">First Name</label>
                    <input type="text" className="form-control" id="firstname" aria-describedby="firstname" value={firstname} onChange={(e) =>setFirstname(e.target.value)} placeholder="Enter First Name"/>
                    <div style={{color: "red"}}>{validator.current.message('firstname', firstname, 'required')}</div>

                    <label htmlFor="middlename">Middle Name</label>
                    <input type="text" className="form-control" id="middlename" aria-describedby="middlename" value={middlename} onChange={(e) =>setMiddlename(e.target.value)} placeholder="Enter Middle Name"/>
                    <div style={{color: "red"}}>{validator.current.message('middlename', middlename, 'required')}</div>

                    <label htmlFor="contactNo">Contact Number</label>
                    <input type="text" className="form-control" id="contactNo" aria-describedby="contactNo" value={contactNo} onChange={(e) =>setContactNo(e.target.value)} placeholder="Enter Contact Number"/>
                    

                    <label htmlFor="example">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) =>setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" autoComplete="off"/>
                    <div style={{color: "red"}}>{validator.current.message('email', email, 'required')}</div>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <select className="form-select" aria-label="Default select example" id = "roleId" value={roleId} onChange={(e) =>setRoleId(e.target.value)}>
                            <option value="">Select Role</option>
                            {roles.map((role) => {
                                return <option key={role.roleId} value={role.roleId}>{role.roleName}</option>;
                            })}
                        </select>
                        <div style={{color: "red"}}>{validator.current.message('roleId', roleId, 'required')}</div>
                    </div>

                    <div className="form-group">
                        <select className="form-select" aria-label="Default select example" id = "officeId" value={officeId} onChange={(e) =>setOfficeId(e.target.value)}>
                            <option value="">Select Office/Bureau</option>
                            {offices.map((office) => {
                                return <option key={office.officeId} value={office.officeId}>{office.shortName}</option>;
                            })}
                        </select>
                        <div style={{color: "red"}}>{validator.current.message('officeId', officeId, 'required')}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password"  onChange={(e) =>setPassword(e.target.value)} placeholder="Password" autoComplete="new-password"  />
                     
                    </div>
              

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </>
    );
}
export default EditAccountForm;