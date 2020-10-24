
const vLogin = (req, res, next) => {
    try {
        const { user, pass } = req.body;
        if(!user || !pass)
        return res.status(400).json({error: 'Datos Incompletos'});
        next()
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    vLogin
};