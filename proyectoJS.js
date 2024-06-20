class Jugador {
    constructor (nombre){
        this.nombre = nombre;
        this.racha = 0;
        this.puntaje = 0;
    }

    mostrarDatos (){
        console.log("-----------");
        console.log("Jugador: ", this.nombre);
        console.log("Puntaje: ", this.puntaje);
        console.log("Racha: ", this.racha);
    }

    actualizarPuntaje (puntos , racha){
        if (puntos>this.puntaje){
            this.puntaje = puntos;
        }

        if (racha>this.racha){
            this.racha = racha;
        }
    }
}


function compararNumero (numero){
    return numAleatorio == numero
}

function buscarJugador( jugador ){

    return jugador.nombre == nombreJugador
}

let listaJugadores = [];

//Primero creamos una lista generico jugadores

let jugador = new Jugador ("Pedro");
jugador.actualizarPuntaje(1,1);
listaJugadores.push(jugador);

jugador = new Jugador ("Marta")
jugador.actualizarPuntaje(13,3);
listaJugadores.push(jugador);

jugador = new Jugador("Clara");
jugador.actualizarPuntaje(10,2);
listaJugadores.push(jugador);

//console.log(listaJugadores);

//Fin de la creacion de jugadores

let numAleatorio;
console.log("Adivina adivinador, ¿Cuánta suerte tendrás hoy?");
let nombreJugador = prompt("Ingrese su nombre:");

jugador = listaJugadores.find(buscarJugador);

if (jugador == undefined){
    jugador = new Jugador (nombreJugador);
    listaJugadores.push(jugador);
}

console.log ("Bienvenido/a " + nombreJugador + ", su objetivo es adivinar el numero entre 0 y 9 en el que estoy pensando, tienes 3 intentos.");
console.log ("El juego otorga 3 puntos para el primer intento, 2 puntos para el segundo intento y 1 punto para el tercer intento, elevado a su vez al numero de aciertos consecutivos, por ejemplo si acertas 3 veces seguidas, en el primer, segundo y tercer intento respectivamente tu puntuacion final es 3^1 + 2^2 + 1^3 = 8.");

let seguirJugando = "S";
let numJugador;
let racha = 0;
let puntaje = 0;

while (seguirJugando == "S"){
    numAleatorio = Math.floor(Math.random() * 9);
    for (let i=0; i<3; i=i+1){
        console.log ("Intento numero: "+(i+1));
        numJugador = prompt("Ingrese un numero entero entre 0 y 9 inclusive:");
        numJugador = parseInt(numJugador);

        if (numJugador >= 0 && numJugador <= 9){
            if (compararNumero(numJugador)){
                console.log ("Felicitaciones " + nombreJugador + ", acertaste!");
                racha = racha + 1;
                puntaje = puntaje + (3 - i) ** racha;
                break
            }else if (i<2){
                console.log ("Numero incorrecto, intenta nuevamente.");
            }else {
                console.log ("Numero incorrecto, no tienes mas intentos. Estaba pensando en el numero "+numAleatorio);
                jugador.actualizarPuntaje(puntaje,racha);
                racha = 0;
                puntaje = 0;
            }
        }else if (i<2){
            console.log ("El valor ingresado es incorrecto")
        }
        else {
            console.log ("El valor ingresado es incorrecto, no tienes mas intentos. Estaba pensando en el numero "+numAleatorio);
            jugador.actualizarPuntaje(puntaje,racha)
            racha = 0;
            puntaje = 0;
        }
    }
    seguirJugando = prompt ("¿Quieres seguir jugando? Ingresa S para volver a jugar o cualquier otro valor para salir.");
    if (racha != 0 && seguirJugando != "S"){
        jugador.actualizarPuntaje(puntaje,racha);
    }
}

console.log ("Hasta pronto!");

listaJugadores[listaJugadores.findIndex(buscarJugador)] = jugador;

console.log("La tabla final de puntuaciones es:");

listaJugadores.sort((a,b) => b.puntaje - a.puntaje);

for (let jug of listaJugadores){
    jug.mostrarDatos();
}