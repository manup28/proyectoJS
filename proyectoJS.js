function compararNumero (numero){
    return numAleatorio == numero
}

let numAleatorio = Math.floor(Math.random() * 9);
// primero generamos un numero aleatorio entre 0 y 9
console.log (numAleatorio);
alert("Adivina adivinador, ¿Cuánta suerte tendrás hoy?");
let nombreJugador = prompt("Ingrese su nombre:");

alert ("Bienvenido/a " + nombreJugador + ", su objetivo es adivinar el numero entre 0 y 9 en el que estoy pensando, tienes 3 intentos.")

let seguirJugando = "S";
let numJugador

while (seguirJugando == "S"){
    for (let i=0; i<3; i=i+1){
        alert ("Intento numero: "+(i+1));
        numJugador = prompt("Ingrese un numero entero entre 0 y 9 inclusive:");
        numJugador = parseInt(numJugador);

        if (numJugador >= 0 && numJugador <= 9){
            if (compararNumero(numJugador)){
                alert ("Felicitaciones " + nombreJugador + ", acertaste!");
                break
            }else if (i<2){
                alert ("Numero incorrecto, intenta nuevamente.");
            }else {
                alert ("Numero incorrecto, no tienes mas intentos.");
            }
        }else {
            alert ("El valor ingresado es incorrecto")
        }
    }
    seguirJugando = prompt ("¿Quieres seguir jugando? Ingresa S para volver a jugar o cualquier otro valor para salir.");
}

alert ("Hasta pronto!");