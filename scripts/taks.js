// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
	alert("Debe loguearse para ingresar al sitio");
	location.replace("./index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
	/* ---------------- variables globales y llamado a funciones ---------------- */

	const urlTareas = "https://todo-api.ctd.academy/v1/tasks";
	const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
	const token = JSON.parse(localStorage.jwt);

	const formCrearTarea = this.document.querySelector(".nueva-tarea");
	const nuevaTarea = this.document.querySelector("#nuevaTarea");
	const btnCerrarSesion = this.document.querySelector("#closeApp");

	obtenerNombreUsuario();
	consultarTareas();

	/* -------------------------------------------------------------------------- */
	/*                          FUNCIÓN 1 - Cerrar sesión                         */
	/* -------------------------------------------------------------------------- */

	btnCerrarSesion.addEventListener("click", () => {
		const cerrarSesion = confirm("¿Estás segur@ que deseeas cerrar sesión?");
		if (cerrarSesion) {
			localStorage.clear();
			location.replace("./index.html");
		}
	});

	// });

	/* -------------------------------------------------------------------------- */
	/*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
	/* -------------------------------------------------------------------------- */
	function obtenerNombreUsuario() {
		const setting = {
			method: "GET",
			headers: {
				authorization: token,
			},
		};

		console.log("Consultando el usuario");
		fetch(urlUsuario, setting)
			.then((response) => response.json())
			.then((data) => {
				console.log("Nombre de usuario:");
				console.log(data.firstName);
				const nombreUsuario = document.querySelector(".user-info p");
				nombreUsuario.textContent = data.firstName;
			})
			.catch((error) => console.log(error));
	}
	/* -------------------------------------------------------------------------- */
	/*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
	/* -------------------------------------------------------------------------- */

	function consultarTareas() {
		const settings = {
			method: "GET",
			headers: {
				authorization: token,
			},
		};

		console.log("Consultando mis tareas...");
		fetch(urlTareas, settings)
			.then((response) => response.json())
			.then((tareas) => {
				console.log("Tareas del usuario:");
				console.log(tareas);

				renderizarTareas(tareas);
				botonesCambioEstado();
				botonBorrarTarea();
			})
			.catch((err) => console.log(err));
	}

	/* -------------------------------------------------------------------------- */
	/*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
	/* -------------------------------------------------------------------------- */

	formCrearTarea.addEventListener("submit", function (e) {
		e.preventDefault();

		console.log("Crear tarea");
		console.log(nuevaTarea.value);

		const payload = {
			description: nuevaTarea.value,
		};

		const settings = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"content-type": "application/json",
				authorization: token,
			},
		};

		console.log("Creando una tarea en la DB");
		fetch(urlTareas, settings)
			.then((response) => response.json())
			.then((tarea) => {
				console.log(tarea);
				consultarTareas();
			})
			.catch((err) => console.log(err));
		formCrearTarea.reset();
	});

	/* -------------------------------------------------------------------------- */
	/*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
	/* -------------------------------------------------------------------------- */
	function renderizarTareas(listado) {
		const tareasPendientes = document.querySelector(".tareas-pendientes");
		const tareasTerminadas = document.querySelector(".tareas-terminadas");
		const cantidadFinalizadas = document.querySelector("#cantidad-finalizadas");
		tareasPendientes.innerHTML = "";
		tareasTerminadas.innerHTML = "";

		let contador = 0;
		cantidadFinalizadas.innerHTML = contador;

		listado.forEach((tarea) => {
			let fecha = new Date(tarea.createdAt);
			if (tarea.completed) {
				contador++;
				tareasTerminadas.innerHTML += `
			<li class="tarea">
				<div class="hecha">
				<i class="fa-regular fa-circle-check"></i>
			</div>
			<div class="descripcion">
				<p class="nombre">${tarea.description}</p>
				<div class="cambios-estados">
				<button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
				<button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
				</div>
			</div>
			</li>
			`;
			} else {
				tareasPendientes.innerHTML += `
            <li class="tarea">
            <button class="change" id="${
							tarea.id
						}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
                <p class="nombre">${tarea.description}</p>
                <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
            </li>
        `;
			}
			//Actualizar el contador en pantalla
			cantidadFinalizadas.innerHTML = contador;
		});
	}

	/* -------------------------------------------------------------------------- */
	/*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
	/* -------------------------------------------------------------------------- */
	function botonesCambioEstado() {
		const btnCambioEstado = document.querySelectorAll(".change");

		btnCambioEstado.forEach((boton) => {
			//le agrego funcionalidad a cada boton
			boton.addEventListener("click", (e) => {
				console.log("Cambiando el estado de la tarea...");
				console.log(e.target);

				const id = e.target.id;
				const uriTareaId = `${urlTareas}/${id}`;
				const payload = {};

				//segun el tipo de boton de fue clickeado cambiamos el estado de la tarea
				if (e.target.classList.contains("incompleta")) {
					//si la tarea esta completada y la paso a pendiente
					payload.completed = false;
				} else {
					//si la tarea esta pedniente y la paso a completada
					payload.completed = true;
				}
				console.log(payload);

				const settings = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: token,
					},
					body: JSON.stringify(payload),
				};

				//hacemos el fetch
				fetch(uriTareaId, settings)
					.then((response) => {
						console.log(response.status);
						// vuelvo a consultar las tareas actualizadas y renderizarlas niievamente en pantalla
						consultarTareas();
					})
					.catch((err) => console.log(err));
			});
		});
	}

	/* -------------------------------------------------------------------------- */
	/*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
	/* -------------------------------------------------------------------------- */
	function botonBorrarTarea() {
		const btnBorrarTarea = document.querySelectorAll(".borrar");

		btnBorrarTarea.forEach((boton) => {
			//a cada boton le agrego la funcionalidad
			boton.addEventListener("click", (e) => {
				//console.log(event);
				//console.log(event.target);
				//console.log(event.target.id);

				const id = e.target.id;
				const uriTareaId = `${urlTareas}/${id}`;

				//preparamos el llamado a la api

				const settings = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						authorization: token,
					},
				};

				// hacemos el fetch
				fetch(uriTareaId, settings)
					.then((response) => {
						console.log(response.status);
						// Vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
						consultarTareas();
					})
					.catch((err) => console.log(err));
			});
		});
	}
});
