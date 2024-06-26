import Horario from "../mongoModelos/horarios.js";

export default class HorarioModelo {
    static async obtenerHorarios() {
        const horarios = await Horario.find()

        return horarios
    }

    static async obtenerHorariosDiarios() {
        const horarios = await Horario.find({ repetirDiariamente: true })

        return horarios
    }

    static async obtenerHorarioConDia(dia) {
        const horarios = await Horario.find({ dia })

        return horarios
    }

    static async crearHorarioActivo(dia, mes, año, hora, minuto, modo, diario) {
        const horario = new Horario()

        horario.dia = dia
        horario.mes = mes
        horario.año = año
        horario.partes.hora = hora
        horario.partes.minuto = minuto
      
        horario.modo = modo
        horario.repetirDiariamente = diario

        await horario.save()
    } 

    static async crearHorarioDesactivado(dia, mes, año, horaInicial, horaFinal, minutoInicial, minutoFinal, modo, diario) {
        const horario = new Horario()

        horario.dia = dia
        horario.mes = mes
        horario.año = año

        horario.partes.hora = horaInicial
        horario.partes.minuto = minutoInicial

        horario.parteFinal.hora = horaFinal
        horario.parteFinal.minuto = minutoFinal

        horario.modo = modo
        horario.repetirDiariamente = diario

        await horario.save()
    }

    static async eliminarHorario(id) {
        await Horario.findOneAndDelete({ _id: id })
    }
}