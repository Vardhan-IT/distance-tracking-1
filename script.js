let prevLat = null, prevLon = null;

let totalDistance = 0;

let watchId = null;

function haversine(lat1, lon1, lat2, lon2) {

    const R = 6371; // Earth's radius in km

    const dLat = (lat2 - lat1) * (Math.PI / 180);

    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +

              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *

              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

function startTracking() {

    if ("geolocation" in navigator) {

        watchId = navigator.geolocation.watchPosition(position => {

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;

            document.getElementById("latitude").innerText = lat.toFixed(6);

            document.getElementById("longitude").innerText = lon.toFixed(6);

            if (prevLat !== null && prevLon !== null) {

                totalDistance += haversine(prevLat, prevLon, lat, lon);

                document.getElementById("distance").innerText = totalDistance.toFixed(3);

            }

            prevLat = lat;

            prevLon = lon;

        }, error => {

            console.error("Error getting location:", error);

        }, { enableHighAccuracy: true, maximumAge: 0 });

    } else {

        alert("Geolocation is not supported in your browser");

    }

}
