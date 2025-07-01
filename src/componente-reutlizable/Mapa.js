import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../estilos/mapa.css";
import "leaflet/dist/leaflet.css";

const marcadorIcon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

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
            </MapContainer>
        </div>
    )
}

export default Mapa;

