import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown"
import { IoSend } from "react-icons/io5";
import bosspic from "../public/rLetter.jpg"
import { TbHexagonLetterR } from "react-icons/tb";
import { app } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignupForm from './login';
import { useRouter } from 'next/router';
import { BsLinkedin } from "react-icons/bs";

export default function Home() {
  //input
  const [text,setText]=useState("");
  //Output
  const [answer,setA]=useState("");
  //Old Message
  const [message,setMeaasage]=useState([]);
  const [loading,setL]=useState(false);
  const auth=getAuth(app);
const router=useRouter()

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
        if (user) setUser(user);
        else setUser(null);
    })
},[]);
const[user,setUser]=useState(null);



  async function generateAnswer(){
    const r=text;
    setMeaasage(prevMessages => [
      ...prevMessages, 
      { text: text, user: true }
  ]);

   setL(true)

   const response=await axios({
      url:'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCAQcrLqUqG8V2fxEdKmVqixI6V_7zodyo',
      method:"post",
      data:{
        contents:[
          {parts:[{text:`${r}`}]}]
      }
    })
    const rk=response['data']['candidates'][0]['content']['parts'][0]['text']
   
   setMeaasage(prevMessages => [
    ...prevMessages, 
    { text: rk, user: false }
])
setL(false)
setText("")
  
  }

  console.log(user)


return (
  <>
     
     {!user && (<><SignupForm/></>)}

     {user && (<>
    <nav class="navbar " style={{backgroundColor:"black",height:"75px"}}>
    <div class="container-fluid row" >
   
      <h3 style={{marginLeft:"100px",fontFamily:"inherit",fontWeight:"700",color:"gold"}}><TbHexagonLetterR />
       R-Fusion AI</h3>
    

  </div>
</nav>
      
        <div className="border rounded-5" >
          <section className="p-4 w-100">
            <div className="row d-flex justify-content-center" style={{width:"1700px"}}>
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card">
                  <div
                    className="card-header d-flex justify-content-between align-items-center p-3"
                    style={{ borderTop: "4px solid #ffa900"  }}
                  >
                    <h5 className="mb-0" style={{marginRight:"100px"}}>Chat messages</h5> 
                    <div className="d-flex flex-row align-items-center">
                      <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                      <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                      <i className="fas fa-times text-muted fa-xs"></i>
                    </div>
                  </div>
                  <div
                    className="card-body overflow-auto"
                    style={{ height: "500px"}}
                  >

                    {message.length===0 && (
                      <div style={{marginTop:"100px",marginLeft:"20px"}}>
                      
                      <h3 style={{fontWeight:"800"}}>Get Started ,</h3><br/>
                      <h4 style={{fontWeight:"700"}}>Say "Hello" To R-AI Fusion</h4>
                      </div>
                    )}

                    {message.map((msg, index) => (
                      <>
                        {msg.user && (
                          <>
                            <div className="d-flex justify-content-between">
                              
                            </div>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                                  {msg.text}
                                </p>
                              </div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                            </div>
                          </>
                        )}

                        {!msg.user && (
                          <>
                            <div className="d-flex justify-content-between" >
                              
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              
                              <div style={{maxWidth:"550px"}}>
                                <p className="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">
                
                                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ))}

                    {loading && (
                      <>
                        <div
                          class="spinner-border text-warning"
                          role="status"
                        ></div>
                      </>
                    )}
                  </div>
                  <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                    <div className="input-group mb-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type message"
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        
                      />
                      <button
                        onClick={generateAnswer}
                        className="btn btn-warning"
                        type="button"
                        id="button-addon2"
                        style={{ paddingTop: ".55rem" }}
                      >
                        <IoSend />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
     
        <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" style={{fontWeight:"800",fontSize:"large"}}>
         <p className="col-md-4 mb-0"><TbHexagonLetterR />  2024 Company, Inc</p>

        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"><TbHexagonLetterR /> </use>
          </svg>
        </a>

        <ul className="nav col-md-4 justify-content-end" >
          <li className="nav-item"><a href="www.linkedin.com/in/
jyotiraditya-neeraj-tripathi-3830032a9
" style={{marginRight:"40px"}} className="nav-link px-2"><BsLinkedin /></a></li>

        </ul>
      </footer>

      </>)}
      

  </>
);
}
