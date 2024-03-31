import * as ymaps3 from "ymaps3"

async function initMap() {
	if (!document.getElementById('interactiveMap')) return

	await ymaps3.ready;

	const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker } = ymaps3;

	const map = new YMap(
		document.getElementById('interactiveMap'),
		// Pass the map initialization parameters
		{
			location: {
				center: [37.772638, 55.547507],
				zoom: 16
			},
			showScaleInCopyrights: true,
			behaviors: ['drag', 'pinchZoom', 'mouseTilt'],
			zoomRange: { min: 14, max: 21 },
		},
		[
			// Add a map scheme layer
			new YMapDefaultSchemeLayer({}),
			// Add a layer of geo objects to display the markers
			new YMapDefaultFeaturesLayer({}),
		]
	);

	const controls = new YMapControls({ position: 'top left', orientation: 'vertical' });
	controls.addChild(new YMapZoomControl({}))
	controls.addChild(new YMapGeolocationControl({}))
	map.addChild(controls);

	const markerElement = document.createElement('img')
	markerElement.classList.add('map__location-icon')
	markerElement.src = 'img/icons/location.svg'

	map.addChild(new YMapMarker({ coordinates: [37.772638, 55.547507] }, markerElement))
}

initMap()