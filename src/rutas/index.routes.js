import { Router } from "express";
export const indexRutas = new Router();

indexRutas.get("/", (req, res) => {
	const { nombreUsuario, rol } = req.session
	res.render('index', { nombreUsuario, rol })
});