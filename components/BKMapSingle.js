// BKMapSingle.js
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const BKMapSingle = ({ lat, lng, zoom }) => {
    // Set map container style
    const mapContainerStyle = {
        width: '100%',
        height: '100%', // Adjust the height as needed
    };

    // Load Google Maps script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_NEW_GOOGLE_MAP_KEY,
    });

    // Handle loading error
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat, lng }}
            zoom={zoom}
        >
            <Marker position={{ lat, lng }} />
        </GoogleMap>
    );
};

export default BKMapSingle;