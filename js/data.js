/* ============================================================================
   KWESX NASA KWEKWE — Vocabulario de las partes del cuerpo en Nasa Yuwe
   ----------------------------------------------------------------------------
   Fuente: documento «KWEKWE NASA – PARTES DEL CUERPO · Nasa Yuwe – Español»
   (IV semestre). Se conservan las grafías tal como aparecen en la fuente.

   Cada entrada:
     id     -> identificador estable (también da nombre al audio y a la imagen)
     es     -> significado en español
     ny     -> palabra en Nasa Yuwe (ortografía de la fuente)
     region -> agrupación visual
     img    -> nombre de archivo dentro de img/ (vacío si no hay fotografía)
     nota   -> aclaración opcional

   AUDIO:  la app busca audios/<id>.mp3   (ver INSTRUCCIONES_AUDIOS.md)
   IMAGEN: la app busca img/<img>         (fotografías reales en img/)
   ========================================================================== */

const AUDIO_BASE = "audios/";
const AUDIO_EXT  = ".mp3";
const IMG_BASE   = "img/";

/* regiones para agrupar galería y tarjetas */
const REGIONES = {
  cara:   "Cara y cabeza",
  tronco: "Tronco",
  brazo:  "Brazo y mano",
  pierna: "Pierna y pie",
};

