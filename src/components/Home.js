import React from "react";
import Navbar from "./Navbar";
import { useEffect,useState } from "react";
import Map from 'react-map-gl';
import Mapbox from "./Mapbox";
import Invoice from "./Invoice";

import "../css/Home.css";
export default function Home(props){
    const [isError,setIsError] = useState(200);
    const [data,setData] = useState([]);
    const [mapData,setMapData] = useState([]);
    // const [expand,setExpand] = useState(0);
    useEffect(() => {
    const getUrl = "https://apiv2.shiprocket.in/v1/external/orders";
    
    fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjkzNjg5LCJleHAiOjE2NDkxNTc2ODksIm5iZiI6MTY0ODI5MzY4OSwianRpIjoiSHRXeDNWd2Nmb2tMYlVQUCJ9.LpWOSeBdWDAMpdEuKz5WP9gUg595QB6IhqxNkk_qSEU",
      }
    })
      .then((result) => {
        if (!result.ok) {
          setIsError(result.status);
          throw Error(result.statusText);
        }
        return result.json();
      })
      .then((resp) => {
          console.log("result :");
        console.warn(resp.data);
        setData(resp.data);
        console.log("data",data);
        
      })
      .catch((err) => {
          console.log("got error");
          alert(err);
        console.warn("error :", err);
      });

      fetch("https://apiv2.shiprocket.in/v1/external/settings/company/pickup", {
        method: "GET",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjkzNjg5LCJleHAiOjE2NDkxNTc2ODksIm5iZiI6MTY0ODI5MzY4OSwianRpIjoiSHRXeDNWd2Nmb2tMYlVQUCJ9.LpWOSeBdWDAMpdEuKz5WP9gUg595QB6IhqxNkk_qSEU",
        }
      })
        .then((result) => {
          if (!result.ok) {
            setIsError(result.status);
            throw Error(result.statusText);
          }
          return result.json();
        })
        .then((resp) => {
          setMapData(resp.data.shipping_address);
          console.log("map data",mapData);
          
        })
        .catch((err) => {
            console.log("got error");
            alert(err);
          console.warn("error :", err);
        });
    },[]);
    
    // function handleExpand(id){
    //   if(expand===0)
    //   {
    //     setExpand(id);
    //     handleinvoice(id);
    //   }
    //   else
    //   {
    //     if(expand===id)
    //     {
    //       setExpand(0);
    //     }
    //     else
    //     {
    //       setExpand(id); 
    //     handleinvoice(id);
    //     }
    //   }
    // }
    if (isError === 505 || isError === 4000) { 
        return (
          <div className="">
            <h1>{isError} Error</h1>
          </div>
        );
      }

    return (
        <>
        <Navbar/>
        <div className="homepage">
        <h1 className="center">Welcome {props.name}</h1>
        <div className="orderpage">
            <h1 className="left">Orders</h1>
            {
                data.map((item) => 
                <div  className="orderdata" key={item.id}>
                 
                  <div  className="singleOrder">
                  <h3>Customer Name : {item.customer_name} </h3>
                  <h3>Customer Phone : {item.customer_phone} </h3>
                  { item.products.map((prod) => 
                        <div key={prod.id}>
                          <h3>Product Name : {prod.name} </h3>
                          </div>
                        )
                  }
                  <Invoice id={item.id}/>
                    
                    
                   </div>
                    </div>
                )
            }

            <h1 className="left">Map</h1>
            <div className="map">
            <Mapbox mapData = {mapData}/>

            </div>
        </div>
        </div>
        </>
    )
}