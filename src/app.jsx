import React, { use, useEffect, useRef, useState } from 'react';
import { createRoot } from "react-dom/client";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const Markers = ({ locations }) => {
    console.log('markers', locations);

    return locations ?
        locations.map((location, index) => (
            <AdvancedMarker
                key={index}
                position={location.position}
            />)) : <></>;
}

const App = () => {
    const [locations, setLocations] = useState([]);
    const addMarker = (position) => {
        console.log(position)
        setLocations(curLoc => [
            ...curLoc,
            {
                position
            }
        ]);
    };

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}>
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: 35.68135179041109, lng: 139.76710869501952 }}
                mapId="e8188406bd40e24b10aa1128"
                onCameraChanged={ev => {
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }}
                onClick={ev => {
                    console.log('map clicked:', ev);
                    addMarker(ev.detail.latLng);
                }}
            >
                <Markers locations={locations} />
            </Map>
        </APIProvider>
    )
}


const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default app