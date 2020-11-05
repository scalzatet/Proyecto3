const router = require('express').Router();

const { vLogin,vCreateU } = require('../middlewares/user');

const jwt = require('jsonwebtoken');

const access = require('../db/access/user');

const secret = '$eCr3t';

//////////////////////////////Loguear usuario///////////////////////

router.post('/login', vLogin,  async (req, res) => {
    //console.log(req.body);
    try {
        const user = await access.findUser(req.body);
        //console.log('nombre o usuario');
        
        //TOKEN
        const { pass } = req.body;
        
        if (!user.length) {
            return res.status(401).json({ error: "Información Incorrecta 1" });
        }
    
        if (user[0].password == pass) {

            const payload = {
            user: user[0].usuario,
            id: user[0].id,
            roleId: user[0].roleId
            }

            const token = jwt.sign(payload, secret);
            return res.header("auth-token", token).json({ token });
        } else {
        return res.status(401).json({ error: "Información Incorrecta 2" });
        }

        //res.status(200).json(user);
    } catch (error) {
        console.log('Datos mal');
        res.status(400).json({error: '"No se pudo loggear el usuario. Algo està mal"'});
    }
    //res.send('Usuario y contraseña bien');
});

//////////////////////////////Crear un nuevo usuario///////////////////////



router.post('/createuser', vCreateU,  async (req, res) => {   
    try {
        const newUser = await access.findUser(req.body);
        //console.log(newUser.length);

        if (newUser.length) {
            return res.status(409).json({ error: "El usuario ingresado ya se encuentra registrado en la base de datos"});
        }
        await access.createUser(req.body);
        res.json('El usuario ingresado acaba de ser creado de manera exitosa')
    } catch (error) {
        res.status(400).json({ error: "No se puede crear el usuario. Algo està mal"});
    }
});





//////////////////////////////Exports///////////////////////

module.exports = router;

