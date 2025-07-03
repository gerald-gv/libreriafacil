import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import * as turf from "@turf/turf";
import L from "leaflet";
import geojson from "../utils/lima_metropolitana.json";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Swal from "sweetalert2";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../estilos/mapa.css";

// Componente del control de búsqueda
const SearchControl = ({ onUbicacionSeleccionada }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      searchLabel: "Busca tu dirección en Lima Metropolitana...",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lon, y: lat, label: direccion } = result.location;
      const punto = turf.point([lon, lat]);

      const estaEnLima = geojson.features.some((feature) =>
        turf.booleanPointInPolygon(punto, feature)
      );

      // Verifica si esta dentro de Lima Metropolitana
      if (!estaEnLima) {
        Swal.fire({
          icon: 'error',
          title: 'Direccion No Encontrada',
          text: 'La dirección seleccionada NO está dentro de Lima Metropolitana.',
          confirmButtonText: 'De acuerdo'
        })
        // Restaurar vista a Lima
        map.setView([-12.0464, -77.0428], 11);
        return;
      }

      // Si es correcto, se crea un marcador
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const customIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const marker = L.marker([lat, lon], { icon: customIcon });
      marker.addTo(map);
      markerRef.current = marker;

      map.setView([lat, lon], 15);

      onUbicacionSeleccionada({ direccion, lat, lon });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onUbicacionSeleccionada]);

  return null;
};

// Componente principal del mapa
const MapaInteractivo = ({ onUbicacionSeleccionada }) => {
  return (
    <div className="contenedor-mapa">
      <MapContainer
        center={[-12.0464, -77.0428]} // Lima
        zoom={12}
        scrollWheelZoom={true}
        className="mapa-leaflet"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl onUbicacionSeleccionada={onUbicacionSeleccionada} />
      </MapContainer>
    </div>
  );
};

export default MapaInteractivo;