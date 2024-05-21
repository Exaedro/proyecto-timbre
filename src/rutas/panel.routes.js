import { Router } from 'express'
export const panelRutas = new Router()

import { esAdmin, esAdminGestionador } from "../middlewares/auth.js";

import PanelControlador from '../controladores/panelControlador.js';
import HorarioControlador from '../controladores/horarioControlador.js'

import { numeroParaMes } from '../utils/convertidorMeses.js'

// Panel
panelRutas.get("/panel", (req, res) => {
	HorarioControlador.obtenerHorarios(req, res)
});



// Tabla de usuarios
panelRutas.get("/panel/usuarios", async (req, res) => { PanelControlador.tablaUsuarios(req, res) })

// Eliminar usuario
panelRutas.get("/panel/usuarios/:id/eliminar", async (req, res) => { PanelControlador.confirmarEliminarUsuario(req, res) })
panelRutas.post("/usuario/:id/eliminar", async (req, res) => { PanelControlador.eliminarUsuario(req, res) })

// Editar usuario
panelRutas.get("/panel/usuarios/:id/editar", async (req, res) => { PanelControlador.formularioEditarUsuario(req, res) })
panelRutas.post("/usuario/:id/editar", async (req, res) => { PanelControlador.editarUsuario(req, res) })


// Agregar horario
panelRutas.get('/panel/horarios/crear', (req, res) => {
	
	res.render('administrador/agregarHorario')
})
panelRutas.post('/panel/horarios/crear', (req, res) => { HorarioControlador.crearHorario(req, res) })

// Eliminar horario
panelRutas.post('/panel/horarios/:id/eliminar', (req, res) => { HorarioControlador.eliminarHorario(req, res) })

// Calendario
panelRutas.get('/panel/calendario', (req, res) => {
	res.render('calendario')
})