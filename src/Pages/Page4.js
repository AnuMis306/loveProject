// src/Pages/Page4.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import './Page4.css';
import 'leaflet/dist/leaflet.css';

const Page4 = () => {// Google Map container style
  
  // Center the map on a default location (Delhi)
  const center = [28.6139, 77.2090]; // Delhi coordinates

  // Locations to be marked
  const locations = [
    {
      label: '1st_Meet', // First meet
      title: 'Pune - First Meet',
      lat: 18.5204,
      lng: 73.8567,
    },
    {
      label: 'Marriage', // Marriage
      title: 'Lucknow - Marriage',
      lat: 26.8467,
      lng: 80.9462,
    },
    {
      label: 'Honeymoon', // Honeymoon
      title: 'Goa - Honeymoon',
      lat: 15.2993,
      lng: 73.9240,
    },
    {
      label: '1st_Date', // First date
      title: 'Delhi - First Date',
      lat: 28.6139,
      lng: 77.2090,
    },
  ];

  return (
    <MapContainer center={center} zoom={5} style={{ width: '100%', height: '450px' }}>
      {/* Use OpenStreetMap tiles (no API key required) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add markers for each location */}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={new L.DivIcon({
            className: 'leaflet-div-icon', // Custom class to style the marker
            html: `<span style="color: #fff; background-color: #007BFF; border-radius: 50%; padding: 10px; font-size: 1.5em; font-weight: bold; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); border: 3px solid #fff;">${location.label}</span>`,
          })}
        >
          <Popup>{location.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};


export default Page4;
