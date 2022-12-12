import React, { useState,useEffect,useRef  } from "react";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 
import SimpleReactValidator from 'simple-react-validator';

const AddOfficeForm = ({refreshOffices})=> { 
    const [bureau_regions,setBbureau_regions] = useState([]);
    const [bureauId,setBureauId] = useState('');
    const [shortName,setShortName] = useState('');
    const [longName,setLongName] = useState('');
    const [officeType,setOfficeType] = useState('');
    const [officeCode,setOfficeCode] = useState('');
    const [, forceUpdate] = useState()
    
    const validator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}))
  

    useEffect(() => {
        axios.get('/getAllBureausOffices', {})
         .then(function (response) {
            setBbureau_regions(response.data)
               }
             )
         .catch(error => {
             console.log("ERROR:: ",error.response.data);
             });
            
     },[]);

     const clearValues = ()=>{
        setBureauId('');
        setShortName('');
        setLongName('');
        setOfficeType('');
        setOfficeCode('');
     }


    const submitOffice = (e)=>{
        e.preventDefault();    
        var data = {
            bureauId:bureauId,
            shortName:shortName,
            longName: longName,
            officeType:officeType,
            officeCode:officeCode
        }

            if (validator.current.allValid()) {
      
                axios.post('/submitOffice', data)
                .then(function (response) {
                    toastr.success("Office Added!");
                    refreshOffices();
                    clearValues();
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
                forceUpdate(1)
              }
    }




    return (
        <>  
            <div className="row justify-content-center">
                <div className="col-5">
                    <Link to='/systemSettings'>Go Back</Link>
                    <form  onSubmit={submitOffice}>
                        <div className="form-group">
                        
                            <label htmlFor="shortName">Office Short Name</label>
                            <input type="text" className="form-control" id="shortName" aria-describedby="shortName" value={shortName} onChange={(e) =>setShortName(e.target.value)} placeholder="Enter Office Short Name" autoComplete="off"/>
                            <div style={{color: "red"}}>{validator.current.message('shortName', shortName, 'required')}</div>
        
                            <label htmlFor="longName">Office Long Name</label>
                            <input type="text" className="form-control" id="longName" aria-describedby="longName" value={longName} onChange={(e) =>setLongName(e.target.value)} placeholder="Enter Office Long Name" autoComplete="off"/>
                            <div style={{color: "red"}}>{validator.current.message('longName', longName, 'required')}</div>
                        </div>

                        <div className="form-group">
                            <select className="form-select" aria-label="Default select example" id = "officeType" value={officeType} onChange={(e) =>setOfficeType(e.target.value)}>
                                <option value="">Select Office Type</option>
 
                                 <option value="CO">Central Office</option>
                                 <option value="RO">Regional Office</option>
                                 <option value="PO">Provincial Office</option>
                                 <option value="CSC">Community Service Center</option>
                            </select>
                            <div style={{color: "red"}}>{validator.current.message('officeType', officeType, 'required')}</div>
               
                        </div>
                        <div className="form-group">

                            <label htmlFor="officeCode">Office Code</label>
                            <input type="text" className="form-control" id="officeCode" aria-describedby="middlename" value={officeCode} onChange={(e) =>setOfficeCode(e.target.value)} placeholder="Enter Office Code"/>
                            <div style={{color: "red"}}>{validator.current.message('officeCode', officeCode, 'required')}</div>
                       
                        </div>
                            <div className="form-group">
                                <select className="form-select" aria-label="Default select example" id = "bureauId" value={bureauId} onChange={(e) =>setBureauId(e.target.value)}>
                                    <option value="">Select Bureaus/Region</option>
                                    {bureau_regions.map((bureau_region) => {
                                        return <option key={bureau_region.bureauId} value={bureau_region.bureauId}>{bureau_region.bureauName}</option>;
                                    })}
                                </select>
                                <div style={{color: "red"}}>{validator.current.message('bureauId', bureauId, 'required')}</div>
                            </div>
    
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
        );

}

export default AddOfficeForm;