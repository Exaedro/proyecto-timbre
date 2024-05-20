import MongoUsuario from '../mongoModelos/usuario.js'

export default class Usuario {
    static async obtenerUsuarios() {
        const usuarios = await MongoUsuario.find()

        return usuarios
    }

    static async buscarUsuarioPorNombre(nombreUsuario) {
		const data = await MongoUsuario.findOne({ nombreUsuario });
        return data
    }

    static async buscarUsuarioPorId(id) {
        const data = await MongoUsuario.findById(id)
        return data
    }

    static async crearUsuario(nombreUsuario, contraseña, rol) {
        const usuario = new MongoUsuario();

		usuario.nombreUsuario = nombreUsuario;
		usuario.contraseña = contraseña;
		usuario.rol = rol;

		await usuario.save();
    }

    static async eliminarUsuario(usuarioId) {
        await MongoUsuario.findOneAndDelete({ _id: usuarioId })
    }

    static async editarUsuario(usuarioId, nombreUsuario, rol) {
        await MongoUsuario.findOneAndUpdate({ _id: usuarioId }, { nombreUsuario, rol })
    }
}