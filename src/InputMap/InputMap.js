import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "./InputMap.css";

const MapContext = createContext();

const Location = () => {
  const map = useMap();
  const [position, setPosition] = useState(null);
  console.log(map);

  useEffect(() => {
    map.locate({
      setView: true,
    });
    map.on("locationfound", (event) => {
      setPosition(event.latlng);
    });
  }, [map]);

  return position ? (
    <>
      <Circle
        center={position}
        weight={2}
        color={"red"}
        fillColor={"red"}
        fillOpacity={0.1}
        radius={500}
      ></Circle>
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  ) : null;
};

const GetCoordinates = () => {
  const map = useMap();
  const { latitude, setLatitude, longitude, setLongitude } =
    useContext(MapContext);
  const { lat, lng } = map.getCenter();

  useEffect(() => {
    if (!map) return;

    if (!latitude) {
      setLatitude(lat);
    }

    if (!longitude) {
      setLongitude(lng);
    }

    map.on("dragend zoomend", () => {
      const { lat, lng } = map.getCenter();
      setLatitude(lat);
      setLongitude(lng);
    });
  }, [map]);

  return null;
};

const InputMap = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();

  const value = {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };

  const handleShowDistance = () => {
    navigate(`/${latitude}/${longitude}`);
  };

  return (
    <MapContext.Provider value={value}>
      <div className='map-container'>
        <MapContainer
          className='input-map'
          center={[23.759267, 90.388607]}
          zoom={12}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            // url='https://api.mapbox.com/styles/v1/mir6996/cl1mdt31g003615ptqyjt43sl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlyNjk5NiIsImEiOiJjbDFxc3UzZGYxbjJiM2NvMjYxajF1bGtvIn0.UlQ15buApkfUTwSKJmWnNw'
          />
          <GetCoordinates />
          <Location />
        </MapContainer>
        <div className='instruction'>
          <h1>Please select your location on map and click continue</h1>
          <button className='button' onClick={handleShowDistance}>
            Continue
          </button>
        </div>
      </div>
    </MapContext.Provider>
  );
};

export default InputMap;
