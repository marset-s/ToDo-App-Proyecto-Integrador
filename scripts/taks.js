// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
	alert("Debe loguearse para ingresar al sitio");
	location.replace("./index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
	/* ---------------- variables globales y llamado a funciones ---------------- */

	const urlTareas = "https://todo-api.ctd.academy/v1/task";
	const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
	const token = JSON.parse(localStorage.jwt);

	const formCrearTarea = this.document.querySelector(".nueva-tarea");
	const nuevaTarea = this.document.querySelector("#nuevaTarea");
	const btnCerrarSesion = this.document.querySelector("#closeApp");

	obtenerNombreUsuario();

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

	/* -------------------------------------------------------------------------- */
	/*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
	/* -------------------------------------------------------------------------- */

	function consultarTareas() {}

	/* -------------------------------------------------------------------------- */
	/*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
	/* -------------------------------------------------------------------------- */

	formCrearTarea.addEventListener("submit", function (event) {});

	/* -------------------------------------------------------------------------- */
	/*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
	/* -------------------------------------------------------------------------- */
	function renderizarTareas(listado) {}

	/* -------------------------------------------------------------------------- */
	/*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
	/* -------------------------------------------------------------------------- */
	function botonesCambioEstado() {}

	/* -------------------------------------------------------------------------- */
	/*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
	/* -------------------------------------------------------------------------- */
	function botonBorrarTarea() {}
});
