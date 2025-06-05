import { useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const BKMap = ({ mapcoords, mapZoom = 12 }) => {
    const mapRef = useRef(null); // Define mapRef here
    
    const center = useMemo(() => ({
        lat: mapcoords[0]?.lat || 0,
        lng: mapcoords[0]?.lng || 0
    }), [mapcoords]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCJ8gj6kO2IgLYeSlhP7TyealHqnJTkAcE' // Ensure your API key is in place
    });

    // Fit the bounds of the map to include all markers
    useEffect(() => {
        if (mapcoords.length > 0 && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            mapcoords.forEach(coord => {
                bounds.extend({ lat: coord.lat, lng: coord.lng });
            });
            mapRef.current.fitBounds(bounds); // Adjust the map to fit all markers
        }
    }, [mapcoords]);

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <>
        <h2 className="testimonialHeadingDark">Map</h2>
        <GoogleMap
            ref={mapRef} // Attach mapRef to the GoogleMap component
            center={center} // Default center
            zoom={mapZoom} // Default zoom
            mapContainerClassName="map-container"
        >
            {mapcoords.map((coord, index) => (
                <Marker
                    key={index}
                    position={{ lat: coord.lat, lng: coord.lng }}
                />
            ))}
        </GoogleMap>
        </>
    );
};

export default BKMap;