import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import React, { useContext, useRef, useEffect, useState } from 'react';

const Polygon = ({ locations }) => {
    const map = useContext(GoogleMapsContext)?.map;
    const polygonRef = useRef(null);

    // Use a state to store the path and update it in a useEffect.
    const [path, setPath] = useState([]);

    // This effect runs whenever props.locations changes.
    // It updates the local path state, preventing an infinite loop.
    useEffect(() => {
        if (locations && locations.length > 2) {
            const path = locations.map(location => location.position);
            path.push(path[0]); // Close the polygon
            setPath(path);
        } else {
            setPath([]);
        }
    }, [locations]);

    // This effect manages the Google Maps Polyline object.
    useEffect(() => {
        if (!map) {
            console.error('<Polyline> has to be inside a Map component.');
            return;
        }

        // Initialize the polyline object if it doesn't exist.
        if (!polygonRef.current) {
            polygonRef.current = new google.maps.Polygon({
                map: map,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });
        }

        // Update the polyline's path whenever the path state changes.
        if (path.length > 2) {
            polygonRef.current.setPath(path);
            polygonRef.current.setMap(map); // Ensure it's on the map
        } else {
            // Remove the polyline from the map if there aren't enough points.
            polygonRef.current.setMap(null);
        }

        // Cleanup function: this runs when the component unmounts.
        return () => {
            if (polygonRef.current) {
                polygonRef.current.setMap(null);
            }
        };

    }, [map, path]); // The effect depends on 'map' and 'path' state.

    return (
        <></>
    )
}

export default Polygon;