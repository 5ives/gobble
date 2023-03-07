import { useEffect, useState, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';

import { DEFAULT_ZOOM, DEFAULT_LONGITUDE, DEFAULT_LATITUDE } from '../../consts/locations';
import { MAP_STYLES } from '../../consts/map-styles';
import "./MapContainerStyles.css";

import { MapContainerWrapper } from './MapContainerStyles';
import { IRestaurantContext } from '../../context/useRestaurantContext/useRestaurantContextTypes';
import { RestaurantContext } from '../../context/useRestaurantContext/useRestaurantContext';
import { Restaurant } from '../../types/restaurant.type';
import reactElementToString from '../../utils/reactElementToString';
import MapNode from '../../components/MapContainer/MapNode/MapNode';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const MapContainer = () => {
    const [currLocation, setCurrLocation] = useState({ long: DEFAULT_LONGITUDE, lat: DEFAULT_LATITUDE });
    const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
    const { restaurants } = useContext<IRestaurantContext>(RestaurantContext);

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

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.current?.on('click', 'places', (e: any) => {

            if (!e || !e.features[0] || !e.features[0].properties) return;

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const html = e.features[0].properties.html;
            
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            if (!map || !map.current) return;
            
            new mapboxgl.Popup({ className: 'restaurant-popup' })
                .setLngLat(coordinates)
                .setHTML(html)
                .addTo(map.current);
        });
        
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.current?.on('mouseenter', 'places', () => {
            if (!map || !map.current) return;
            map.current.getCanvas().style.cursor = 'pointer';
        });
        
        // Change it back to a pointer when it leaves.
        map.current?.on('mouseleave', 'places', () => {
            if (!map || !map.current) return;
            map.current.getCanvas().style.cursor = '';
        });

        return map;
    };

    const getMapFeatures = () => {
        let features: any[] = [];
        restaurants.forEach((restaurant: Restaurant) => {
            features.push({
                type: 'Feature',
                properties: { html: reactElementToString(
                    <MapNode
                        restaurantName={ restaurant.name }
                        menuItemName={ restaurant.menuItems[0].name }
                        menuItemPrice={ restaurant.menuItems[0].price }
                    />
                )},
                geometry: { type: 'Point', coordinates: [ restaurant.long, restaurant.lat ] }
            });
        })
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
};

export default MapContainer;
