import { validationResult } from "express-validator";

export const validarFormulario = (vista, req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const valores = req.body;
        const validaciones = errores.array();
        return res.render(vista, { validaciones, valores });
    }
}