window.addEventListener("load", function () {
	/* ---------------------- obtenemos variables globales ---------------------- */
	const form = this.document.querySelector("form");
	const firstName = this.document.querySelector("#inputNombre");
	const lastName = this.document.querySelector("#inputApellido");
	const email = this.document.querySelector("#inputEmail");
	const password = this.document.querySelector("#inputPassword");
	const passwordRepetida = this.document.querySelector("#inputPasswordRepetida");

	const url = "https://todo-api.ctd.academy/v1";

	/* -------------------------------------------------------------------------- */
	/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
	/* -------------------------------------------------------------------------- */
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		let inputPassword = "";
		password.value === passwordRepetida.value
			? (inputPassword = password.value)
			: alert("Te equivocaste 👹🔪");

		const payload = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: inputPassword,
		};

		const settings = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		};

		realizarRegister(settings);
	});

	/* -------------------------------------------------------------------------- */
	/*                    FUNCIÓN 2: Realizar el signup [POST]                    */
	/* -------------------------------------------------------------------------- */
	function realizarRegister(settings) {
		console.log("Enviando datos del registro a la api");

		fetch(`${url}/users`, settings)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				console.log("Promesa cumplida");
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
