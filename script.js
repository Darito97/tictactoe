const Juego = (() => {
  "use strict";
  let _matrizDeJuego = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let _NombreDelJugador1 = {};
  let _NombreDelJugador2 = {};
  const Jugador = (nombreDelJugador) => {
    const nombre = nombreDelJugador;
    let _partidasDeGanadas = 0;
    const AgregarPartidaGanada = () => {
      _partidasDeGanadas++;
    };
    const ObtenerNumeroDePartidasGanadas = () => _partidasDeGanadas;
    return {
      nombre,
      AgregarPartidaGanada,
      ObtenerNumeroDePartidasGanadas,
    };
  };
  const RevisionDeGanador = () => {
    if (
      _matrizDeJuego[0][0] === _matrizDeJuego[1][1] &&
      _matrizDeJuego[1][1] === _matrizDeJuego[2][2]
    ) {
      if (_matrizDeJuego[0][0] === "X") {
        _NombreDelJugador1.AgregarPartidaGanada();
        return [true, _NombreDelJugador1];
      } else {
        if (_matrizDeJuego[0][0] !== "") {
          _NombreDelJugador2.AgregarPartidaGanada();
          return [true, _NombreDelJugador2];
        }
      }
    } else if (
      _matrizDeJuego[0][2] === _matrizDeJuego[1][1] &&
      _matrizDeJuego[1][1] === _matrizDeJuego[2][0]
    ) {
      if (_matrizDeJuego[0][2] === "X") {
        _NombreDelJugador1.AgregarPartidaGanada();
        return [true, _NombreDelJugador1];
      } else {
        if (_matrizDeJuego[0][2] !== "") {
          _NombreDelJugador2.AgregarPartidaGanada();
          return [true, _NombreDelJugador2];
        }
      }
    } else {
      for (let cont = 0; cont < 3; cont++) {
        let juegoHorizontal = "";
        let juegoVertical = "";
        for (let cont2 = 0; cont2 < 3; cont2++) {
          juegoHorizontal += _matrizDeJuego[cont][cont2];
          juegoVertical += _matrizDeJuego[cont2][cont];
        }
        if (juegoHorizontal === "XXX" || juegoVertical === "XXX") {
          _NombreDelJugador1.AgregarPartidaGanada();
          return [true, _NombreDelJugador1];
        } else if (juegoHorizontal === "OOO" || juegoVertical === "OOO") {
          _NombreDelJugador2.AgregarPartidaGanada();
          return [true, _NombreDelJugador2];
        }
      }
    }
    return [false, ""];
  };

  const AsignarNombresDeJugadores = (nombreDeJugador1, nombreDeJugador2) => {
    _NombreDelJugador1 = Jugador(nombreDeJugador1);
    _NombreDelJugador2 = Jugador(nombreDeJugador2);
  };
  let _jugador1o2 = 1;
  const SeleccionarPosicion = (x, y) => {
    if (_jugador1o2 === 1) {
      _matrizDeJuego[y][x] = "X";
      _jugador1o2 = 2;
    } else {
      _matrizDeJuego[y][x] = "O";
      _jugador1o2 = 1;
    }
  };
  const ObtenerSigno = () => {
    if (_jugador1o2 === 1) {
      return "X";
    }
    return "O";
  };
  const ObtenerMatrizDeJuego = () => {
    return _matrizDeJuego;
  };
  const ReiniciarJuego = () => {
    _matrizDeJuego = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    _jugador1o2 = 1;
  };
  const ObtenerJugador = (jugador1ojugador2) => {
    if (jugador1ojugador2 === 1) {
      return _NombreDelJugador1;
    }
    return _NombreDelJugador2;
  };
  return {
    ReiniciarJuego,
    SeleccionarPosicion,
    AsignarNombresDeJugadores,
    ObtenerMatrizDeJuego,
    RevisionDeGanador,
    ObtenerSigno,
    ObtenerJugador,
  };
})();

