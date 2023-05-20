
// mapboxgl.accessToken = 'pk.eyJ1IjoiaXJvbmljYmF0NyIsImEiOiJjbGh0cnl3eXUwZWZxM3JvM2dxN2EwOTg4In0.oP4asaHNa2qA7msHqVgYvw';
mapboxgl.accessToken = mapToken   
// this mapToken having access token referenced 
//from the show.ejs where ejs syntax supported <%- %>


const map = new mapboxgl.Map({
	container: 'map', // container ID
	// projections: "globe",
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	// center: [-74.5, 40], // starting position [lng, lat]
	center: campground.geometry.coordinates,
	zoom: 10, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());



new mapboxgl.Marker()
	.setLngLat(campground.geometry.coordinates)
	.setPopup(
			new mapboxgl.Popup({offset: 25})
			.setHTML(
					`<p><h5>${campground.title}</h5></p>${campground.location}`
				)
		)
	.addTo(map)


// map.on('style.load', () => {
//     map.setFog({
//         color: 'rgb(186, 210, 235)', // Lower atmosphere
//         'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
//         'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
//         'space-color': 'rgb(11, 11, 25)', // Background color
//         'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
//     });
// });




