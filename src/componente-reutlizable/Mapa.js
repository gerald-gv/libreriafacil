import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "../estilos/mapa.css";
import "leaflet/dist/leaflet.css";

//Establecemos el Icono para el mapa
const marcadorIcon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

// Componente auxiliar para mover el mapa cuando cambian las coordenadas
const MoverMapa = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 16);
    }
  }, [lat, lon, map]);

  return null;
};


//Cramos el Mapa segun las coordenadas
const Mapa = ({ lat, lon }) => {
    if (!lat || !lon) return null;

    return (
        <div className="contenedor-mapa">
            <MapContainer
                center={[lat, lon]}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} icon={marcadorIcon}>
                    <Popup>Tu direccion</Popup>
                </Marker>
                <MoverMapa lat={lat} lon={lon} />
            </MapContainer>
        </div>
    )
}

export default Mapa;

