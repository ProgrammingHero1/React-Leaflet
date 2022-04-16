import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import RoutingMachine from "./RoutingMachine";

const OutputMap = () => {
  const { lat, lng } = useParams();

  return (
    <div className='map-container'>
      <MapContainer
        className='user-map'
        center={[23.759267, 90.388607]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <RoutingMachine lat={lat} lng={lng} />
      </MapContainer>
      <div className='instruction'>
        <h1>Thank you. Your order has been placed.</h1>
      </div>
    </div>
  );
};

export default OutputMap;
