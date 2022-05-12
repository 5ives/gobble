import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibG9yZW56b3BhcmFzIiwiYSI6ImNsMzMydWtmcDJiem4zY281a2EzcmZzZnQifQ.3ogvC2s-cq0Kqz-egooyPw';

function App() {
	const mapContainer = useRef<any>(null);
	const map = useRef<any>(null);
	const [lng, setLng] = useState(151.2093);
	const [lat, setLat] = useState(-33.8688);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [lng, lat],
			zoom: zoom
		});
	});

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<div ref={mapContainer} className="map-container" />
				</div>
			</header>
		</div>
	);
}

export default App;
