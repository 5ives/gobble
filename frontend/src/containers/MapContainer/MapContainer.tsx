/* eslint-disable @typescript-eslint/no-unused-vars */ // remove once setters are being used

import { useEffect, useState, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';

import { LOCATIONS, DEFAULT_ZOOM, DEFAULT_LONGITUDE, DEFAULT_LATITUDE } from '../../consts/locations';
import { MAP_STYLES } from '../../consts/map-styles';

import { MapContainerWrapper } from './MapContainerStyles';
import { SearchContext } from '../../context/useSearchContext/useSearchContext';
import { RESTAURANTS } from '../../consts/restaurants';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const MapContainer = () => {
    const [currLocation, setCurrLocation] = useState({ long: DEFAULT_LONGITUDE, lat: DEFAULT_LATITUDE });
    const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
    const { searchInput } = useContext(SearchContext);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        // initialise map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAP_STYLES.DARK,
            center: [currLocation.long, currLocation.lat],
            zoom: DEFAULT_ZOOM
        });

        // fly to user's location on load
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrLocation({ long: position.coords.longitude, lat: position.coords.latitude })
            map.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude], zoom: 16 });
        });

        let features: any[] = [];
        RESTAURANTS.forEach(restaurant => {
            console.log(searchInput);
            if (restaurant.menu.some(item => item.price >= searchInput.minPrice && item.price <= searchInput.maxPrice)) {
                features.push({
                    type: 'Feature',
                    properties: {
                        description: restaurant.name
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [ restaurant.coordinates.lat, restaurant.coordinates.long ]
                    }
                });
            }
        });

        console.log(features);

        map.current.on('load', () => {
            map.current?.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': features
                },
            });
    
            // Add a layer showing the places.
            map.current?.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                'paint': {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });
        });

        map.current.on('flyTo', () => {
            map.current?.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                'description': 'The place'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [currLocation.long, currLocation.lat]
                            }
                        }
                    ]
                },
            });
        });
        
    });

    return (
        <div>
            <MapContainerWrapper ref={mapContainer}/>
        </div>
    )
}

export default MapContainer;
