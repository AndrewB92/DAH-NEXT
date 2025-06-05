import {useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const Mapbox = ({ lat, lng, zoom }) => {
    
    const center = useMemo(() => ({ lat: lat, lng: lng }), [])
    const gZoom = zoom

    return (
        <GoogleMap
            zoom={gZoom}
            center={center}
            mapContainerClassName="map-container"
        >
            <Marker position={center} />

        </GoogleMap>
    )
}

const Map = ({ latitude, longtitude, mapZoom }) => {

    const zoom = mapZoom ? mapZoom : 12
    
    const { isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY
    })

    if(!isLoaded) return <div>Loading...</div>
    return <Mapbox lat={latitude} lng={longtitude} zoom={zoom} />
}

export default Map  