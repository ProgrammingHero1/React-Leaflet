import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const officeLocation = {
  latitude: 23.759267,
  longitude: 90.388607,
};

const createRoutineMachineLayer = ({ lat, lng }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(officeLocation.latitude, officeLocation.longitude),
      L.latLng(lat, lng),
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
