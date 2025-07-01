import * as turf from "@turf/turf";
import geojson from "./lima_metropolitana.json";

const OPENCAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

export async function validarDireccion(direccionTexto) {
    //Validar direcciones largas
    if (!direccionTexto || direccionTexto.trim().length < 10) {
        return {
            valido: false,
            mensaje: "Ingrese una direccion verdadera (calle, número, distrito)"
        }
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        direccionTexto + ", Lima, Peru"
    )}&key=${OPENCAGE_API_KEY}&language=es&pretty=1`;

    const response = await fetch(url);
    const data = await response.json();

    //Validacion de direccion
    if (!data.results || data.results.length === 0) {
        return { valido: false, mensaje: "Dirección no encontrada" };
    }

    const { lat, lng } = data.results[0].geometry;
    const punto = turf.point([lng, lat]);

    // guardar las coordenadas de poligono en campoLima
    const estaEnLima = geojson.features.some((feature) =>
        turf.booleanPointInPolygon(punto, feature)
    );

    //Retornar la direccion con coords y decir si es correcta o no
    return {
        valido: estaEnLima,
        mensaje: estaEnLima ? "Direccion Valida para Lima Metropolitana"
            : "La direccion no pertenece a Lima Metropolitana",
        lat,
        lon: lng,
    };
}