const VOCABULARIO = [
  /* ---------------- cara y cabeza ---------------- */
  { id: "cabeza",   es: "cabeza",                     ny: "Çhuk",            region: "cara",   img: "cabeza.jpg",    nota: "" },
  { id: "cabello",  es: "cabello",                    ny: "Dxkhas",          region: "cara",   img: "cabello.jpg",   nota: "" },
  { id: "cara",     es: "cara",                       ny: "Dxi´p",           region: "cara",   img: "cara.jpg",      nota: "" },
  { id: "frente",   es: "frente",                     ny: "Kneene",          region: "cara",   img: "frente.jpg",    nota: "" },
  { id: "cejas",    es: "cejas",                      ny: "Yafxkwetkhas",    region: "cara",   img: "cejas.jpg",     nota: "" },
  { id: "ojo",      es: "ojo",                        ny: "Yafx",            region: "cara",   img: "ojo.jpg",       nota: "" },
  { id: "lagrimal", es: "lagrimal",                   ny: "Yafx dxi´kh susuu", region: "cara", img: "lagrimal.jpg",  nota: "" },
  { id: "pestanas", es: "pestañas",                   ny: "Yafx Khas",       region: "cara",   img: "pestanas.jpg",  nota: "" },
  { id: "nariz",    es: "nariz",                      ny: "Içh",             region: "cara",   img: "nariz.jpg",     nota: "" },
  { id: "mejilla",  es: "mejilla",                    ny: "Pukakwet",        region: "cara",   img: "mejilla.jpg",   nota: "" },
  { id: "labios",   es: "labio",                      ny: "Yuwe kha´tx",     region: "cara",   img: "labios.jpg",    nota: "" },
  { id: "boca",     es: "boca",                       ny: "Yuwe",            region: "cara",   img: "boca.jpg",      nota: "También significa «palabra / lengua»." },
  { id: "diente",   es: "diente",                     ny: "Ki'th",           region: "cara",   img: "diente.jpg",    nota: "" },
  { id: "cumbamba", es: "quijada (cumbamba)",         ny: "Kbaba",           region: "cara",   img: "cumbamba.jpg",  nota: "" },
  { id: "oreja",    es: "oreja",                      ny: "Thũ´wẽ",          region: "cara",   img: "oreja.jpg",     nota: "" },
  { id: "oido",     es: "oído",                       ny: "Thũ´wẽ kafx",     region: "cara",   img: "oido.jpg",      nota: "" },
  { id: "cuello",   es: "cuello",                     ny: "Txhik",           region: "cara",   img: "cuello.jpg",    nota: "" },

  /* ---------------- tronco ---------------- */
  { id: "pecho",     es: "pecho",                      ny: "Peçxu",           region: "tronco", img: "pecho.jpg",     nota: "" },
  { id: "senos",     es: "pechos / senos de la mujer", ny: "Çhu´çx",          region: "tronco", img: "senos.jpg",     nota: "" },
  { id: "espalda",   es: "espalda",                    ny: "Çiz",             region: "tronco", img: "espalda.jpg",   nota: "" },
  { id: "ombligo",   es: "ombligo",                    ny: "Sxab kul",        region: "tronco", img: "ombligo.jpg",   nota: "" },
  { id: "nalga",     es: "nalga",                      ny: "Yuk",             region: "tronco", img: "nalga.jpg",     nota: "" },
  { id: "sobaco",    es: "sobaco",                     ny: "Puza kafx",       region: "tronco", img: "sobaco.jpg",    nota: "" },
  { id: "genitales", es: "órganos genitales",          ny: "Thaameé",         region: "tronco", img: "genitales.jpg", nota: "" },

  /* ---------------- brazo y mano ---------------- */
  { id: "brazo",      es: "brazo",               ny: "Ku´ta",       region: "brazo", img: "brazo.jpg",      nota: "" },
  { id: "codo",       es: "codo",                ny: "Fxizxa",      region: "brazo", img: "codo.jpg",       nota: "" },
  { id: "mano",       es: "mano",                ny: "Kuse",        region: "brazo", img: "mano.jpg",       nota: "También significa «suerte»." },
  { id: "dedos-mano", es: "dedos de la mano",    ny: "Kuse musx",   region: "brazo", img: "dedos-mano.jpg", nota: "" },
  { id: "palma-mano", es: "palma de la mano",    ny: "Kuse phaph",  region: "brazo", img: "palma-mano.jpg", nota: "" },

  /* ---------------- pierna y pie ---------------- */
  { id: "piernas",     es: "piernas",           ny: "Ji´be",         region: "pierna", img: "piernas.jpg",     nota: "" },
  { id: "rodilla",     es: "rodilla",           ny: "Nxukwet",       region: "pierna", img: "rodilla.jpg",     nota: "" },
  { id: "canilla",     es: "canilla",           ny: "Pil",           region: "pierna", img: "canilla.jpg",     nota: "" },
  { id: "gemelos",     es: "gemelos / canilla", ny: "Pil tutx",      region: "pierna", img: "gemelos.jpg",     nota: "" },
  { id: "pantorrilla", es: "pantorrilla",       ny: "Peçx kafx",     region: "pierna", img: "pantorrilla.jpg", nota: "" },
  { id: "tobillo",     es: "tobillo",           ny: "Çxida ka´ka",   region: "pierna", img: "tobillo.jpg",     nota: "" },
  { id: "pie",         es: "pie",               ny: "Çxida",         region: "pierna", img: "pie.jpg",         nota: "" },
  { id: "dedos-pie",   es: "dedos del pie",     ny: "Çxida musx",    region: "pierna", img: "",                nota: "" },
  { id: "planta-pie",  es: "planta del pie",    ny: "Çxida phaph",   region: "pierna", img: "",                nota: "" },
  { id: "talon",       es: "talón",             ny: "Çxida thã´sx",  region: "pierna", img: "",                nota: "" },
];

/* Ruta de la imagen (devuelve "" si la entrada no tiene fotografía) */
function imagenDe(id) {
  var t = buscarPorId(id);
  return (t && t.img) ? IMG_BASE + t.img : "";
}

/* Ruta de audio completa para una entrada */
function audioDe(id) {
  return AUDIO_BASE + id + AUDIO_EXT;
}

/* Búsqueda de una entrada por su id */
function buscarPorId(id) {
  return VOCABULARIO.find(function (t) { return t.id === id; }) || null;
}

/* Entradas que sí tienen fotografía (para la galería) */
function conImagen() {
  return VOCABULARIO.filter(function (t) { return t.img; });
}
