import { Router } from 'express'
export const panelRutas = new Router()

import { esAdmin, esGestionador } from "../middlewares/auth.js";
import Usuario from "../modelos/usuario.js";

panelRutas.get("/panel", [esAdmin], (req, res) => {
	const { nombreUsuario, rol } = req.session;

	res.render("administrador/panel", { nombreUsuario, rol });
});


/* Usuarios */

// Tabla de usuarios
panelRutas.get("/panel/usuarios", [esAdmin], async (req, res) => {
    
    // Si una cuenta fue creada se manda esta variable como true
    let creado = false
    if(req.params.creado == true) creado = true

    // Sigue pidiendo usuarios normalmente
	const { nombreUsuario, rol } = req.session;
	const usuarios = await Usuario.find()

	res.render("administrador/usuarios", { nombreUsuario, rol, usuarios, creado });
})



// Eliminar usuario
panelRutas.get("/panel/usuarios/:id/eliminar", [esAdmin], async (req, res) => {
    const { id } = req.params
    const usuario = await Usuario.findById(id)

    res.render('administrador/confirmacionEliminarCuenta', { usuario })
})

panelRutas.post("/usuario/:id/eliminar", [esAdmin], async (req, res) => {
    const { id } = req.params
    const usuario = await Usuario.findById(id)

    try {
        await usuario.deleteOne()
        res.redirect("/panel/usuarios")
    } catch(err) {
        res.render("administrador/usuarios", { errorEliminarCuenta: true })
    }
})



// Editar usuario
panelRutas.get("/panel/usuarios/:id/editar", [esAdmin], async (req, res) => {
    const { id } = req.params

    const { nombreUsuario, rol, _id } = await Usuario.findById(id)

    res.render('administrador/editarUsuario', { nombreUsuario, rol, usuarioId: _id })
})

panelRutas.post("/usuario/:id/editar", [esAdmin], async (req, res) => {
    const { id } = req.params
    const { nombreUsuario, rol } = req.body

    try {
        await Usuario.findOneAndUpdate({ _id: id }, { nombreUsuario, rol })
        res.redirect("/panel/usuarios")
    } catch(err) {
        res.redirect("/")
    }
})

/* Termina usuarios */