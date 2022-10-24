import React, { useState,useCallback,useEffect,useRef  } from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams } from 'react-router-dom' 
import SimpleReactValidator from 'simple-react-validator';

const EditBureauForm = ({refreshBurueaus})=> { 

    const [bureauName,setBureauName] = useState('');
    const [description,setDescription] = useState('');
    let { bureauId } = useParams();
    const [, forceUpdate] = useState()
    
    const validator = useRef(new SimpleReactValidator({autoForceUpdate: {forceUpdate: forceUpdate}}))

    useEffect(() => {
      

        loadValues();
    
    
                
     },[]);

     const loadValues = useCallback(()=>{

            const axiosrequest2 = axios.get('/getBureau/'+bureauId);
            axios.all([axiosrequest2]).then(axios.spread(function(response,) {
                setBureauName(response.data.bureauName)
                setDescription(response.data.description)
                
            }));
        }
    )

    const clearValues = ()=>{
        setBureauName('');
        setDescription('');
     }

    const submitBureau = (e)=>{
        e.preventDefault();    
        var data = {
            bureauId:bureauId,
            bureauName:bureauName,
            description:description
        }

            if (validator.current.allValid()) {
      
                axios.post('/submitBureauUpdate', data)
                .then(function (response) {
                    toastr.success("Bureau Updated!");
                    refreshBurueaus();
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
                    <form  onSubmit={submitBureau}>
                        <div className="form-group">
                        
                            <label htmlFor="bureauName">Baureau/Region/Short Name</label>
                            <input type="text" className="form-control" id="bureauName" aria-describedby="shortName" value={bureauName} onChange={(e) =>setBureauName(e.target.value)} placeholder="Enter Office Short Name" autoComplete="off"/>
                            <div style={{color: "red"}}>{validator.current.message('bureauName', bureauName, 'required')}</div>
        

                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" value={description}  onChange={(e) =>setDescription(e.target.value)} placeholder="Enter Office Long Name" autoComplete="off" />
                        </div>



    
                        
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </>
    )

}
export default EditBureauForm;