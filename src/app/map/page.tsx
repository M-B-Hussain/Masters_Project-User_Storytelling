'use client'

import React, { useState, useEffect } from 'react'; // <<< IMPORT useState and useEffect
import dynamic from 'next/dynamic'; 

const DynamicNetworkMap = dynamic(
  () => import('@/components/NetworkMap'), 
  { 
    ssr: false, 
    loading: () => (
        <div className="flex items-center justify-center h-full bg-db-gray dark:bg-db-dark-gray rounded-xl">
            <p className="text-db-dark-gray dark:text-db-gray">Loading Map Data...</p>
        </div>
    ),
  }
);


export default function MapPage() {
    // 1. State for the unique map key
    const [mapKey, setMapKey] = useState(0);

    // 2. Use effect to increment the key on initial mount
    // This forces React to destroy and completely remount the Map component
    useEffect(() => {
        // We use a small delay just to be absolutely sure the DOM is clear
        const timeout = setTimeout(() => {
            setMapKey(prevKey => prevKey + 1);
        }, 50); // 50ms delay
        
        return () => clearTimeout(timeout);
    }, []); 

    // Ensure mapKey is greater than 0 before rendering the map content
    if (mapKey === 0) {
        return (
            <div className="p-8 min-h-screen bg-db-gray/20 dark:bg-db-dark-gray/90">
                <p className="text-center py-20 dark:text-db-gray">Preparing Map...</p>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-db-gray/20 dark:bg-db-dark-gray/90 transition-colors duration-500">
          <h1 className="text-4xl font-inter font-extrabold text-db-red dark:text-db-light-green mb-6 border-b pb-4 border-db-red/30">
            📍 DB Network Map
          </h1>
          
          {/* Map Display: Set a specific height for the container */}
          <div className="w-full h-[500px] shadow-2xl rounded-xl overflow-hidden">
              {/* 3. Pass the changing key to the component */}
              <DynamicNetworkMap key={mapKey} /> 
          </div>
        </div>
    );
}