

const vCreateP = (req, res, next) => {
    //console.log('Entró al middlewares');
    const { description, price  } = req.body;

    if(description && price){
        if (typeof(description) === "string"){
            if (typeof(price) === "number") {
                console.log('Datos completos 222');
                //res.status(200).json('Datos completos');
                next(); 
            } else {
                res.status(400).json('Error, diligencie los datos nuevamente 1');
            }  
        } else {
            res.status(400).json('Error, diligencie los datos nuevamente 2');
        }
    } else {
        res.status(400).json('Datos Incompletos');
    };
};




module.exports = {
    vCreateP
}