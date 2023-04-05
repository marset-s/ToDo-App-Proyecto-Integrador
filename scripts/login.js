window.addEventListener("load", function () {
	/* ---------------------- obtenemos variables globales ---------------------- */

	const form = this.document.querySelector("form");
	const email = this.document.querySelector("#inputEmail");
	const password = this.document.querySelector("#inputPassword");

	const url = "https://todo-api.ctd.academy/v1";

	//console.log(form, email, password, url)

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
    realizarLogin(settings){
        
    };
});
