import React from 'react';
import Home from "./Home";
import { useState } from 'react';
import Rive from 'rive-react';
import rocket from './rocket_demo.riv';
export default function Login(props){
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [page,setPage] = useState("login");
    const [name,setName] = useState("");

    function handleName(val)
    {
        setName(val.target.value);
}

    function handleEmail(val)
    {
        setEmail(val.target.value);
    }
    function handlePass(val)
    {
        setPass(val.target.value);
    }
    function handleData()
    {
        console.log("email :",email);
        console.log("pass :",pass);
        props.data.map((item) => {
            if(item.email===email && item.password===pass)
            {
                setPage("Home");
            }
            else
            {
                alert("invalid email/password");
            }
        })
    }
    function handleSignIn(){
        setPage("signin");
    }
    function handleLogIn(){
        setPage("login");
    }
    function expand(lbl){
        var elemId = lbl.getAttribute("for");
        document.getElementById(elemId).style.height = "45px";
        document.getElementById(elemId).classList.add("my-style");
        lbl.style.transform = "translateY(-45px)";
    }

    function addData(){
        console.log("name :",name);
        console.log("email :",email);
        console.log("pass :",pass);
        props.handleNew(name,email,pass);
        setPage("Home");
    }
    if(page==="Home")
    return(
        <>
        <Home name = {name} email = {email} pass = {pass} />
        </>
    )
    else if(page=="signin")
    {
        return(
            <>

             <div className="temppage">
        <div className="t1"> 
          
        <div className="home">
        <h1>Sign In</h1>
           
             <div className="form">
          <input onChange={handleName} type="text" name="name" autoComplete="off" required />
          <label htmlFor="name" className="label-name">
            <span className="content-name">Name</span>
          </label>
        </div>
        <div className="form">
          <input onChange={handleEmail} type="text" name="email" autoComplete="off" required />
          <label htmlFor="email" className="label-name">
            <span className="content-name">Email</span>
          </label>
        </div>
        <div className="form">
          <input onChange={handlePass} type="text" name="password" autoComplete="off" required />
          <label htmlFor="password" className="label-name">
            <span className="content-name">Password</span>
          </label>
        </div>
        <button onClick={addData}  className="btn first"> Submit </button>
            <div className="link-wrapper">
        <a onClick={handleLogIn} className="link hover-2" href="#">Already have an account? Sign In</a>
        </div>
        </div> 

        
      
         
        </div>
        <div className="container1">
          <Rive src={rocket}/>
        </div>
      </div>



             </>
        )
    }
        return (
            <>
            <div className="temppage">
        <div className="t1"> 
          
        <div className="home">
        <h1>Log In</h1>
        
        <div className="form">
          <input onChange={handleEmail} type="text" name="email" autoComplete="off" required />
          <label htmlFor="email" className="label-name">
            <span className="content-name">Email</span>
          </label>
        </div>
        <div className="form">
          <input onChange={handlePass} type="text" name="password" autoComplete="off" required />
          <label htmlFor="password" className="label-name">
            <span className="content-name">Password</span>
          </label>
        </div>
        <button onClick={handleData} className="btn first">Submit</button>
            <div className="link-wrapper">
        <a onClick={handleSignIn} className="link hover-2" href="#">Don't have an account? Sign In</a>
    </div>
        </div> 

        
      
         
        </div>
        <div className="container1">
          <Rive src={rocket}/>
        </div>
      </div>



            </>
        );

}
