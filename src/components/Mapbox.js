import * as React from 'react';
import Map,{Marker,NavigationControl} from 'react-map-gl';

export default function Mapbox(props) {
  return (
    <Map
    mapboxAccessToken = {"pk.eyJ1Ijoic2FuamVldjIwMCIsImEiOiJjbDE4MmNjeHUwdm11M2JzMWJlaWRpbTNpIn0.DtnSofRU4oinflF5i5ZQLg"}
      initialViewState={{
        longitude: 78.476681027237,
        latitude: 22.1991660760527,
        zoom: 3
      }}
      className="mapbox"
      style={{width: "90vw", height: "100vh",margin:"50px"}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <NavigationControl />
      <Marker longitude={77.216721} latitude={28.644800} offsetLeft={-20} offsetTop={-10} pitchAlignment='viewport' anchor="bottom" >
      <img src="./pin.png" className='pinimg'/>
    </Marker>
    {
      props.mapData.map((item) =>
      <div key={item.id}>
      {(item.lat_long_status===1)?(
        <Marker longitude={item.lat} latitude={item.long} offsetLeft={-20} offsetTop={-10} pitchAlignment='viewport' anchor="bottom" >
        <img src="./pin.png" className='pinimg'/>
      </Marker>
      ):(
        <Marker longitude={77.216721} latitude={28.644800} offsetLeft={-20} offsetTop={-10} pitchAlignment='viewport' anchor="bottom" >
      <img src="./pin.png" className='pinimg'/>
    </Marker>
      )}
      </div>
      )
    }
    </Map>
  );
}