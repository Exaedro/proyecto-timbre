import UsuarioModelo from "../rutasModelos/usuarioModelo.js";

class PanelControlador {
    static async tablaUsuarios(req, res) {
        const { nombreUsuario, rol } = req.session
        const usuarios = await UsuarioModelo.obtenerUsuarios()
        
        res.render("administrador/usuarios", { nombreUsuario, rol, usuarios });
    }

    static async eliminarUsuario(req, res) {
        const { id } = req.params

        try {
            await UsuarioModelo.eliminarUsuario(id)
            res.redirect('/panel/usuarios')
        } catch(err) {
            res.redirect('/') // Cambiar mas tarde
        }
    }

    static async confirmarEliminarUsuario(req, res) {
        const { id } = req.params
        const usuario = await UsuarioModelo.buscarUsuarioPorId(id)

        res.render('administrador/confirmacionEliminarCuenta', { usuario })
    }

    static async editarUsuario(req, res) {
        const { id } = req.params
        const { nombreUsuario, rol } = req.body

        try {
            await UsuarioModelo.editarUsuario(id, nombreUsuario, rol)
            res.redirect('/panel/usuarios')
        } catch(err) {
            res.redirect('/')
        }
    }

    static async formularioEditarUsuario(req, res) {
        const { id } = req.params
        const { nombreUsuario, rol, _id } = await UsuarioModelo.buscarUsuarioPorId(id)

        res.render('administrador/editarUsuario', { nombreUsuario, rol, usuarioId: _id })
    }
}

export default PanelControlador