function MostrarNotificacion(texto, color) {
  const notificacion = document.getElementById("notificacion");
  notificacion.style = "display: flex;";
  const textoDeNotificacion = document.getElementById("textoDeNotificacion");
  textoDeNotificacion.innerText = texto;
  if (color === "black") {
    textoDeNotificacion.style = "background-color: black; color: white;";
  }
  setTimeout(() => {
    notificacion.style = "";
  }, 1990);
}
function DesaparecerSeccionYAparecerSeccion(
  selectorDeSeccionADesaparecer,
  selectorDeSeccionAAparecer
) {
  const seccionADesaparecer = document.querySelector(
    selectorDeSeccionADesaparecer
  );
  const seccionAAparecer = document.querySelector(selectorDeSeccionAAparecer);
  seccionADesaparecer.style = "display: none;";
  seccionAAparecer.style = "display: flex;";
}
const botonSubmit = document.getElementById("botonSubmit");
botonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const nombreDelJugador1 = document.getElementById("nombreDelJugador1");
  const nombreDelJugador2 = document.getElementById("nombreDelJugador2");
  const ValidarNombres = (nombre1, nombre2) => {
    if (nombre1 !== "" && nombre2 !== "") {
      return true;
    }
    return false;
  };
  if (ValidarNombres(nombreDelJugador1.value, nombreDelJugador2.value)) {
    DesaparecerSeccionYAparecerSeccion("header", ".seccion-de-juego");
    Juego.AsignarNombresDeJugadores(
      nombreDelJugador1.value,
      nombreDelJugador2.value
    );

    const nombreDelJug1 = document.getElementById("nombreDelJug1");
    const nombreDelJug2 = document.getElementById("nombreDelJug2");
    nombreDelJug1.innerText = nombreDelJugador1.value;
    nombreDelJug2.innerText = nombreDelJugador2.value;

    nombreDelJugador1.value = "";
    nombreDelJugador2.value = "";
  } else {
    MostrarNotificacion("Ingresa los dos nombres");
  }
});
const botonDeReinicioDeJuego = document.querySelector(
  ".seccion-del-juego__boton-de-juego"
);
botonDeReinicioDeJuego.addEventListener("click", (e) => {
  DesaparecerSeccionYAparecerSeccion(".seccion-de-juego", "header");
});

function Jugada(numeroDeCampo, jugador1o2) {
  let posicionY = 0;
  let posicionX = numeroDeCampo;
  if (numeroDeCampo >= 6) {
    posicionY = 2;
    posicionX = numeroDeCampo - 6;
  } else if (numeroDeCampo >= 3 && numeroDeCampo <= 6) {
    posicionY = 1;
    posicionX = numeroDeCampo - 3;
  }
  function ReiniciarJuegoEnPantalla() {
    for (
      let contador = 0;
      contador < matrizDeCamposDeJuego.length;
      contador++
    ) {
      matrizDeCamposDeJuego[contador].innerText = "";
    }
    Juego.ReiniciarJuego();
  }
  Juego.SeleccionarPosicion(posicionX, posicionY, jugador1o2);
  let [hayGanador, ganador] = Juego.RevisionDeGanador();
  if (hayGanador) {
    CambiarLasPuntuaciones();
    ReiniciarJuegoEnPantalla();
  }
}
function CambiarLasPuntuaciones() {
  const puntuacionDelJugador1 = document.getElementById(
    "puntuacionDelJugador1"
  );
  const puntuacionDelJugador2 = document.getElementById(
    "puntuacionDelJugador2"
  );
  puntuacionDelJugador1.innerText =
    Juego.ObtenerJugador(1).ObtenerNumeroDePartidasGanadas();
  puntuacionDelJugador2.innerText =
    Juego.ObtenerJugador(2).ObtenerNumeroDePartidasGanadas();
}

const matrizDeCamposDeJuego = document.querySelectorAll(
  ".juego__campo-de-juego"
);

let jugador1ojugador2 = 1;

for (let contador = 0; contador < matrizDeCamposDeJuego.length; contador++) {
  matrizDeCamposDeJuego[contador].addEventListener("click", (e) => {
    let id = e.path[0].id;
    let posicion = Number(e.path[0].id);
    const div = document.getElementById(id);
    if (div.innerText !== "") {
      MostrarNotificacion("Ese lugar ya esta ocupado", "black");
    } else {
      div.innerText = Juego.ObtenerSigno();
      if (jugador1ojugador2 === 1) {
        Jugada(posicion, 1);
      } else {
        jugador1ojugador2 = 1;
        Jugada(posicion, 2);
      }
    }
  });
}
