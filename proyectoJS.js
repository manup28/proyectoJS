document.addEventListener("DOMContentLoaded", () => {
    class Jugador {
        constructor(nombre, puntajeMaximo = 0, rachaMaxima = 0) {
            this.nombre = nombre;
            this.racha = 0;
            this.rachaMaxima = rachaMaxima;
            this.puntajeActual = 0;
            this.puntajeMaximo = puntajeMaximo;
        }

        // Método para calcular y actualizar el puntaje actual basado en el intento y la racha
        calcularPuntaje(intento) {
            let puntos = 4 - intento;
            this.puntajeActual += puntos ** this.racha;
        }

        // Método para incrementar la racha actual
        incrementarRacha() {
            this.racha++;
        }

        // Método para actualizar el puntaje máximo si el puntaje actual es mayor
        actualizarPuntaje() {
            if (this.puntajeActual > this.puntajeMaximo) {
                this.puntajeMaximo = this.puntajeActual;
            }
        }

        // Método para actualizar la racha máxima si la racha actual es mayor
        actualizarRacha() {
            if (this.racha > this.rachaMaxima) {
                this.rachaMaxima = this.racha;
            }
        }

        // Método para reiniciar el puntaje actual y la racha
        reiniciarPuntajeYRacha() {
            this.puntajeActual = 0;
            this.racha = 0;
        }
    }

    // Lista de jugadores predefinidos
    let listaJugadores = [
        new Jugador('Pedro', 1, 1),
        new Jugador('Marta', 13, 3),
        new Jugador('Clara', 10, 2)
    ];

    // Variables del juego
    let numAleatorio;
    let intentosRestantes;
    let jugador;

    // Seleccionar elementos del DOM
    let buttons = document.querySelectorAll(".botonNumero");
    let mensajeResultado = document.getElementById("mensajeResultado");
    let formJugador = document.getElementById("formJugador");
    let inputNombreJugador = document.getElementById("nombreJugador");
    let botonReiniciar = document.getElementById("botonReiniciar");
    let botonContinuar = document.getElementById("botonContinuar");
    let botonFinalizar = document.getElementById("botonFinalizar");

    // Deshabilitar los botones inicialmente
    deshabilitarBotones();

    formJugador.addEventListener("submit", (event) => {
        event.preventDefault();
        iniciarJuego();
    });

    botonReiniciar.addEventListener("click", reiniciarJuego);
    botonContinuar.addEventListener("click", continuarJuego);
    botonFinalizar.addEventListener("click", finalizarJuego);

    // Función para iniciar el juego
    function iniciarJuego() {
        let nombreJugador = inputNombreJugador.value.trim();
        if (!nombreJugador) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        jugador = listaJugadores.find(j => j.nombre === nombreJugador);
        if (!jugador) {
            jugador = new Jugador(nombreJugador);
            listaJugadores.push(jugador);
        }

        formJugador.style.display = 'none';
        jugador.reiniciarPuntajeYRacha();
        generarNumeroAleatorio();
        reiniciarIntentos();
        habilitarBotones();
        ocultarBotonesAccion();
        mensajeResultado.textContent = '';
    }

    // Función para continuar el juego
    function continuarJuego() {
        generarNumeroAleatorio();
        reiniciarIntentos();
        habilitarBotones();
        ocultarBotonesAccion();
        mensajeResultado.textContent = '';
    }

    // Función para reiniciar el juego sin preguntar el nombre nuevamente
    function reiniciarJuego() {
        jugador.reiniciarPuntajeYRacha();
        generarNumeroAleatorio();
        reiniciarIntentos();
        habilitarBotones();
        ocultarBotonesAccion();
        mensajeResultado.textContent = '';
    }

    // Función para finalizar el juego
    function finalizarJuego() {
        jugador.actualizarPuntaje();
        jugador.actualizarRacha();
        mostrarTablaPuntajes();
        ocultarBotonesAccion();
        botonReiniciar.style.display = 'block';
    }

    // Función para generar un número aleatorio entre 1 y 9
    function generarNumeroAleatorio() {
        numAleatorio = Math.floor(Math.random() * 9) + 1;
        console.log("Número aleatorio generado:", numAleatorio);
    }

    // Función para reiniciar los intentos
    function reiniciarIntentos() {
        intentosRestantes = 3;
    }

    // Función para habilitar todos los botones
    function habilitarBotones() {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }

    // Función para deshabilitar todos los botones
    function deshabilitarBotones() {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    // Función para ocultar los botones de acción (reiniciar, continuar y finalizar)
    function ocultarBotonesAccion() {
        botonReiniciar.style.display = 'none';
        botonContinuar.style.display = 'none';
        botonFinalizar.style.display = 'none';
    }

    // Función para mostrar el botón de reiniciar
    function mostrarBotonReiniciar() {
        botonReiniciar.style.display = 'block';
    }

    // Función para mostrar el botón de continuar y finalizar
    function mostrarBotonesContinuarYFinalizar() {
        botonContinuar.style.display = 'block';
        botonFinalizar.style.display = 'block';
    }

    // Manejar el clic en un botón
    function handleButtonClick(numElegido) {
        if (intentosRestantes > 0) {
            if (numElegido === numAleatorio) {
                jugador.incrementarRacha();
                jugador.calcularPuntaje(4 - intentosRestantes);
                mensajeResultado.textContent = `¡Correcto! El número era ${numAleatorio}. Puntaje acumulado: ${jugador.puntajeActual}.`;
                deshabilitarBotones();
                mostrarBotonesContinuarYFinalizar();
            } else {
                intentosRestantes--;
                if (intentosRestantes > 0) {
                    mensajeResultado.textContent = `Incorrecto. Te quedan ${intentosRestantes} intento(s).`;
                } else {
                    mensajeResultado.textContent = `Lo siento, no tienes más intentos. El número era ${numAleatorio}.`;
                    jugador.actualizarPuntaje();
                    jugador.actualizarRacha();
                    deshabilitarBotones();
                    mostrarBotonReiniciar();
                    mostrarTablaPuntajes();
                }
            }
        }
    }

    // Función para mostrar la tabla de puntajes
    function mostrarTablaPuntajes() {
        let tbody = document.getElementById("tbody");
        tbody.innerHTML = ""; // Limpiar la tabla

        // Ordenar jugadores por puntaje máximo de forma descendente
        listaJugadores.sort((a, b) => b.puntajeMaximo - a.puntajeMaximo);

        // Agregar cada jugador a la tabla
        listaJugadores.forEach(jugador => {
            let fila = document.createElement("tr");
            fila.innerHTML = `<td>${jugador.nombre}</td>
                              <td>${jugador.puntajeMaximo}</td>
                              <td>${jugador.rachaMaxima}</td>`;
            tbody.appendChild(fila);
        });
    }

    // Añadir el event listener a cada botón
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let numElegido = parseInt(button.textContent);
            handleButtonClick(numElegido);
        });
    });

    // Mostrar tabla de puntajes inicial
    mostrarTablaPuntajes();
});
