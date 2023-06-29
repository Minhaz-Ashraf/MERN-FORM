import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../pages/home.css"
const FormLayout = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [referanceno, setReferanceno] = useState("");
  const navigate = useNavigate();

  const [randomNumber, setRandomNumber] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * 100); 
    setRandomNumber(newRandomNumber);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  },);

  
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const forsm = await axios.post("/api/v1/components/formlayout", {
        to,
        from,
        subject,
        category,
        message,
        referanceno,
      });
      if (forsm && forsm.data.success) {
        toast.success(forsm.data && forsm.data.message);
        navigate("/");
      } else {
        toast.error(forsm.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    
      <div className="registration">
        <header>
          <h1 id="title">Enter your details</h1>
          <p id="description">Fill out form and click submit!</p>
        </header>
        
        <form id="survey-form" action="POST" onSubmit={handleSubmit}>
          <label id="name-label" className="top-label">To: </label>
          <input id="name" className="top-input" type="text"
            placeholder="Enter name" 
            value={to} onChange={(e)=> setTo(e.target.value)} required></input>

          <label id="email-label" className="top-label">From: </label>
          <input id="email" className="top-input" type="email"
            placeholder="Enter recipient name"
            value={from} onChange={(e) =>{setFrom(e.target.value)}} required></input>

          <label id="number-label" className="top-label">Subject: </label>
          <input id="number" className="top-input"
            type="text" placeholder="Enter subject"
            value={subject} onChange={(e) =>{setSubject(e.target.value)}}  ></input>

          <div id="dropdown-div">
            <label id="drop-label" for="dropdown">Category </label>
            <select id="dropdown" className="top-input" 
            value={category}  onChange={(e) =>{setCategory(e.target.value)}}>
              <option value="">(choose one)</option>
              <option >Email</option>
              <option  >Text</option>
              <option  >Fax</option>
            </select>
          </div>
          <label>Enter your message</label>
          <textarea name="Message" cols="10" rows="8" 
          value={message} onChange={(e) =>{setMessage(e.target.value)}}></textarea>

         

          

          <fieldset id="terms">
            <p >Ref no. - {randomNumber} </p>
            <input type="text" placeholder="Enter above ref no" value= {referanceno} onChange={(e) =>{setReferanceno(e.target.value)}} />
           <p>Date & time: {dateTime.toLocaleString()}</p>
          </fieldset>
          <button id="submit" className="button">Submit</button>
        </form>
      </div>
    
  );
};

export default FormLayout;
