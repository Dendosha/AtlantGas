import * as ymaps3 from "ymaps3"

async function initMap() {
	if (!document.getElementById('interactiveMap')) return

	await ymaps3.ready;

	const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, YMapControlButton } = ymaps3;

	const map = new YMap(
		document.getElementById('interactiveMap'),
		{
			location: {
				center: [37.772638, 55.547507],
				zoom: 16
			},
			showScaleInCopyrights: true,
			behaviors: ['drag', 'scrollZoom', 'dblClick', 'mouseTilt', "mouseRotate"],
			zoomRange: { min: 14, max: 21 },
		},
		[
			new YMapDefaultSchemeLayer({}),
			new YMapDefaultFeaturesLayer({}),
		]
	);

	const controls = new YMapControls({ position: 'top left', orientation: 'vertical' });

	const gotoSelectedLocationElement = document.createElement('img')
	gotoSelectedLocationElement.classList.add('map__control')
	gotoSelectedLocationElement.src = 'img/favicon.svg'

	function gotoSelectedLocationButtonHandler() {
		map.setLocation({
			center: [37.772638, 55.547507],
		})
	}

	const gotoSelectedLocationButton = new YMapControlButton({
		element: gotoSelectedLocationElement,
		onClick: gotoSelectedLocationButtonHandler,
	})

	controls.addChild(new YMapZoomControl({}))
	controls.addChild(new YMapGeolocationControl({}))
	controls.addChild(gotoSelectedLocationButton)

	const markerElement = document.createElement('img')
	markerElement.classList.add('map__location-icon')
	markerElement.src = 'img/icons/location.svg'

	map.addChild(controls);
	map.addChild(new YMapMarker({
		coordinates: [37.772638, 55.547507],
	}, markerElement))
}

try {
	initMap()
} catch (e) {
	console.error(e.message)
}