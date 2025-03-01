import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-boundary-canvas";

// Custom component to handle BoundaryCanvas layer
const BoundaryTileLayer = ({ geoJsonData }) => {
    const map = useMap();

    useEffect(() => {
        if (!geoJsonData) return;

        // Create the boundary canvas layer
        const boundaryLayer = new L.TileLayer.BoundaryCanvas(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                boundary: geoJsonData,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                backgroundColor: "rgba(255, 255, 255, 1)", // White background outside France
            }
        );

        // Add the layer to the map
        boundaryLayer.addTo(map);

        // Cleanup function
        return () => {
            map.removeLayer(boundaryLayer);
        };
    }, [geoJsonData, map]);

    return null;
};

const MapComponent = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        const fetchGeoJSON = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/georgique/world-geojson/develop/countries/france.json"
                );
                if (!response.ok) throw new Error("Failed to fetch GeoJSON");
                setGeoJsonData(await response.json());
            } catch (error) {
                console.error("Error loading GeoJSON:", error);
            }
        };

        fetchGeoJSON();
    }, []);

    // Get France's bounds
    const franceBounds = geoJsonData
        ? L.geoJSON(geoJsonData).getBounds()
        : [[-90, -180], [90, 180]];

    return (
        <MapContainer
            center={[46.603354, 1.888334]}
            zoom={6}
            bounds={franceBounds}
            maxBounds={franceBounds}
            maxBoundsViscosity={1.0}
            style={{ height: "500px", width: "100%" }}
            dragging={false}
            zoomControl={false}
        >
            {/* Custom Boundary Canvas Layer */}
            {geoJsonData && <BoundaryTileLayer geoJsonData={geoJsonData} />}

            {/* France borders */}
            {geoJsonData && (
                <GeoJSON
                    data={geoJsonData}
                    style={{ color: "blue", weight: 2, fillOpacity: 0 }}
                />
            )}
        </MapContainer>
    );
};

export default MapComponent;
// const MapComponent = () => {

//     // const mapConfig = {
//     //     lat: 22,
//     //     lng: -72,
//     //     zoom: 6
//     // };
//     // return (
//     //     <Map center={[mapConfig.lat, mapConfig.lng]} zoom={mapConfig.zoom}>
//     //     <FullscreenControl position="topleft" />
//     //     {/* <DrawTools /> */}
//     //     <TileLayer
//     //         attribution="Tiles &copy; Carto"
//     //         // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
//     //         url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
//     //     />s
//     // </Map>)
//     // const mapRef = useRef(null);
//     // const [zoneDetails, setZoneDetails] = useState('Trace the creator of most valuable painting.');
//     // const mapInstance = useRef(null);
//     // const geoJsonLayer = useRef(null);
//     //
//     // useEffect(() => {
//     //     mapInstance.current = L.map(mapRef.current, {
//     //         zoomAnimation: true,
//     //         fadeAnimation: true,
//     //         easeLinearity: 0.25,
//     //         zoomEaseDuration: 300
//     //     });
//     //
//     //     fetch('https://raw.githubusercontent.com/georgique/world-geojson/develop/countries/france.json')
//     //         .then(response => response.json())
//     //         .then(geoJSON => {
//     //             const osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     //                 boundary: geoJSON,
//     //                 attribution: '© OpenStreetMap contributors'
//     //             });
//     //
//     //             const baseMaps = {
//     //                 "OpenStreetMap": osm,
//     //                 "Satellite": new L.TileLayer.BoundaryCanvas('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { boundary: geoJSON }),
//     //                 "Terrain": new L.TileLayer.BoundaryCanvas('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=cbbbd390bdda409da7a33f21cb38411e', { boundary: geoJSON })
//     //             };
//     //
//     //             L.control.layers(baseMaps).addTo(mapInstance.current);
//     //             mapInstance.current.addLayer(osm);
//     //
//     //             geoJsonLayer.current = L.geoJSON(geoJSON, {
//     //                 style: {
//     //                     color: 'blue',
//     //                     weight: 2,
//     //                     fillOpacity: 0.0
//     //                 }
//     //             }).addTo(mapInstance.current);
//     //
//     //             // Charger les zones rouges
//     //             fetch('/red_zones')
//     //                 .then(response => response.json())
//     //                 .then(handleRedZones)
//     //                 .catch(console.error);
//     //
//     //             mapInstance.current.fitBounds(geoJsonLayer.current.getBounds());
//     //         });
//     //
//     //     return () => mapInstance.current?.remove();
//     // }, []);
//     //
//     // const handleRedZones = (data) => {
//     //     let selectedZone = null;
//     //
//     //     data.forEach(zone => {
//     //         const layer = L.geoJSON(zone.geom, {
//     //             style: {
//     //                 color: 'red',
//     //                 weight: 2,
//     //                 opacity: 0.6
//     //             }
//     //         });
//     //
//     //         layer.on({
//     //             click: (e) => {
//     //                 if (selectedZone) selectedZone.setStyle({ color: 'red' });
//     //                 selectedZone = e.target;
//     //                 e.target.setStyle({ color: 'green' });
//     //                 updateZoneInfo(e.target.feature.properties);
//     //             },
//     //             mouseover: (e) => {
//     //                 L.popup()
//     //                     .setLatLng(e.latlng)
//     //                     .setContent(e.target.feature.properties.name)
//     //                     .openOn(mapInstance.current);
//     //             },
//     //             mouseout: () => mapInstance.current.closePopup()
//     //         });
//     //
//     //         layer.addTo(mapInstance.current);
//     //     });
//     // };
//     //
//     // const updateZoneInfo = (properties) => {
//     //     setZoneDetails(`
//     //   <strong>Name:</strong> ${properties.name}<br>
//     //   <strong>Area:</strong> ${properties.area || 'N/A'} km²<br>
//     //   <strong>Population:</strong> ${properties.population || 'N/A'}
//     // `);
//     // };
//     //
//     // return (
//     //     <div className="container">
//     //         <div className="map" ref={mapRef} />
//     //         <div className="zone-info">
//     //             <h2>Zone Information</h2>
//     //             <p dangerouslySetInnerHTML={{ __html: zoneDetails }} />
//     //         </div>
//     //     </div>
//     // );
// };
//
// export default MapComponent;

