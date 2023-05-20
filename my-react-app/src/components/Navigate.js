import React, { useEffect , useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { NavLink, useNavigate } from "react-router-dom";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-contextmenu";

import { UserContext } from "../App"



let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Navigat() {
    const {state, dispatch} = useContext(UserContext)

    const history = useNavigate(); 
    const navigate_map = async () =>{
        try {

            if(!state){
                window.alert("Please signin to see all available bikes for rent!")
                history('/signin')
            }

        } catch (error) {
            console.log(error)
        }
    }
  useEffect(() => {
    map();
  }, []);

  const map = () => {
    L.Marker.prototype.options.icon = DefaultIcon;
    const mapSW = new L.Point(0, 960);
    const mapNE = new L.Point(960, 0);
    // const map = L.map("map", { crs: L.CRS.Simple }).setView([0, 0], 4);

    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      
    // }).addTo(map);

    var baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom:18,
        attribution :'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    const center = [19.868470281515417, 75.32394396632917]
    var map = L.map('map',{
        center:center,
        zoom:30,
        zoomControl:true,
        layers:[baseLayer]
    })
    // map.locate({setView: true, maxZoom: 30}); 
    // var marker = L.marker(center, {
    //   draggable: true
    // }).addTo(map);

    var control = L.Routing.control({
        waypoints : [
            L.latLng(19.868470281515417, 75.32394396632917),
            L.latLng(19.871113893200064, 75.32419072954455)
        ],
        lineOptions : {
            styles : [
                {color : 'blue' , opacity : 1, weight:3}
            ]
        },
        createMarker : function (i,waypoints,n) {
            var marker_icon = '';
            var startIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });

            var middleIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });

            var destinationIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });

            if(i == 0 ) {
                marker_icon = startIcon
            } else if ( i > 0 && i < n-1) {
                marker_icon = middleIcon
            } else if(i == n-1) {
                marker_icon = destinationIcon
            }

            var marker = L.marker(waypoints.latLng,{
                draggable:true,
                bounceOnAdd :true,
                icon:marker_icon
            });

            return marker;
        },
        showAlternatives : true,
        altLineOptions : {
            styles : [
                {color: 'black' , opacity : 0.15 , weight:9},
                {color : 'red' , opacity:1 , weight:3 }
            ]
        },
        geocoder : L.Control.Geocoder.nominatim()
    }).addTo(map);



    // function onMapClick(e) {
    //   let tileSize = new L.Point(32, 32);
    //   let pixelPoint = map.project(e.latlng, map.getMaxZoom()).floor();
    //   let coords = pixelPoint.unscaleBy(tileSize).floor();
    //   alert("You clicked the map at " + coords);
    // }
    // map.on("click", onMapClick);
  };

  return <div id="map" style={{ height: "100vh" }}>
            <link rel=""></link>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <nav className="navbar">
                <NavLink className="nav-link"  to="/">Home</NavLink>                
                </nav>
                <div id="login-btn">
                </div>
            </header> 
  </div>;
}
