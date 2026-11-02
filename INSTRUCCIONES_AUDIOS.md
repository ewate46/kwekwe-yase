# 🔊 INSTRUCCIONES PARA LOS AUDIOS — KWESX NASA KWEKWE

La carpeta `audios/` está **vacía a propósito**. La app ya está programada para
buscar los sonidos en ella; solo falta que agregues los archivos. Este documento
explica **cómo nombrarlos** y **cómo quedan enlazados** automáticamente.

---

## 1. Dónde se colocan

Coloca los archivos de audio **directamente dentro de la carpeta `audios/`**:

```
kwesx-nasa-kwekwe/
├─ index.html
├─ css/
├─ js/
├─ img/            ← fotografías (ya incluidas)
└─ audios/         ← aquí van los archivos .mp3 (uno por palabra)
```

No se usan subcarpetas. La app construye la ruta con esta regla fija
(definida en `js/data.js`):

```
audios/<id>.mp3
```

Donde `<id>` es el **identificador estable de cada palabra** (columna "id" de la
tabla de abajo). Es un identificador **en español, en minúsculas y sin tildes**
para que el nombre del archivo sea 100 % compatible con cualquier sistema.

---

## 2. Cómo se nombran (convención exacta)

1. Usa **el valor de la columna `id`**, tal como aparece en la tabla.
2. Todo en **minúsculas**.
3. **Sin tildes, sin espacios** (sustituye el espacio por guion `-`).
4. Extensión **`.mp3`** (es la que espera la app).
5. Formato recomendado: **MP3, mono o estéreo, 44.1 kHz, 128 kbps** (suficiente
   para voz). También puedes usar `.ogg`/`.wav`, pero entonces debes cambiar
   la constante `AUDIO_EXT` en `js/data.js` (no recomendado si no sabes editar código).

### Ejemplos

| Español            | Nasa Yuwe | Archivo que debes crear         |
|--------------------|-----------|---------------------------------|
| cara               | Dxi´p     | `audios/cara.mp3`               |
| ojo                | Yafx      | `audios/ojo.mp3`                |
| diente             | Ki'th     | `audios/diente.mp3`             |
| dedos de la mano   | Kuse musx | `audios/dedos-mano.mp3`         |
| palma de la mano   | Kuse phaph| `audios/palma-mano.mp3`         |

> ⚠️ Fíjate: el `id` **no es** la palabra en Nasa Yuwe tal cual, sino un nombre
> corto en español (sin tildes). Por ejemplo `oído` → archivo `oido.mp3` y
> `pestañas` → archivo `pestanas.mp3`.

---

## 3. Tabla completa de archivos

Crea **un archivo por fila**. La app detecta automáticamente si el archivo
existe o no (y muestra "audio pendiente" si falta).

