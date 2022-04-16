# React Leaflet Basic Usage

## Installations

<font color="red"><h2>Do not migrate to React v18 if you want to use React Leaflet. Some features are broken there.</h2></font>

npm

```bash
npm install leaflet react-leaflet 
npm install @react-leaflet/core
npm install leaflet-routing-machine
```

yarn

```bash
yarn add leaflet react-leaflet 
yarn add @react-leaflet/core
yarn add leaflet-routing-machine
```

After installation you need to add CSS file in your ```index.html``` head.

```html
<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
/>
```

## Initial Setup

Add the following code to your app and check it displays correctly.

```jsx
<MapContainer className='input-map' center={[51.505, -0.09]} zoom={13}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <Marker position={[51.505, -0.09]} />
</MapContainer>
```

Create a CSS file and give your map container  ```height``` and ```width```

```css
.my-map {
  height: 100vh;
  width: 100%;
}
```

If the map is not displayed properly, it is most likely because you haven't followed all the prerequisites.

1. Make sure all dependencies are installed
2. Make sure Leaflet's CSS is loaded
3. Make sure your map container has a defined height

## Components 

### ```<MapContainer>```

The ```<MapContainer>``` component is responsible for creating the Leaflet Map instance and providing it to its child components, using a React Context.

When creating a MapContainer element, its props are used as options to create the Map instance.

**Basic options:**

| Prop            | Type            | Value                                |
|-----------------|-----------------|--------------------------------------|
| center          | Array of number |[Latitude,Longitude]                  |
| className       | String          |Optional                              |
| id              | String          |Optional                              |
| zoom            | Number          |Zoom level of map <br/> (From 0 to 18)|
| scrollWheelZoom | Boolean         |By Default true                       |
| doubleClickZoom | Boolean         |By Default true                       |

### ```<TileLayer>```

```<TitleLayer>``` is used to load and display tile layers on the map.

**Basic options:**

| Prop            | Type   | Value                         |
|-----------------|--------|-------------------------------|
| url             | String |Url of tile layer style.       |
| attribution     | String |Optional, used for attribution.|

### ```<Marker>```

```<Marker>``` is used to display clickable/draggable icons on the map.

**Basic options:**

| Prop            | Type              | Value                         |
|-----------------|-------------------|-------------------------------|
| Position        | Array of number   |[Latitude,Longitude]           |
| draggable       | Boolean           |Optional                       |
| eventHandlers   | Callback Functions|Optional                       |
| children        | React Node        |Optional                       |

## Hook

### ```useMap()```

```useMap()``` provides the Leaflet Map instance in any descendant of a ```MapContainer```.

```jsx
function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter())
  return null
}

function MyMapComponent() {
  return (
    <MapContainer center={[50.5, 30.5]} zoom={13}>
      <MyComponent />
    </MapContainer>
  )
}
```

In the above example map.getCenter() will return the center coordinates of map canvas.

## Examples

### Two point location route

If you want to use leaflet's route machine you have to create a controlled component and pass that component as a child of ```<MapContainer>```

```jsx

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(23.809788, 90.417495),
      L.latLng(23.696800, 90.398981),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
```

```jsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import RoutingMachine from "./RoutingMachine";

const OutputMap = () => {
  const { lat, lng } = useParams();

  return (
    <div>
      <MapContainer
        className='user-map'
        center={[23.759267, 90.388607]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <RoutingMachine />
      </MapContainer>
    </div>
  );
};

export default OutputMap;

```

![Map with direction](https://raw.githubusercontent.com/mir-hussain/React-Leaflet/main/map.png?token=GHSAT0AAAAAABQ5L3BSGBPM42CE63J72AK6YSRYLWQ)

If you want to remove direction container, add below code snippet in ```App.css```

```css
.leaflet-routing-container {
  display: none;
}
```

### User GeoLocation 

You can get user's location by setting up a ```<Location>``` component and passing it as child of ```<MapContainer>```

```jsx
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
```

### Multiple Marker

If you want to mark multiple locations on map, you can apply multiple markers by creating a custom component. After that pass your component as a child of ```<MapContainer>```

```jsx
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

const MultiLocations = () => {
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
      />

      <MyMarkers data={points} />
    </MapContainer>
  );
};

export default MultiLocations;

```