import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const points = [
  {
    lat: 23.759267,
    lng: 90.388607,
    title: "point 1",
  },
  {
    lat: 23.867315,
    lng: 90.018003,
    title: "point 2",
  },
  {
    lat: 23.99033,
    lng: 90.424762,
    title: "point 3",
  },
  {
    lat: 23.928837,
    lng: 90.700964,
    title: "point 4",
  },
];

const MyMarkers = ({ data }) => {
  return data.map(({ lat, lng, title }, index) => (
    <Marker key={index} position={{ lat, lng }}>
      <Popup>{title}</Popup>
    </Marker>
  ));
};

const OurLocations = () => {
  return (
    <MapContainer
      className='location-map'
      center={[23.759267, 90.388607]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        // url='https://api.mapbox.com/styles/v1/mir6996/cl1mdt31g003615ptqyjt43sl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlyNjk5NiIsImEiOiJjbDFxc3UzZGYxbjJiM2NvMjYxajF1bGtvIn0.UlQ15buApkfUTwSKJmWnNw'
      />

      <MyMarkers data={points} />
    </MapContainer>
  );
};

export default OurLocations;
