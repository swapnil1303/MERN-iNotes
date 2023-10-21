import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export const Login = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email,password: credentials.password }) , // body data type must match "Content-Type" header
    });
    //   return response.json();
    // console.log(response);
    const json = await response.json();
    console.log(json.success,json.authToken);
    if(json.success){
      // redirect
      localStorage.setItem('token',json.authToken);
      
      props.showAlert("Redirecting to your notes","success");
      navigate('/');
    }
    else{
      // alert('invalid credentails');
      props.showAlert("Invalid credentials","danger");
    }

  }
  return (
    <div className='container'>
      <div className="head" style={{textAlign:'center'}}>
        <h3>Welcome to the Login page of iNoteBook!!</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} required onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
