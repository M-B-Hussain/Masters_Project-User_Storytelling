'use client'

import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
// Note: You must ensure 'leaflet/dist/leaflet.css' is in your globals.css

const NetworkMap: React.FC = () => {
  // Use a ref to attach the map to a specific div element
  const mapRef = useRef<HTMLDivElement>(null);
  // Use a ref to store the Leaflet map instance so it persists across renders
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Center of Germany and zoom level
    const defaultCenter: L.LatLngExpression = [51.1657, 10.4515];
    const defaultZoom = 6;

    // --- INITIALIZATION ---
    // Check if the map element exists AND if a map instance HAS NOT been created yet
    if (mapRef.current && !leafletMapRef.current) {
      
      // Initialize the map on the ref element
      const map = L.map(mapRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        scrollWheelZoom: true,
      });

      // Add the OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // --- Example Marker (Frankfurt) ---
      // This is the direct Leaflet way to add a marker

      // Store the map instance in the ref for later cleanup/manipulation
      leafletMapRef.current = map;
    }
    
    // --- CLEANUP ---
    // The return function runs when the component UNMOUNTS (e.g., when you navigate away)
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove(); // CRITICAL: This destroys the map instance
        leafletMapRef.current = null;
      }
    };
  }, []); // Run only once on mount and once on unmount

  return (
    // Render a plain div that Leaflet will attach to
    // CRITICAL: Must be w-full and h-full inside the parent container to work
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ zIndex: 0 }} // Ensure map is not hidden by other layers
    />
  );
};

export default NetworkMap;