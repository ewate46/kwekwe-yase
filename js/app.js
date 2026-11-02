/* ==========================================================================
   KWESX NASA KWEKWE — Lógica de la app (vanilla JS, sin dependencias)
   Secciones: galería de fotos, tarjetas, juego (con foto) y memoria.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- utilidades ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  /* ---------------- audio ---------------- */
  var audiosFaltantes = {};

  function mostrarToast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("visible"); }, 2600);
  }

  function reproducir(id, boton) {
    var ruta = audioDe(id);
    var audio = new Audio(ruta);
    var yaAvisado = false;
    var avisar = function () {
      if (yaAvisado) return;
      yaAvisado = true;
      audiosFaltantes[id] = true;
      if (boton) boton.classList.add("faltante");
      // Solo avisa en pantalla cuando el usuario pulsó un botón de audio;
      // las reproducciones automáticas (juego/memoria) fallan en silencio.
      if (boton) mostrarToast("🔇 Audio pendiente: agrega " + ruta);
    };
    audio.onerror = avisar;
    var p = audio.play();
    if (p && p.catch) {
      p.catch(avisar);
    }
  }

  /* ---------------- pestañas ---------------- */
  function activarVista(nombre) {
    $$(".pestana").forEach(function (p) {
      var activa = p.getAttribute("data-vista") === nombre;
      p.classList.toggle("activa", activa);
      p.setAttribute("aria-selected", activa ? "true" : "false");
    });
    $$(".vista").forEach(function (v) {
      v.classList.toggle("activa", v.id === "vista-" + nombre);
    });
    if (nombre === "memoria") iniciarMemoria();
    if (nombre === "juego") iniciarJuego();
  }

  $$(".pestana").forEach(function (p) {
    p.addEventListener("click", function () { activarVista(p.getAttribute("data-vista")); });
  });

  /* ---------------- filtros por región (reutilizable) ---------------- */
  function construirFiltros(contId, lista, onSelect) {
    var cont = document.getElementById(contId);
    cont.innerHTML = "";

    var chipTodas = document.createElement("button");
    chipTodas.className = "chip activa";
    chipTodas.textContent = "Todas (" + lista.length + ")";
    chipTodas.addEventListener("click", function () {
      $$("#" + contId + " .chip").forEach(function (c) { c.classList.remove("activa"); });
      chipTodas.classList.add("activa");
      onSelect(null);
    });
    cont.appendChild(chipTodas);

    Object.keys(REGIONES).forEach(function (r) {
      var chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = REGIONES[r];
      chip.addEventListener("click", function () {
        $$("#" + contId + " .chip").forEach(function (c) { c.classList.remove("activa"); });
        chip.classList.add("activa");
        onSelect(r);
      });
      cont.appendChild(chip);
    });
  }

  /* ---------------- vista: galería ---------------- */
  function renderGaleria(region) {
    var cont = $("#rejilla-galeria");
    cont.innerHTML = "";
    var lista = conImagen();
    if (region) lista = lista.filter(function (t) { return t.region === region; });

    lista.forEach(function (t) {
      var card = document.createElement("button");
      card.className = "tarjeta-foto";
      card.type = "button";
      card.setAttribute("aria-label", t.es + " (" + t.ny + ")");

      var img = document.createElement("img");
      img.src = imagenDe(t.id);
      img.alt = t.es;
      img.onerror = function () { img.style.display = "none"; };

      var cap = document.createElement("span");
      cap.className = "tarjeta-foto-cap";
      var ny = document.createElement("b");
      ny.textContent = t.ny;
      var es = document.createElement("small");
      es.textContent = t.es;
      cap.appendChild(ny);
      cap.appendChild(es);

      card.appendChild(img);
      card.appendChild(cap);
      card.addEventListener("click", function () { abrirModal(t.id); });
      cont.appendChild(card);
    });
  }

  /* ---------------- modal de detalle ---------------- */
  function abrirModal(id) {
    var t = buscarPorId(id);
    if (!t) return;
    $("#modal-img").src = imagenDe(id);
    $("#modal-img").alt = t.es;
    $("#modal-region").textContent = REGIONES[t.region] || "";
    $("#modal-ny").textContent = t.ny;
    $("#modal-es").textContent = t.es;
    $("#modal-nota").textContent = t.nota || "";
    var btn = $("#modal-audio");
    btn.classList.remove("faltante");
    btn.onclick = function () { reproducir(id, btn); };
    $("#modal").classList.add("abierta");
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    $("#modal").classList.remove("abierta");
    document.body.style.overflow = "";
  }

  $("#modal-cerrar").addEventListener("click", cerrarModal);
  $("#modal-fondo").addEventListener("click", cerrarModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarModal();
  });

  /* ---------------- vista: tarjetas ---------------- */
  function renderTarjetas(region) {
    var cont = $("#rejilla-tarjetas");
    cont.innerHTML = "";
    var lista = region ? VOCABULARIO.filter(function (t) { return t.region === region; }) : VOCABULARIO;

    lista.forEach(function (t) {
      var tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.setAttribute("role", "button");
      tarjeta.setAttribute("tabindex", "0");
      tarjeta.setAttribute("aria-label", "Tarjeta: " + t.es);

      var btnAudio = document.createElement("button");
      btnAudio.className = "tarjeta-audio";
      btnAudio.type = "button";
      btnAudio.textContent = "🔊";
      btnAudio.setAttribute("aria-label", "Escuchar " + t.ny);
      btnAudio.addEventListener("click", function (e) {
        e.stopPropagation();
        reproducir(t.id, btnAudio);
      });

      var frente = document.createElement("div");
      frente.className = "tarjeta-cara tarjeta-frente";

      if (t.img) {
        var img = document.createElement("img");
        img.className = "tarjeta-img";
        img.src = imagenDe(t.id);
        img.alt = t.es;
        frente.appendChild(img);
        var overlay = document.createElement("div");
        overlay.className = "tarjeta-overlay";
        overlay.textContent = "toca para voltear";
        frente.appendChild(overlay);
      } else {
        var nombre = document.createElement("div");
        nombre.className = "tarjeta-nombre";
        nombre.textContent = t.ny;
        var hint = document.createElement("div");
        hint.className = "tarjeta-hint";
        hint.textContent = "toca para voltear";
        frente.appendChild(nombre);
        frente.appendChild(hint);
      }
      frente.appendChild(btnAudio);

      var atras = document.createElement("div");
      atras.className = "tarjeta-cara tarjeta-atras";
      var es = document.createElement("div");
      es.className = "tarjeta-es";
      es.textContent = t.es;
      var ny = document.createElement("div");
      ny.className = "tarjeta-ny";
      ny.textContent = t.ny;
      atras.appendChild(es);
      atras.appendChild(ny);
      if (t.nota) {
        var nota = document.createElement("div");
        nota.className = "nota";
        nota.textContent = t.nota;
        atras.appendChild(nota);
      }

      var inner = document.createElement("div");
      inner.className = "tarjeta-inner";
      inner.appendChild(frente);
      inner.appendChild(atras);
      tarjeta.appendChild(inner);

      var voltear = function () { tarjeta.classList.toggle("volteada"); };
      tarjeta.addEventListener("click", voltear);
      tarjeta.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); voltear(); }
      });

      cont.appendChild(tarjeta);
    });
  }

  /* ---------------- vista: juego ---------------- */
  var juego = { indice: 0, aciertos: 0, racha: 0, pregunta: null, total: 10 };

  function iniciarJuego() {
    juego = { indice: 0, aciertos: 0, racha: 0, pregunta: null, total: 10 };
    $("#juego-aciertos").textContent = "0";
    $("#juego-racha").textContent = "0";
    $("#juego-reiniciar").classList.add("oculto");
    siguientePregunta();
  }

  function siguientePregunta() {
    if (juego.indice >= juego.total) {
      $("#juego-pregunta").innerHTML =
        '<div class="palabra-grande">¡Terminaste! 🎉</div>' +
        '<p>Acertaste <b>' + juego.aciertos + "</b> de " + juego.total + ".</p>";
      $("#juego-opciones").innerHTML = "";
      $("#juego-reiniciar").classList.remove("oculto");
      return;
    }

    // elegir 1 correcta + 3 distractores
    var correcta = VOCABULARIO[Math.floor(Math.random() * VOCABULARIO.length)];
    var distractores = [];
    var copia = VOCABULARIO.filter(function (t) { return t.id !== correcta.id; });
    while (distractores.length < 3 && copia.length) {
      var i = Math.floor(Math.random() * copia.length);
      distractores.push(copia.splice(i, 1)[0]);
    }
    var opciones = [correcta].concat(distractores).sort(function () { return Math.random() - 0.5; });

    // modo: foto (si tiene imagen), español→ny, o ny→español
    var modos = ["es", "ny"];
    if (correcta.img) modos.push("foto");
    var modo = modos[Math.floor(Math.random() * modos.length)];
    juego.pregunta = { correcta: correcta, modo: modo };

    $("#juego-num").textContent = (juego.indice + 1) + "/" + juego.total;
    var cont = $("#juego-pregunta");
    cont.innerHTML = "";

    var pista = document.createElement("div");
    pista.className = "es-pista";

    if (modo === "foto") {
      pista.textContent = "¿Cómo se llama en Nasa Yuwe?";
      cont.appendChild(pista);
      var img = document.createElement("img");
      img.className = "juego-img";
      img.src = imagenDe(correcta.id);
      img.alt = "";
      cont.appendChild(img);
    } else if (modo === "es") {
      pista.textContent = "¿Cómo se dice en Nasa Yuwe?";
      var palabra = document.createElement("div");
      palabra.className = "palabra-grande";
      palabra.textContent = correcta.es;
      cont.appendChild(pista);
      cont.appendChild(palabra);
    } else {
      pista.textContent = "¿Qué significa en español?";
      var palabraNy = document.createElement("div");
      palabraNy.className = "palabra-grande ny-pista";
      palabraNy.textContent = correcta.ny;
      cont.appendChild(pista);
      cont.appendChild(palabraNy);
    }

    var contOpciones = $("#juego-opciones");
    contOpciones.innerHTML = "";
    opciones.forEach(function (t) {
      var b = document.createElement("button");
      b.className = "opcion";
      b.textContent = (modo === "ny") ? t.es : t.ny;
      b.setAttribute("data-id", t.id);
      b.addEventListener("click", function () { responder(b); });
      contOpciones.appendChild(b);
    });
  }

  function responder(boton) {
    var correctaId = juego.pregunta.correcta.id;
    var acierto = boton.getAttribute("data-id") === correctaId;

    $$("#juego-opciones .opcion").forEach(function (b) {
      b.disabled = true;
      if (b.getAttribute("data-id") === correctaId) b.classList.add("correcta");
    });
    if (!acierto) boton.classList.add("incorrecta");

    if (acierto) {
      juego.aciertos++;
      juego.racha++;
      mostrarToast("✅ ¡Correcto!");
      reproducir(correctaId);
    } else {
      juego.racha = 0;
      var c = juego.pregunta.correcta;
      mostrarToast("❌ Era: " + c.ny + " = " + c.es);
    }

    $("#juego-aciertos").textContent = juego.aciertos;
    $("#juego-racha").textContent = juego.racha;

    juego.indice++;
    setTimeout(siguientePregunta, acierto ? 900 : 1600);
  }

  $("#juego-reiniciar").addEventListener("click", iniciarJuego);

  /* ---------------- vista: memoria ---------------- */
  var memoria = { primera: null, bloqueado: false, parejas: 0 };

  function iniciarMemoria() {
    memoria = { primera: null, bloqueado: false, parejas: 0 };
    $("#memoria-parejas").textContent = "0";

    var mezcladas = VOCABULARIO.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 8);
    var cartas = [];
    mezcladas.forEach(function (t) {
      cartas.push({ id: t.id, tipo: "ny", texto: t.ny, pareja: t.id });
      cartas.push({ id: t.id, tipo: "es", texto: t.es, pareja: t.id });
    });
    cartas.sort(function () { return Math.random() - 0.5; });

    var cont = $("#rejilla-memoria");
    cont.innerHTML = "";
    cartas.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "carta-memoria";
      b.textContent = "◆";
      b.setAttribute("aria-label", "Carta oculta");
      b.addEventListener("click", function () { destapar(b, c); });
      cont.appendChild(b);
    });
  }

  function destapar(boton, carta) {
    if (memoria.bloqueado || boton.classList.contains("descubierta") || boton.classList.contains("emparejada")) return;

    boton.textContent = carta.texto;
    boton.classList.add("descubierta");
    if (carta.tipo === "es") boton.classList.add("es");

    if (!memoria.primera) {
      memoria.primera = { boton: boton, carta: carta };
      return;
    }

    var primera = memoria.primera;
    memoria.primera = null;

    if (primera.carta.pareja === carta.pareja) {
      primera.boton.classList.add("emparejada");
      primera.boton.classList.remove("descubierta");
      boton.classList.add("emparejada");
      boton.classList.remove("descubierta");
      memoria.parejas++;
      $("#memoria-parejas").textContent = memoria.parejas;
      reproducir(carta.id);
      if (memoria.parejas === 8) mostrarToast("🎉 ¡Completaste la memoria!");
    } else {
      memoria.bloqueado = true;
      setTimeout(function () {
        primera.boton.textContent = "◆";
        primera.boton.classList.remove("descubierta", "es");
        boton.textContent = "◆";
        boton.classList.remove("descubierta", "es");
        memoria.bloqueado = false;
      }, 850);
    }
  }

  $("#memoria-reiniciar").addEventListener("click", iniciarMemoria);

  /* ---------------- probar todos los audios ---------------- */
  $("#btn-todo-audio").addEventListener("click", function () {
    var existentes = 0, faltantes = 0, total = VOCABULARIO.length;
    var pendientes = VOCABULARIO.slice();

    function revisarUno() {
      if (pendientes.length === 0) {
        mostrarToast("🎧 Audios presentes: " + existentes + " · pendientes: " + faltantes + " (de " + total + ")");
        return;
      }
      var t = pendientes.shift();
      var audio = new Audio();
      audio.preload = "metadata";
      var hecho = false;
      var cerrar = function (existe) {
        if (hecho) return;
        hecho = true;
        if (existe) existentes++; else faltantes++;
        revisarUno();
      };
      audio.onloadedmetadata = function () { cerrar(true); };
      audio.onerror = function () { cerrar(false); };
      audio.src = audioDe(t.id);
      setTimeout(function () { cerrar(false); }, 1500);
    }
    revisarUno();
  });

  /* ---------------- inicialización ---------------- */
  construirFiltros("filtros-region", conImagen(), renderGaleria);
  construirFiltros("filtros-region-tarjetas", VOCABULARIO, renderTarjetas);
  renderGaleria(null);
  renderTarjetas(null);
})();
