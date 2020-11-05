const vOrder = (req, res, next) => {
    const { userId, typepaymentId } = req.body;
    //const { productId, cantidad} = req.body.productos;

    if(userId && typepaymentId){ //&& productId && cantidad){
        if (typeof(userId) === "number" && typeof(typepaymentId) === "number"){ //&& typeof(productId) === "number" && typeof(userId) === "number"){
            next();
        } else {
            res.status(400).json('Error, diligencie los datos nuevamente');
        }
    } else {
        res.status(400).json('Datos Incompletos');
    };
};


module.exports = {
    vOrder
}
