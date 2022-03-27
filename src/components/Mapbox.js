import * as React from "react";
import { useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";

export default function Mapbox(props) {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  return (
    <Map
      mapboxAccessToken={
        "pk.eyJ1Ijoic2FuamVldjIwMCIsImEiOiJjbDE4MmNjeHUwdm11M2JzMWJlaWRpbTNpIn0.DtnSofRU4oinflF5i5ZQLg"
      }
      initialViewState={{
        longitude: 78.476681027237,
        latitude: 22.1991660760527,
        zoom: 1,
      }}
      className="mapbox"
      style={{ width: "90vw", height: "150vh", margin: "50px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <NavigationControl />

      {console.log("inside my map :", props.mapData)}
      {props.mapData.map((item) => (
        <div key={item.id}>
          <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetLeft={-20}
            offsetTop={-10}
            pitchAlignment="viewport"
            anchor="bottom"
          >
            <img
              src="./pin.png"
              className="pinimg"
              style={{ cursor: "pointer" }}
              onClick={() => handleMarkerClick(item.id)}
            />
          </Marker>
          {currentPlaceId === item.id && (
            <Popup
              longitude={item.long}
              latitude={item.lat}
              anchor="left"
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Buyer details</label>
                <h3 className="desc">Name : {item.customer_name}</h3>
                <h3 className="desc">Phone : {item.customer_phone}</h3>
                <h3 className="desc">Address : {item.customer_address}</h3>
                <h3 className="desc">State : {item.customer_state}</h3>

                <label>Delivery Man Details</label>
                <h3 className="desc">Name :{item.pickup_boy_name}</h3>
                <h3 className="desc">
                  contact_no :{item.pickup_boy_contact_no}
                </h3>

                <label>Product</label>
                <div>
                  {item.products.map((prod) => (
                    <div>
                      <h3 className="desc">Name : {prod.name}</h3>
                    </div>
                  ))}
                </div>

                <label>Status</label>
                {item.activities.map((stat) => (
                  <div>
                    <h3 className="desc">{stat}</h3>
                  </div>
                ))}

                <label>Estimated Delivery Day</label>
                <h3 className="desc">{item.sla}</h3>

                <label>Invoice</label>
                <a
                  href={item.others.order_status_url}
                  className="desc"
                  target="_blank"
                >
                  Download
                </a>
              </div>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}
