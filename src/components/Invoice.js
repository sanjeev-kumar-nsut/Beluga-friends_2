
import React, { useEffect } from "react";
import { useState } from "react";
export default function Invoice(props){
    
    const [invoice,setInvoice] = useState({});
    useEffect(()=>{
            let order_id = {ids: [props.id]};
            fetch("https://apiv2.shiprocket.in/v1/external/orders/print/invoice",{
              method:'POST',
              headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjkzNjg5LCJleHAiOjE2NDkxNTc2ODksIm5iZiI6MTY0ODI5MzY4OSwianRpIjoiSHRXeDNWd2Nmb2tMYlVQUCJ9.LpWOSeBdWDAMpdEuKz5WP9gUg595QB6IhqxNkk_qSEU",  
              },
              body:JSON.stringify(order_id)
            }).then((result)=>{
              result.json().then((resp)=>{
                setInvoice(resp);
                console.log("invoice :",invoice);
              })
            })
          
    },[]);

    return(
        <div className="invoice">
                      <h1>Download Invoice : </h1>
                      {(invoice.is_invoice_created)?(<a href={invoice.invoice_url}> Click Here</a>):(<h1> {invoice.message}</h1>)}
                      </div>
    );
}