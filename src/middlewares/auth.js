export const esAdmin = (req, res, next) => {
	condicion(req, res, next, "admin");
};

export const esGestionador = (req, res, next) => {
	condicion(req, res, next, "gestionador");
};

export const esAlternador = (req, res, next) => {
	condicion(req, res, next, "alternador");
};

function condicion(req, res, next, tipoDeUsuario) {
	if (req.session.rol == tipoDeUsuario) {
		next();
	} else {
		res.redirect("/login");
	}
}
