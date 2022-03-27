import React from "react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Map from "react-map-gl";
import Mapbox from "./Mapbox";
import Invoice from "./Invoice";
import Loading from "./Loading";
import "../css/Home.css";
export default function Home(props) {
  const [isError, setIsError] = useState(200);
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [expand,setExpand] = useState(0);
  function resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve("second on time !!!!");
      }, 5000);
    });
  }

  async function asyncCall() {
    console.log("calling");
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }

  useEffect(() => {
    asyncCall();
    console.log("once on time !!!!!!!!!");
  }, []);
  useEffect(() => {
    const getUrl = "https://apiv2.shiprocket.in/v1/external/orders";

    fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OTc2MDIsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjkzNjg5LCJleHAiOjE2NDkxNTc2ODksIm5iZiI6MTY0ODI5MzY4OSwianRpIjoiSHRXeDNWd2Nmb2tMYlVQUCJ9.LpWOSeBdWDAMpdEuKz5WP9gUg595QB6IhqxNkk_qSEU",
      },
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
        console.log("data", data);
      })
      .catch((err) => {
        console.log("got error");
        alert(err);
        console.warn("error :", err);
      });

    console.log("one");
  }, []);
  function URLify(string) {
    return string.trim().replaceAll(" ", "%20");
  }
  useEffect(() => {
    console.log("two data :", data);
    data.map((item) => {
      let address =
        item.customer_address +
        " " +
        item.customer_city +
        " " +
        item.customer_state;
      address = URLify(address);
      const gurl =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=pk.eyJ1Ijoic2FuamVldjIwMCIsImEiOiJjbDE4MmNjeHUwdm11M2JzMWJlaWRpbTNpIn0.DtnSofRU4oinflF5i5ZQLg";
      console.log("url :", gurl);
      console.log("address :", address);

      fetch(gurl, {
        method: "GET",
      })
        .then((result) => {
          if (!result.ok) {
            setIsError(result.status);
            throw Error(result.statusText);
          }
          return result.json();
        })
        .then((resp) => {
          let long = resp.features[0].geometry.coordinates[0];
          let lat = resp.features[0].geometry.coordinates[1];
          let obj = { ...item, lat, long };
          let ans = mapData;
          ans.push(obj);
          setMapData(ans);

          console.log("map data", mapData);
        })
        .catch((err) => {
          console.log("got error");
          alert(err);
          console.warn("error :", err);
        });
    });
  }, [data]);

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
  if (loading) {
    return (
      <div className="homepage">
        <Loading />
      </div>
    );
  }
  if (isError === 505 || isError === 4000) {
    return (
      <div className="">
        <h1>{isError} Error</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="homepage">
        <h1 className="center welcome">Welcome {props.name}</h1>
        <div className="orderpage">
          <h1 className="left welcome">Orders</h1>
          {data.map((item) => (
            <div className="orderdata" key={item.id}>
              <div className="singleOrder">
                <h3>Customer Name : {item.customer_name} </h3>
                {item.products.map((prod) => (
                  <div key={prod.id}>
                    <h3>Product Name : {prod.name} </h3>
                  </div>
                ))}
                <Invoice link={item.others.order_status_url} />
              </div>
            </div>
          ))}

          <h1 className="left welcome">Map</h1>
          <div className="map">
            <Mapbox mapData={mapData} />
          </div>
        </div>
      </div>
    </>
  );
}
