import Horario from "../mongoModelos/horarios.js";

export default class HorarioModelo {
    static async obtenerHorarios() {
        const horarios = await Horario.find()

        return horarios
    }
    static async crearHorarioActivo(dia, mes, año, hora, minuto, modo) {
        const horario = new Horario()

        horario.dia = dia
        horario.mes = mes
        horario.año = año
        horario.partes.hora = hora
        horario.partes.minuto = minuto
      
        horario.modo = modo

        await horario.save()
    } 

    static async crearHorarioDesactivado(dia, mes, año, horaInicial, horaFinal, minutoInicial, minutoFinal, modo) {
        const horario = new Horario()

        horario.dia = dia
        horario.mes = mes
        horario.año = año

        horario.partes.hora = horaInicial
        horario.partes.minuto = minutoInicial

        horario.parteFinal.hora = horaFinal
        horario.parteFinal.minuto = minutoFinal

        horario.modo = modo

        await horario.save()
    }
}