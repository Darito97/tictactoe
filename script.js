const Juego = (() => {
  "use strict";
  let _matrizDeJuegoInicial = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let _matrizDeJuego = _matrizDeJuegoInicial;
  let _NombreDelJugador1 = "";
  let _NombreDelJugador2 = "";

  const RevisionDeGanador = () => {
    if (
      _matrizDeJuego[0][0] === _matrizDeJuego[1][1] &&
      _matrizDeJuego[1][1] === _matrizDeJuego[2][2]
    ) {
      if (_matrizDeJuego[0][0] === "X") {
        return [true, _NombreDelJugador1];
      } else {
        if (_matrizDeJuego[0][0] !== "") return [true, _NombreDelJugador2];
      }
    } else if (
      _matrizDeJuego[0][2] === _matrizDeJuego[1][1] &&
      _matrizDeJuego[1][1] === _matrizDeJuego[2][0]
    ) {
      if (_matrizDeJuego[0][2] === "X") {
        return [true, _NombreDelJugador1];
      } else {
        if (_matrizDeJuego[0][2] !== "") return [true, _NombreDelJugador2];
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
          return [true, _NombreDelJugador1];
        } else if (juegoHorizontal === "OOO" || juegoVertical === "OOO") {
          return [true, _NombreDelJugador2];
        }
      }
    }
    return [false, ""];
  };
  const AsignarNombresDeJugadores = (nombreDeJugador1, nombreDeJugador2) => {
    _NombreDelJugador1 = nombreDeJugador1;
    _NombreDelJugador2 = nombreDeJugador2;
  };

  const SeleccionarPosicion = (x, y, jugador1o2) => {
    if (jugador1o2 === 1) {
      _matrizDeJuego[y][x] = "X";
    } else {
      _matrizDeJuego[y][x] = "O";
    }
    let [estaGanada, ganador] = RevisionDeGanador();
    if (estaGanada) {
      return ganador;
    }
  };
  const ObtenerMatrizDeJuego = ()=>{
    return _matrizDeJuego
  }
  const ReiniciarJuego = () => {
    _matrizDeJuego = _matrizDeJuegoInicial;
  };
  return {
    ReiniciarJuego,
    SeleccionarPosicion,
    AsignarNombresDeJugadores,
    ObtenerMatrizDeJuego
  };
})();

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
function MostrarNotificacion(texto) {
  const notificacion = document.getElementById("notificacion");
  notificacion.style = "display: flex;";
  const textoDeNotificacion = document.getElementById("textoDeNotificacion");
  textoDeNotificacion.innerText = texto;
  setTimeout(() => {
    notificacion.style = "";
  }, 1990);
}
function DesaparecerSeccionYAparecerSeccion(
  selectorDeSeccionADesaparecer,
  selectorDeSeccionAAparecer
) {
  const seccionADesaparecer = document.querySelector(selectorDeSeccionADesaparecer)
  const seccionAAparecer = document.querySelector(selectorDeSeccionAAparecer)
  seccionADesaparecer.style = 'display: none;'
  seccionAAparecer.style = 'display: flex;'
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
    
    DesaparecerSeccionYAparecerSeccion('header', '.seccion-de-juego')
    Juego.AsignarNombresDeJugadores(nombreDelJugador1.value, nombreDelJugador2.value);

    const nombreDelJug1 = document.getElementById('nombreDelJug1')
    const nombreDelJug2 = document.getElementById('nombreDelJug2')
    nombreDelJug1.innerText = nombreDelJugador1.value
    nombreDelJug2.innerText = nombreDelJugador2.value

    nombreDelJugador1.value = ''
    nombreDelJugador2.value = ''
    
  } else {
    MostrarNotificacion("Ingresa los dos nombres");
  }
});
const botonDeReinicioDeJuego = document.querySelector('.seccion-del-juego__boton-de-juego')
botonDeReinicioDeJuego.addEventListener('click', e=>{
  DesaparecerSeccionYAparecerSeccion('.seccion-de-juego', 'header')
})

function Jugada(numeroDeCampo){
  let posicionY = 0
  let posicionX = numeroDeCampo
  if(numero < 5){
    posicionY = 2
    posicionX = numeroDeCampo - 5
  }
  else if(numero < 2){
    posicionY = 1
    posicionX = numeroDeCampo - 2
  }
  SeleccionarPosicion(posicionX, posicionY)
}

const matrizDeCamposDeJuego = document.querySelectorAll('.juego__campo-de-juego')

function ActualizarJuego(){
  let matrizDeJuego = ObtenerMatrizDeJuego()
  
}

for(let contador = 0; contador<matrizDeCamposDeJuego.length; contador++){
  matrizDeCamposDeJuego[contador].addEventListener('click', e=>{
    console.log(e.path[0].id)
  })
}
