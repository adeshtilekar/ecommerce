import React from 'react'
import { useState } from 'react';
import axios from "axios";
import Authuser from './Authuser';
const Register = () => {
  const{http}=Authuser();
    const [btnDiseble, setDisebale] = useState(0);

    const [formData, SetformData] = useState({
    name: '',
    mob_no: '',
    address:'',
    email: '',
    password: '',
    cpassword: '',
  });

console.log(formData);
  const OninputChange = (e) => {
    SetformData({ ...formData, [e.target.name]: e.target.value });
  }


  const onSubmit = (e) => {

    http.post('/userregister', formData)
      .then((res) => {
        console.log(res.data);
        
        setDisebale(0);
      })
      .catch((error) => {
        // notify("The provided credentials are invalid");
        setDisebale(0);
      });
  e.preventDefault();
  
};
  return (
    <div>

  {/* Begin Li's Breadcrumb Area */}
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li className="active">Register</li>
        </ul>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/* Begin Login Content Area */}
  <div className="page-section mb-60">
    <div className="container">
      <div className="row">
      
        <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
          {/* <form action="#"> */}
            <div className="login-form">
              <h4 className="login-title">Register</h4>
              <div className="row">
                <div className="col-md-6 col-12 mb-20">
                  <label>First Name</label>
                  <input className="mb-0" type="text" name="name" onChange={(e) => OninputChange(e)}
                        placeholder="First Name" />
                </div>
              
                <div className="col-md-12 mb-20">
                  <label>Email Address*</label>
                  <input className="mb-0" type="email" name='email' onChange={(e) => OninputChange(e)}
                        onInput={(e) => (e)} placeholder="Email Address" />
                </div>
                <div className="col-md-6 col-12 mb-20">
                  <label>Mobile No</label>
                  <input className="mb-0" type="text" name='mob_no'  onChange={(e) => OninputChange(e)}
                        onInput={(e) => (e)} placeholder="mob_no" />
                </div>
                <div className="col-md-6 col-12 mb-20">
                  <label>Address </label>
                  <input className="mb-0" type="text" name='address'  onChange={(e) => OninputChange(e)}
                        onInput={(e) => (e)} placeholder="mob_no" />
                </div>
                <div className="col-md-6 mb-20">
                  <label>Password</label>
                  <input className="mb-0" type="password" name='password' onChange={(e) => OninputChange(e)}
                        onInput={(e) => (e)} placeholder="Password" />
                </div>
                <div className="col-md-6 mb-20">
                  <label>Confirm Password</label>
                  <input className="mb-0" type="password" name='cpassword'  onChange={(e) => OninputChange(e)}
                        onInput={(e) => (e)} placeholder="Confirm Password" />
                </div>
                <center>
                <div className="col-12 ">
                 
                  <button type="submit" onClick={(e) => onSubmit(e)} className="register-button mt-0">Register</button>
                 
                </div>
                </center>
              </div>
            </div>
            <div className="user-form-remind">
          <p>You have already account?<a href="/login">register here</a></p>
        </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  </div>
  {/* Login Content Area End Here */}
 
</div>

    
  )
}

export default Register
