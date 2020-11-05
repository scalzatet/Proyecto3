const router = require('express').Router();

const access = require('../db/access/product');

const { vToken,vPermis } = require("../middlewares/user");

const { vCreateP } = require("../middlewares/product");

//const { validateRequest } = require("../middlewares/products");

//////////////////////////////Crear un nuevo Producto///////////////////////

router.post("/", vCreateP, vToken, vPermis, async (req, res) => {  
  try {
    const newProduct = await access.findProductDescription(req.body);
    if (newProduct.length) {
      return res.status(409).json({ error: "El Producto ingresado ya se encuentra registrado en la base de datos"});
    }

    await access.createProduct(req.body);
    //console.log('Producto creado con éxito');
    res.json(req.body);
  } catch (error) {
    //console.log('El producto NO fue creado');
    res.status(400).json({ error: error.message });
    }
});


//////////////////////////////Listar Productos///////////////////////

router.get("/", vToken, async (req, res) => {
  try {
    const products = await access.findProducts();
    //console.log('Entró al try del get');
    res.json(products);
  } catch (error) {
    //console.log('No entró');
    res.status(400).json({ error: error.message });
  }
});



//////////////////////////////Editar Productos///////////////////////

router.put("/:id", vCreateP,vToken, vPermis, async (req, res) => {
    try {
      const { id } = req.params;
      //console.log('entró al try');
      let product = await access.findProductId(id);

      if (!product.length){
        //console.log('entró al if');
        return res.status(404).json({ error: "El producto no existe" });
      }
      

      await access.upd(id, req.body);
      res.json(req.body);
    } catch (error) {
      //console.log('no put');
      res.status(400).json({ error: error.message });
    }
  }
);

//////////////////////////////Eliminar Productos///////////////////////


router.delete("/:id", vToken, vPermis, async (req, res) => {
  try {
    const { id } = req.params;

    let product = await access.findProductId(id);
      if (!product.length){
        return res.status(404).json({ error: "El producto no existe" });
      }
    await access.deleteP(id);

    res.json({ message: "Producto Eliminado con Éxito" });
  } catch (error) {
    //console.log('no delete');
    res.status(400).json({ error: error.message });
  }
});



//////////////////////////////Exports///////////////////////

module.exports = router;