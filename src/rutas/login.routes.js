import { Router } from "express";
export const loginRutas = new Router();

// Librerias
import { body } from "express-validator";

// Middlewares y base de datos
import { esAdmin } from "../middlewares/auth.js";

// Utils
import { validarFormulario } from "../utils/validarFormulario.js";

// Controladores
import UsuarioControlador from "../controladores/usuarioControlador.js";

loginRutas.get("/login", (req, res) => {
	res.render("login");
});

loginRutas.get("/registro", (req, res) => {
	res.render("registro");
});

loginRutas.get("/logout", (req, res) => {
	if(!req.session.nombreUsuario) return res.redirect('/')

	req.session.nombreUsuario = ""
	req.session.rol = ""

	res.redirect('/')
})

// Login
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
		validarFormulario("login", req, res);
		UsuarioControlador.iniciarSesion(req, res);
	}
);

// Registro
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
		validarFormulario("registro", req, res);
		UsuarioControlador.registrarUsuario(req, res);
	}
);
