import React, { use, useEffect, useRef, useState } from 'react';
import { createRoot } from "react-dom/client";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import Polyline from './component/polyline';
import Polygon from './component/polygon';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { DeckGL } from '@deck.gl/react';
import { CSVLoader } from '@loaders.gl/csv';
import { load } from '@loaders.gl/core';
import * as wkt from 'wkt';
import { PolygonLayer } from 'deck.gl';
import TimeSlider from './component/slider';

const INITIAL_VIEW_STATE = {
    latitude: 35.68135179041109,
    longitude: 139.76710869501952,
    pitch: 40.5,
    zoom: 12
};

const processLayerData = (data, timestr) => {
    return data.map((d) => {
        return {
            h3id: d.h3id,
            point: wkt.parse(d.point).coordinates,
            poly: wkt.parse(d.poly).coordinates[0],
            count: d[`count_${timestr}_00`]
        }
    })
}

const App = () => {
    const [data, setData] = useState(null);
    const [layerData, setLayerData] = useState()
    const [timestr, setTimestr] = useState('00_00'); 

    useEffect(() => {
        load('/out.csv', CSVLoader).then(d => {
            setData(d.data)
        });
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            console.log(data)
            const layerData = processLayerData(data, timestr);
            setLayerData(layerData);
        }
    }, [data, timestr]);

    const layers = [
        new PolygonLayer({
            id: 'layer-place-count',
            data: layerData,
            getPolygon: (d) => d.poly,
            getElevation: (d) => Number(d.count) * 20,
            getFillColor: [255, 255, 0, 200],
            getLineColor: () => [255, 255, 255],
            getLineWidth: 1,
            lineWidthMinPixels: 1,
            pickable: true,
            onClick: (info, event) => clickHandler(info, event),
            extruded: true
        })
    ];

    return (
        <>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    layers={layers}
                    controller={true}>
                    <Map
                        defaultZoom={INITIAL_VIEW_STATE.zoom}
                        defaultCenter={{ lat: INITIAL_VIEW_STATE.latitude, lng: INITIAL_VIEW_STATE.longitude }}
                        mapId="e8188406bd40e24b10aa1128"
                        colorScheme='DARK'
                    >
                    </Map>
                </DeckGL>
            </APIProvider>
            <TimeSlider setTimestr={setTimestr}/>
        </>

    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default app