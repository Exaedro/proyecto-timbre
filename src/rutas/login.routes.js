import { Router } from "express";
export const loginRutas = new Router();

import { conectarDB } from "../utils/database.js";
import Usuario from "../modelos/usuario.js";
import { esAdmin } from "../middlewares/auth.js";

import { body, validationResult } from "express-validator";

loginRutas.get("/login", (req, res) => {
	res.render("login");
});

loginRutas.get("/registro", esAdmin, (req, res) => {
	res.render("registro");
});

loginRutas.post(
	"/login",
	[
		body("nombreUsuario", "Nombre de usuario invalido.")
			.exists()
			.isLength({ min: 1, max: 32 }),
		body("contraseña", "Contraseña invalida.")
			.exists()
			.isLength({ min: 1, max: 32 }),
	],
	async (req, res) => {
		/* Validacion del formulario*/
		const errores = validationResult(req);
		if (!errores.isEmpty()) {
			const valores = req.body;
			const validaciones = errores.array();
			return res.render("login", { validaciones, valores });
		}
    /* --- */

		const { nombreUsuario } = req.body;

		const usuario = await Usuario.findOne({ nombreUsuario });

		if (!usuario) return res.render("login", { usuarioExiste: false });

		req.session.nombreUsuario = nombreUsuario;
		req.session.rol = usuario.rol;

		res.redirect("/");
	}
);

loginRutas.post(
	"/registro",
	[
		body("nombreUsuario", "Nombre de usuario invalido.")
			.exists()
			.isLength({ min: 1, max: 32 }),
		body("contraseña", "Contraseña invalida.")
			.exists()
			.isLength({ min: 1, max: 32 }),
	],
	async (req, res) => {
		/* Validacion del formulario*/
		const errores = validationResult(req);
		if (!errores.isEmpty()) {
			const valores = req.body;
			const validaciones = errores.array();
			return res.render("registro", { validaciones, valores });
		}
    /* --- */

		const { nombreUsuario, contraseña, rol } = req.body;

		const usuarioExiste = await Usuario.findOne({ nombreUsuario });
		if (usuarioExiste)
			return res.render("registro", { usuarioExiste: true });

		const usuario = new Usuario();

		usuario.nombreUsuario = nombreUsuario;
		usuario.contraseña = contraseña;
		usuario.rol = rol;

		await usuario.save();
	}
);
