import React from 'react';
import { createRoot } from "react-dom/client";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const App = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}>
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: 35.68135179041109, lng: 139.76710869501952 }}
                // mapId="e8188406bd40e24b10aa1128" 
            />
        </APIProvider>
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default app