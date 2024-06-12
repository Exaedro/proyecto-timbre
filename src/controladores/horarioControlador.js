import HorarioModelo from "../rutasModelos/horarioModelo.js"

import { numeroParaMes } from "../utils/convertidorMeses.js"

export default class HorarioControlador {
    static async obtenerHorarios(req, res) {
        const { nombreUsuario, rol } = req.session
        const horarios = await HorarioModelo.obtenerHorarios()

        res.render("administrador/panel", { nombreUsuario, rol, horarios });
    }

    static async crearHorario(req, res) {
        let { modo, fecha, diario } = req.body

        const dia = fecha.slice(-2)
        const mes = numeroParaMes(fecha.slice(-5, 7))
        const año = fecha.slice(0, 4)

        if(modo == 'true') {
            let { hora } = req.body

            const minuto = hora.slice(-2)
            hora = hora.slice(0, 2)

            await HorarioModelo.crearHorarioActivo(dia, mes, año, hora, minuto, modo, diario)
        } else {
            let { horaInicial, horaFinal } = req.body

            const minutoInicial = horaInicial.slice(-2)
            horaInicial = horaInicial.slice(0, 2)

            const minutoFinal = horaFinal.slice(-2)
            horaFinal = horaFinal.slice(0, 2)

            await HorarioModelo.crearHorarioDesactivado(dia, mes, año, horaInicial, horaFinal, minutoInicial, minutoFinal, modo, diario)
        }

        res.redirect('/panel')
    }

    static async eliminarHorario(req, res) {
        const { id } = req.params

        await HorarioModelo.eliminarHorario(id)
        res.redirect('/panel')
    }
}