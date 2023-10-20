import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import './Login.css';
import Authuser from './Authuser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from "react-toastify";
const Login = () => {
  const notify = (M) => toast.error(M);

  const { http, setToken, token } = Authuser();
  const [btnDiseble, setDisebale] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (token != null) {
      navigate("/");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [navigate, token]);
  
  const [Login, SetLogin] = useState({email: '',password: '' });

  const OninputChange = (e) => {
    SetLogin({ ...Login, [e.target.name]: e.target.value });
  }


  const onSubmit = (e) => {
  e.preventDefault();
 

    http.post("/user/login", Login)
      .then((res) => {
        console.log(res.data.user_data);
        
        if (res.data.token) {
          setToken(res.data.user_data, res.data.token);
          
          navigate("/");
        } else {
          notify(res.data.message);
        }
        setDisebale(0);
      })
      .catch((error) => {
        // notify("The provided credentials are invalid");
        setDisebale(0);
      });
};
  return (
    <div>

 <section className="user-form-part">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
        <div className="user-form-logo">
          <a href="/"><img src="https://vsmart.ajspire.com/images\logo1.png" alt="logo" /></a>
        </div>
        <div className="user-form-card">
          <div className="user-form-title">
            <h2>welcome To VS Mart</h2>
            <p>Use your credentials to access</p>
          </div>
<center>
          <div className="col-md-6">

            <div className="form-group"><input name='email' type='text' onChange={(e) => OninputChange(e)}className="form-control" placeholder="Enter your User Id | Mobile Numbar | Email Id " />
              </div>
              <div className="form-group"><input name='password' type='password' onChange={(e) => OninputChange(e)} className="form-control" placeholder="Enter your password" />
              </div>
              <div className="form-check mb-3"><input className="form-check-input" type="checkbox" defaultValue id="check" /><label className="form-check-label" htmlFor="check">Remember Me</label></div>
              <div className="form-button"><button type="submit" onClick={(e) => onSubmit(e)} >login</button>
                <p>Forgot your password?<a href="/forgot-password">reset here</a></p>
              </div>
          
          </div>
          </center>
        </div>
        <div className="user-form-remind">
          <p>Don't have any account?<a href="/register">register here</a></p>
        </div>
        <div className="user-form-footer">
          <p>V S Mart | © Copyright 2022 by <a target="blank" href="/"> VS Mart </a> &nbsp;&nbsp;All
            Rights
            Reserved </p><br />
          <p> Designed by <a target="blank" href="https://www.ajspire.com">Ajspire Technologies Pvt.Ltd
            </a> </p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Login


  