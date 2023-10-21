import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const Signup = (props) => {
  const host = "http://localhost:5000";

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sign up");
    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
      });
      //   return response.json();
      // console.log(response);
      const json = await response.json();
      console.log(json.success, json.authToken);
      if (json.success) {
        // redirect
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account created successfully","success");
      }
      else {
        // alert('invalid credentails');
        props.showAlert("Invalid inputs","danger");
      }
    }
    else{
      props.showAlert("Check your passwords","danger");
    }

  }
  return (
    <>
    <div className="container">
      <div className="head" style={{textAlign:'center'}}>
        <h3>Welcome to the SignUp page of iNoteBook!!</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  )
}
