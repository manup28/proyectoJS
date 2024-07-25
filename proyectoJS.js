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

    // Lista de jugadores inicialmente vacía
    let listaJugadores = [];

    // Variables del juego
    let numAleatorio;
    let intentosRestantes;
    let jugador;

    // Seleccionar elementos del DOM
    const buttons = document.querySelectorAll(".botonNumero");
    const mensajeResultado = document.getElementById("mensajeResultado");
    const formJugador = document.getElementById("formJugador");
    const inputNombreJugador = document.getElementById("nombreJugador");
    const botonReiniciar = document.getElementById("botonReiniciar");
    const botonContinuar = document.getElementById("botonContinuar");
    const botonFinalizar = document.getElementById("botonFinalizar");
    const jugadorActualDiv = document.getElementById("jugadorActual");
    const nombreJugadorActualSpan = document.getElementById("nombreJugadorActual");
    const botonDesloguear = document.getElementById("botonDesloguear");

    // Función para cargar los jugadores desde un archivo JSON
    function cargarJugadores() {
        return new Promise((resolve, reject) => {
            fetch('jugadores.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar el archivo JSON');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        listaJugadores = data.map(j => new Jugador(j.nombre, j.puntajeMaximo, j.rachaMaxima));
                    }
                    resolve();
                })
                .catch(error => {
                    console.error('Error al cargar la lista de jugadores:', error);
                    reject('Error al cargar la lista de jugadores');
                });
        });
    }

    // Verificar si hay un jugador guardado en localStorage y cargar jugadores desde JSON
    cargarJugadores().then(() => {
        const jugadorGuardado = localStorage.getItem('jugadorActual');
        if (jugadorGuardado) {
            const nombreJugador = jugadorGuardado;
            jugador = listaJugadores.find(j => j.nombre === nombreJugador);
            if (!jugador) {
                jugador = new Jugador(nombreJugador);
                listaJugadores.push(jugador);
            }
            iniciarSesionJugador(nombreJugador);
        } else {
            deshabilitarBotones();
        }
        // Mostrar tabla de puntajes inicial
        mostrarTablaPuntajes();
    }).catch(error => {
        console.error('Error al iniciar el juego:', error);
        deshabilitarBotones();
    });

    formJugador.addEventListener("submit", (event) => {
        event.preventDefault();
        iniciarJuego();
    });

    botonReiniciar.addEventListener("click", reiniciarJuego);
    botonContinuar.addEventListener("click", continuarJuego);
    botonFinalizar.addEventListener("click", finalizarJuego);
    botonDesloguear.addEventListener("click", desloguearJugador);

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

        // Guardar el nombre del jugador en localStorage
        localStorage.setItem('jugadorActual', nombreJugador);
        iniciarSesionJugador(nombreJugador);
    }

    function iniciarSesionJugador(nombreJugador) {
        nombreJugadorActualSpan.textContent = nombreJugador;
        formJugador.style.display = 'none';
        jugadorActualDiv.style.display = 'block';
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

    // Función para desloguear al jugador
    function desloguearJugador() {
        localStorage.removeItem('jugadorActual');
        formJugador.style.display = 'block';
        jugadorActualDiv.style.display = 'none';
        deshabilitarBotones();
        mensajeResultado.textContent = '';
        inputNombreJugador.value = '';
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
                mensajeResultado.textContent = `Puntaje acumulado: ${jugador.puntajeActual}.`;
                Swal.fire({
                    title: "Felicitaciones! Acertaste!",
                    icon: "success",
                    showClass: {
                      popup: `animate__animated animate__bounceIn`
                    },
                    hideClass: {
                      popup: `animate__animated animate__bounceOut`
                    }
                  });
                deshabilitarBotones();
                mostrarBotonesContinuarYFinalizar();
            } else {
                intentosRestantes--;
                if (intentosRestantes > 0) {
                    mensajeResultado.textContent = `Incorrecto. Te quedan ${intentosRestantes} intento(s).`;
                } else {
                    mensajeResultado.textContent = `El número era ${numAleatorio}.`;
                    Swal.fire({
                        title: "Lo siento, no tienes más intentos.",
                        icon: "error",
                        showClass: {
                          popup: `animate__animated animate__bounceIn`
                        },
                        hideClass: {
                          popup: `animate__animated animate__bounceOut`
                        }
                      });
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
});
