import { Router } from "express";
export const indexRutas = new Router();

import { countdown, getRemainTime } from "../public/js/contador.js";

indexRutas.get("/", (req, res) => {
	const { nombreUsuario, rol } = req.session

	let date = new Date().setMinutes(80)
	
	let nuevaFecha = new Date(date)
	nuevaFecha = nuevaFecha.toString().split(" ").slice(1).join(' ')

	setInterval(() => {
		getRemainTime(nuevaFecha)
	}, 1000)
	res.render('index', { nombreUsuario, rol, date: nuevaFecha })
});