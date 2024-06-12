import { Schema, model } from 'mongoose'
import { mesIngNum } from '../utils/convertidorMeses.js';

const horarioSchema = new Schema(
	{
		dia: { type: String },
		mes: { type: String },
		año: { type: String },
		partes: {
			hora: { type: String },
			minuto: { type: String }
		},
		parteFinal: {
			hora: { type: String },
			minuto: { type: String }
		},
		modo: { type: Boolean, default: true },
		repetirDiariamente: { type: Boolean, default: false }
	},
	{
		virtuals: {
			timestamp: {
				get() {
					return `${this.dia} ${this.mes} ${this.año} ${this.partes.hora}:${this.partes.minuto}:00 GMT-0300`
				}
			},
			timestampFinal: {
				get() {
					return `${this.dia} ${this.mes} ${this.año} ${this.parteFinal.hora}:${this.parteFinal.minuto}:00 GMT-0300`
				}
			},
			fecha: {
				get() {
					return `${this.dia}/${mesIngNum(this.mes)}/${this.año}`
				}
			}
		},
		timestamps: true
	}
);

export default model("horarios", horarioSchema);
