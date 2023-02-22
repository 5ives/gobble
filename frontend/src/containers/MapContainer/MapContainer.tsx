import { useEffect, useState, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';

import { DEFAULT_ZOOM, DEFAULT_LONGITUDE, DEFAULT_LATITUDE } from '../../consts/locations';
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
        initMap();
        setupMapOnLoad();
        flyToUserLocation();
    });

    const initMap = () => {
        map.current =  new mapboxgl.Map({
            container: mapContainer.current,
            style: MAP_STYLES.DARK,
            center: [currLocation.long, currLocation.lat],
            zoom: DEFAULT_ZOOM
        });
    };

    const setupMapOnLoad = () => {
        map.current?.on('load', () => {
            map.current?.addSource('places', {
                'type': 'geojson',
                'data': { 'type': 'FeatureCollection', 'features': getMapFeatures() },
            });
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

        return map;
    };

    // TODO: use database to get restaurants instead
    const getMapFeatures = () => {
        let features: any[] = [];
        RESTAURANTS.forEach(restaurant => {
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
        return features;
    };

    const flyToUserLocation = async () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(position => {
            setCurrLocation({ long: position.coords.longitude, lat: position.coords.latitude })
            map.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude], zoom: 16 });
        });
    };

    return (
        <div>
            <MapContainerWrapper ref={mapContainer}/>
        </div>
    )
}

export default MapContainer;