| id              | Español                    | Nasa Yuwe       | Archivo esperado                    |
|-----------------|----------------------------|-----------------|-------------------------------------|
| `cabeza`        | cabeza                     | Çhuk            | `audios/cabeza.mp3`                 |
| `cabello`       | cabello                    | Dxkhas          | `audios/cabello.mp3`                |
| `cara`          | cara                       | Dxi´p           | `audios/cara.mp3`                   |
| `frente`        | frente                     | Kneene          | `audios/frente.mp3`                 |
| `cejas`         | cejas                      | Yafxkwetkhas    | `audios/cejas.mp3`                  |
| `ojo`           | ojo                        | Yafx            | `audios/ojo.mp3`                    |
| `lagrimal`      | lagrimal                   | Yafx dxi´kh susuu | `audios/lagrimal.mp3`             |
| `pestanas`      | pestañas                   | Yafx Khas       | `audios/pestanas.mp3`               |
| `nariz`         | nariz                      | Içh             | `audios/nariz.mp3`                  |
| `mejilla`       | mejilla                    | Pukakwet        | `audios/mejilla.mp3`                |
| `labios`        | labio                      | Yuwe kha´tx     | `audios/labios.mp3`                 |
| `boca`          | boca                       | Yuwe            | `audios/boca.mp3`                   |
| `diente`        | diente                     | Ki'th           | `audios/diente.mp3`                 |
| `cumbamba`      | quijada (cumbamba)         | Kbaba           | `audios/cumbamba.mp3`               |
| `oreja`         | oreja                      | Thũ´wẽ          | `audios/oreja.mp3`                  |
| `oido`          | oído                       | Thũ´wẽ kafx     | `audios/oido.mp3`                   |
| `cuello`        | cuello                     | Txhik           | `audios/cuello.mp3`                 |
| `pecho`         | pecho                      | Peçxu           | `audios/pecho.mp3`                  |
| `senos`         | pechos / senos de la mujer | Çhu´çx          | `audios/senos.mp3`                  |
| `espalda`       | espalda                    | Çiz             | `audios/espalda.mp3`                |
| `ombligo`       | ombligo                    | Sxab kul        | `audios/ombligo.mp3`                |
| `nalga`         | nalga                      | Yuk             | `audios/nalga.mp3`                  |
| `sobaco`        | sobaco                     | Puza kafx       | `audios/sobaco.mp3`                 |
| `genitales`     | órganos genitales          | Thaameé         | `audios/genitales.mp3`              |
| `brazo`         | brazo                      | Ku´ta           | `audios/brazo.mp3`                  |
| `codo`          | codo                       | Fxizxa          | `audios/codo.mp3`                   |
| `mano`          | mano                       | Kuse            | `audios/mano.mp3`                   |
| `dedos-mano`    | dedos de la mano           | Kuse musx       | `audios/dedos-mano.mp3`             |
| `palma-mano`    | palma de la mano           | Kuse phaph      | `audios/palma-mano.mp3`             |
| `piernas`       | piernas                    | Ji´be           | `audios/piernas.mp3`                |
| `rodilla`       | rodilla                    | Nxukwet         | `audios/rodilla.mp3`                |
| `canilla`       | canilla                    | Pil             | `audios/canilla.mp3`                |
| `gemelos`       | gemelos / canilla          | Pil tutx        | `audios/gemelos.mp3`                |
| `pantorrilla`   | pantorrilla                | Peçx kafx       | `audios/pantorrilla.mp3`            |
| `tobillo`       | tobillo                    | Çxida ka´ka     | `audios/tobillo.mp3`                |
| `pie`           | pie                        | Çxida           | `audios/pie.mp3`                    |
| `dedos-pie`     | dedos del pie              | Çxida musx      | `audios/dedos-pie.mp3`              |
| `planta-pie`    | planta del pie             | Çxida phaph     | `audios/planta-pie.mp3`             |
| `talon`         | talón                      | Çxida thã´sx    | `audios/talon.mp3`                  |

**Total: 39 archivos.**

---

## 4. Cómo se "enlazan" (no tienes que editar código)

El enlace es **automático** y está definido en `js/data.js`:

```js
const AUDIO_BASE = "audios/";
const AUDIO_EXT  = ".mp3";
// ...
{ id: "cara", es: "cara", ny: "Dxi´p", ... }   // → busca audios/cara.mp3
```

Cada entrada del vocabulario lleva su `id`, y la app arma la ruta con
`AUDIO_BASE + id + AUDIO_EXT`. Por eso **solo debes respetar el nombre del
archivo**; no hace falta tocar HTML ni JavaScript.

Si un día quieres cambiar la carpeta o el formato, edita únicamente esas dos
constantes en `js/data.js`.

---

## 5. Cómo grabar los audios (recomendación)

- Pide la pronunciación a **un hablante nativo o a un docente bilingüe** de la
  comunidad Nasa (la pronunciación correcta de las consonantes aspiradas y de
  las vocales nasales es esencial; recuerda que en Nasa Yuwe **no existe la
  vocal "o"**).
- Graba **una sola palabra por archivo**, con pausa al inicio y al final
  (0.3–0.5 s de silencio).
- Pronuncia de forma clara y a velocidad normal; no añadas música ni efectos.
- Nombra el archivo **exactamente** según la tabla de la sección 3.
- Opcional: conserva el audio en español como respaldo, pero **la app solo usa
  el archivo en Nasa Yuwe** (el nombre `id.mp3`).

---

## 6. Verificar que todo funciona

1. Coloca los `.mp3` en `audios/`.
2. Abre `index.html` (o sírvelo con un servidor local, ver `README.md`).
3. Pulsa **"🔊 Probar audios"** en la cabecera: la app revisa los 39 archivos
   y te dice cuántos están presentes y cuántos faltan.
4. En "Galería", toca una fotografía y pulsa **"🔊 Escuchar"**; en "Tarjetas"
   cada tarjeta tiene su botón de audio.
