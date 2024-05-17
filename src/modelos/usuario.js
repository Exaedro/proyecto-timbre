import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
	{
		nombreUsuario: { type: String, unique: true },
		contraseña: { type: String },
		rol: { type: String },
	},
	{
		timestamps: true,
	}
);

export default model("usuarios", usuarioSchema);
