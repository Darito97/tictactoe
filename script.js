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
        if(_matrizDeJuego[0][0]!== "")
          return [true, _NombreDelJugador2];
      }
    } else if (
      _matrizDeJuego[0][2] === _matrizDeJuego[1][1] &&
      _matrizDeJuego[1][1] === _matrizDeJuego[2][0]
    ) {
      if (_matrizDeJuego[0][2] === "X") {
        return [true, _NombreDelJugador1];
      } else {
        if(_matrizDeJuego[0][2]!== "")
          return [true, _NombreDelJugador2];
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
  const ReiniciarJuego = () => {
    _matrizDeJuego = _matrizDeJuegoInicial;
  };
  const AsignarMatriz = (matriz) => {
    _matrizDeJuego = matriz;
  };
  return {
    AsignarMatriz,
    ReiniciarJuego,
    SeleccionarPosicion,
    AsignarNombresDeJugadores,
    RevisionDeGanador
  };
})();
Juego.AsignarNombresDeJugadores("Jugador1", "Jugador2");
matrizDeJuegoDePrueba = [
  ["O", "X", "X"],
  ["O", "O", "O"],
  ["O", "X", "X"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["O", "O", "O"],
  ["O", "X", "X"],
  ["X", "O", "X"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["X", "O", "O"],
  ["O", "O", "X"],
  ["O", "O", "X"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["O", "O", "X"],
  ["O", "X", "X"],
  ["X", "X", "O"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["O", "O", "X"],
  ["O", "X", "X"],
  ["X", "O", "O"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
matrizDeJuegoDePrueba = [
  ["O", "O", "X"],
  ["O", "X", "X"],
  ["O", "X", "X"],
];
Juego.AsignarMatriz(matrizDeJuegoDePrueba);
console.log(Juego.RevisionDeGanador())
