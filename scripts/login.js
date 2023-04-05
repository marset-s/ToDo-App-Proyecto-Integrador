window.addEventListener("load", function () {
	/* ---------------------- obtenemos variables globales ---------------------- */

	const form = this.document.querySelector("form");
	const email = this.document.querySelector("#inputEmail");
	const password = this.document.querySelector("#inputPassword");

	const url = "https://todo-api.ctd.academy/v1";

	

	/* -------------------------------------------------------------------------- */
	/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
	/* -------------------------------------------------------------------------- */
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const payload = {
			email: email.value,
			password: password.value,
		};

		const settings = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		};

		realizarLogin(settings);
		form.reset();
	});

	/* -------------------------------------------------------------------------- */
	/*                     FUNCIÓN 2: Realizar el login [POST]                    */
	/* -------------------------------------------------------------------------- */
	function realizarLogin(settings) {
		console.log("lanzando la consulta a la api");

		fetch(`${url}/users/login`, settings)
			.then((response) => {
				console.log(response);
				if (response.ok != true) {
					alert("Alguno de los datos es incorrecto");
				}
				return response.json();
			})
			.then((data) => {
				console.log("promesa cumplida");
				console.log(data);

				if (data.jwt) {
					location.replace("./mis-tareas.html");
					localStorage.setItem("jwt", JSON.stringify(data.jwt));
				}
			})
			.catch((err) => {
				console.log("Promesa rechazada");
				console.log(err);
			});
	}
});
