const jwt = require('jsonwebtoken');

const secret = '$eCr3t';

const roleIdA = 2; //Id cliente = 1 o Id admin = 2

const vLogin = (req, res, next) => {
    try {
        const { user, pass } = req.body;
        if(!user || !pass)
        return res.status(400).json({error: 'Los Datos están Incompletos (Usuario o contraseña)'});
        next()
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const vCreateU = (req, res, next) => {
    //console.log('Entró al middlewares');
    const { user, nameu, email, cellphone, adress, password, roleId } = req.body;

    if(user && nameu && email && cellphone && adress && password && roleId){
        if (typeof(user) === "string"
        && typeof(nameu) === "string"
        && typeof(email) === "string"
        && typeof(cellphone) === "string"
        && typeof(adress) === "string"
        && typeof(password) === "string"
        && typeof(roleId) === "number"){
            if (roleId !==1 && roleId !==2){
                return res.status(400).json('Rol invàlido. Sòlo se acepta "1" para Clientes y "2" para administrador');
            }
            if (password.length < 8) {
                return res.status(400).json('Contraseña muy corta. Debe tener al menos 8 caracteres');
            }
            next();
        } else {
            res.status(400).json('Datos mal ingresados');
        }
    } else {
        res.status(400).json('Datos Erroneos o Incompletos');
    };
};

const vToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Validaciones incorrectas 1. Ingresar información requerida" });
      
        await jwt.verify(token, secret, (error, data) => {
            if (error) return res.status(401).json({ error: "Validaciones incorrectas 2. Acceso denegado" });
                req.body.userId = data.id;
                req.body.roleId = data.roleId;
                next();
            });
        } catch (error) {
          res.status(400).json({ error: error.message });
    }
};

const vPermis = (req, res, next) => {

    try {
        const { roleId } = req.body;

        if (roleIdA !== roleId){
            return res.status(403).json({ error: "Id no validado. No posee los permisos requeridos" });
        }
        
        else{
            console.log("Id's iguales! Todo está bien");
            next();
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Exports middlewares

module.exports = {
    vLogin,
    vToken,
    vPermis,
    vCreateU
};