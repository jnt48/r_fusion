import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { app } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useRouter } from 'next/router';

const SignupForm = () => {
    const [email , setEmail]=useState("");
    const [password,setPass]=useState("");
    const auth=getAuth(app);
    const googlePro=new GoogleAuthProvider()
    const router=useRouter();


    function handleSub(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
    }

    function googleSignIn(){
       signInWithPopup(auth,googlePro)
    }
    return (
    <section>
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: 'hsl(0, 0%, 96%)' ,marginTop:"100px" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Say "Hello" To <br />
                <span className="text" style={{color:"gold",fontWeight:"900"}}> R-Fusion AI</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
              R-Fusion AI, powered by the Gemini API, is a cutting-edge application designed to enhance user interaction with artificial intelligence. It offers unparalleled accuracy and efficiency in data processing, making it ideal for businesses and individuals seeking to streamline operations and gain valuable insights. With its user-friendly interface and seamless integration, R-Fusion AI is at the forefront of AI innovation, driving the future of intelligent applications. </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
              <h3 style={{marginLeft:"200px", marginTop:"30px",fontWeight:"700"}}>Create An Account</h3>
                <div className="card-body py-5 px-md-5">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example1" placeholder='First Name' className="form-control" />
                          
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example2" placeholder='Last Name' className="form-control" />
                          
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3" placeholder=' Email address' value={email} onChange={e=>setEmail(e.target.value)} className="form-control" />
                      
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4" value={password} onChange={e=>setPass(e.target.value)} placeholder='Password-Create Your Own (Minimum 6 Charactor )' className="form-control" />
                     
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input className="form-check-input me-2" type="checkbox" id="form2Example33" defaultChecked />
                      <label className="form-check-label" htmlFor="form2Example33">
                        Move Forward
                      </label>
                    </div>

                    <button type="submit" onClick={handleSub} style={{marginLeft:"220px" , backgroundColor:"black" , color:"gold", fontWeight:"700"}} className="btn btn btn-block mb-4">
                      Sign up
                    </button>

                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button type="button" onClick={googleSignIn} className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"><FcGoogle />
                        </i>
                      </button>
                      <p>Already have an account? <a style={{color:"#22A7F0",fontWeight:"800"}} onClick={e=>router.push(`/signAlready`)}>Login</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
