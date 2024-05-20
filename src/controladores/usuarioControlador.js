import UsuarioModelo from "../rutasModelos/usuarioModelo.js"

class UsuarioControlador {
    static async iniciarSesion(req, res) {
        const { nombreUsuario, contraseña } = req.body;

        const usuario = await UsuarioModelo.buscarUsuarioPorNombre(nombreUsuario)
        if (!usuario) {
            return res.render("login", { usuarioExiste: false });
        }

        if (usuario.contraseña != contraseña) {
            return res.render("login", { contraseñaIncorrecta: true })
        }

        req.session.nombreUsuario = nombreUsuario
        req.session.rol = usuario.rol

        res.redirect('/')
    }

    static async registrarUsuario(req, res) {
        const { nombreUsuario, contraseña, rol } = req.body

        const usuarioExiste = await UsuarioModelo.buscarUsuarioPorNombre(nombreUsuario)
        if(usuarioExiste) {
            return res.render("registro", { usuarioExiste: true });
        }

        try {
            await UsuarioModelo.crearUsuario(nombreUsuario, contraseña, rol)
            res.redirect('/panel/usuarios')
        } catch(e) {
            res.redirect('/') // Cambiar mas tarde
        }
    }
}

export default UsuarioControlador