window.addEventListener("load", function () {
	/* ---------------------- obtenemos variables globales ---------------------- */
	const form = this.document.querySelector("form");
	const firstName = this.document.querySelector("#inputNombre");
	const lastName = this.document.querySelector("#inputApellido");
	const email = this.document.querySelector("#inputEmail");
	const password = this.document.querySelector("#inputPassword");
	const passwordRepetida = this.document.querySelector(
		"#inputPasswordRepetida"
	);

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

		realizarRegister(payload);
	});

	/* -------------------------------------------------------------------------- */
	/*                    FUNCIÓN 2: Realizar el signup [POST]                    */
	/* -------------------------------------------------------------------------- */
	function realizarRegister(settings) {}
});
