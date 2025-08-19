import { GoogleMapsContext } from '@vis.gl/react-google-maps';
import React, { useContext, useRef, useEffect, useState } from 'react';

const Polyline = ({locations}) => {
    const map = useContext(GoogleMapsContext)?.map;
    const polylineRef = useRef(null);

    // Use a state to store the path and update it in a useEffect.
    const [path, setPath] = useState([]);

    // This effect runs whenever props.locations changes.
    // It updates the local path state, preventing an infinite loop.
    useEffect(() => {
        if (locations && locations.length > 1) {
            setPath(locations.map(location => location.position));
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
        if (!polylineRef.current) {
            polylineRef.current = new google.maps.Polyline({
                map: map,
                strokeColor: "#FF0000",
            });
        }

        // Update the polyline's path whenever the path state changes.
        if (path.length > 1) {
            polylineRef.current.setPath(path);
            polylineRef.current.setMap(map); // Ensure it's on the map
        } else {
            // Remove the polyline from the map if there aren't enough points.
            polylineRef.current.setMap(null);
        }

        // Cleanup function: this runs when the component unmounts.
        return () => {
            if (polylineRef.current) {
                polylineRef.current.setMap(null);
            }
        };

    }, [map, path]); // The effect depends on 'map' and 'path' state.

    return (
        <></>
    )
}

export default Polyline;