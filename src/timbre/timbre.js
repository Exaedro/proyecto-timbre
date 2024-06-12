import HorarioModelo from "../rutasModelos/horarioModelo.js"

// import NodeCache from "node-cache"
// const cache = new NodeCache({ stdTTL: 30 }); 

export default class Timbre {
    static async comprobar() {
        const diaActual = this.obtenerDiaActual()

        // const horarios = await HorarioModelo.obtenerHorarioConDia(diaActual)

        // let horariosDiarios = cache.get('horariosDiarios')
        // if(!horariosDiarios) {
        //     horariosDiarios = await HorarioModelo.obtenerHorariosDiarios()
        //     cache.set('horariosDiarios', horariosDiarios)
        //     return;
        // }

        let horariosDiarios = await HorarioModelo.obtenerHorariosDiarios()

        const { horaActual, minutoActual } = this.obtenerHoraMinutoActual()

        const horario = horariosDiarios.filter(horario => horario.partes.hora == horaActual).sort((a, b) => (a.partes.hora - b.partes.hora))
        if(horario.length == 0) return; // Si no hay horarios agregados en la hora actual no hace nada

        for(let i = 0;i < horario.length; i++) {
            const hora = horario[i].partes.hora // tiempos de la base de datos
            const minuto = horario[i].partes.minuto

            if(horaActual == hora && minutoActual == minuto) {
                this.activarTimbre()
            } else {
                console.log('timbre desactivado, hora: ' + horaActual + ':' + minutoActual)
            }
        }      
    }

    static activarTimbre() {
        console.log('timbre activado')
    }

    static obtenerDiaActual() {
        const fechaHoy = new Date().toLocaleDateString().split('/')
        const diaActual = fechaHoy[0]
        return diaActual
    }

    static obtenerHoraMinutoActual() {
        const horaActual = new Date().getHours()
        const minutoActual = new Date().getMinutes()

        return {
            horaActual,
            minutoActual
        }
    }
}