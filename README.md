# Kwe'sx Nasa Kwekwe · Partes del cuerpo en Nasa Yuwe

App web **interactiva** para enseñar las partes del cuerpo (*kwe'sx nasa kwekwe*)
en lengua **Nasa Yuwe** (pueblo Nasa/Páez, Cauca, Colombia), con **fotografías
reales** de cada parte.

Es una aplicación **100 % estática** (HTML + CSS + JavaScript, sin dependencias
ni servidor obligatorio): funciona abriendo `index.html` directamente o
sirviéndola desde un servidor local.

## Qué incluye

- **📷 Galería** — 36 fotografías reales del cuerpo; al tocar una se abre un
  detalle con su nombre en Nasa Yuwe, su significado en español, su región,
  notas y botón de audio.
- **🃏 Tarjetas** — flashcards volteables (fotografía ↔ Nasa Yuwe / español)
  con filtro por región (cara y cabeza, tronco, brazo y mano, pierna y pie).
- **🎯 Juego** — cuestionario de opción múltiple con puntaje y racha; incluye
  un modo con **fotografía** (¿cómo se llama en Nasa Yuwe?).
- **🧠 Memoria** — juego de parejas (palabra Nasa Yuwe ↔ significado español).
- **🔊 Audio** — cada palabra tiene su botón de escucha; la app detecta si el
  archivo existe y avisa si está pendiente.

## Cómo ejecutarla

**Opción A — abrir directamente:** haz doble clic en `index.html`.

**Opción B — servidor local** (recomendado, evita límites de `file://`):

```bash
# desde la carpeta del proyecto
python -m http.server 8000
# o, si tienes Node.js:
npx serve .
```

Luego abre `http://localhost:8000`.

## Estructura

```
kwesx-nasa-kwekwe/
├─ index.html                # interfaz
├─ css/style.css             # estilos (tema Nasa: tierra y tejido)
├─ js/data.js                # vocabulario, rutas de imagen y audio
├─ js/app.js                 # lógica (galería, tarjetas, juego, memoria, audio)
├─ img/                      # 36 fotografías reales de las partes del cuerpo
├─ audios/                   # ← VACÍA: aquí se colocan los audios
├─ INSTRUCCIONES_AUDIOS.md   # cómo nombrar y enlazar los audios
└─ README.md
```

## Imágenes

La carpeta `img/` contiene las **36 fotografías** suministradas (cara, ojo,
nariz, boca, oreja, cuello, brazo, mano, pie…). Se enlazan automáticamente desde
`js/data.js` mediante el campo `img` de cada entrada. Tres términos del
vocabulario (dedos del pie, planta del pie y talón) no tienen fotografía y por
eso no aparecen en la galería, aunque sí en las tarjetas y los juegos.

## Audios

La carpeta `audios/` se entrega **vacía a propósito**. Los audios se enlazan
automáticamente por convención de nombre (`audios/<id>.mp3`). Lee
**[`INSTRUCCIONES_AUDIOS.md`](INSTRUCCIONES_AUDIOS.md)** para ver la tabla
completa de 39 archivos y cómo grabarlos.

## Fuente del vocabulario

- **Documento «KWEKWE NASA – PARTES DEL CUERPO · Nasa Yuwe – Español»**
  (IV semestre), suministrado para esta app. Se conservan las grafías tal como
  aparecen en la fuente (por ejemplo `Çxida` = pie, `Yafx` = ojo,
  `Thũ´wẽ` = oreja).

> **Nota de respeto cultural:** esta app es una herramienta de apoyo para la
> revitalización de la lengua. La pronunciación correcta debe tomarse de
> hablantes nativos; por eso los audios se dejan listos para grabar en comunidad.
