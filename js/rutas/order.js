const router = require("express").Router();

const { vToken, vPermis } = require("../middlewares/user");

const { vOrder } = require("../middlewares/order");

const accOrder = require("../db/access/order");

const accProduct = require("../db/access/product");

const accOrderDet = require("../db/access/orderDet");

const roleIdA = 2;

//////////////////////////////Crear un nuevo Pedido///////////////////////

router.post("/create", vOrder, vToken, async (req, res) => {
    //console.log("Entró al post");
    try {
        const vProducts = await productOrderDet(req.body.productos);
      if (vProducts && vProducts.error)
        return res
          .status(400)
          .json({ error: 400, detailError: vProducts.error });
  
      let saveOrder = await accOrder.createOrder(req.body);

      //console.log(saveOrder);
  
      await createDetOrder(saveOrder[0], req.body.productos);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

    const productOrderDet = async (productos) => {
    
    const idsProductsOrder = productos.map((item) => item.productId);
  
    const idsProductsRest = (await accProduct.findProductByIds(idsProductsOrder)).map((item) => item.productId);

    if (idsProductsOrder.length != idsProductsRest.length) {

        let errorMotivo = idsProductsOrder.filter((item) => !idsProductsRest.includes(item)).map((item) => {
            return {
                id: item,
                message: "Producto especificado no existe en la base de datos",
            };
        });
        return { error: errorMotivo };
    }
};
 
const createDetOrder = async (id_order, productos) => {
    for (const item of productos) {
      const detOrder = {
        id_order,
        id_product: item.productId,
        quantity: item.quantity,
      };
  
      await accOrderDet.createOrder(detOrder);
    }
};

//////////////////////////////Listar Pedidos///////////////////////

router.get("/", vToken, async (req, res) => {
    try {
      const { roleId, userId } = req.body;

      let order = null;
  
      if (roleId === roleIdA) {
        order = await accOrder.findAll();////
      } else {
        order = await accOrder.findAllById(userId);//
      }
  
      return res.json(order);
    } catch (error) {
      res.status(400).json({ error: 'No posee los permisos requeridos'});
    }
});

//////////////////////////////Listar UN Pedido///////////////////////


router.get("/:id", vToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { roleId, userId } = req.body;
  
      let order = null;
  
      if (roleId === roleIdA) {
        order = await accOrder.findById(id);
      } else {
        order = await accOrder.findByIdandUser(id, userId);
        res.status(400).json({ error: 'No posee los permisos requeridos'});
      }
  
      return res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
 
//////////////////////////////Actualizar estado de pedido///////////////////////

router.put("/:id", vToken, vPermis, async (req, res) => {
    try {
      const { id } = req.params;
      const { statusId } = req.body;
  
      if (!statusId) {
          return res.status(400).json({ error: "Falta un dato requerido" });
      }
        
      let order = await accOrder.findById(id);

      if (!order.length) {
          return res.status(404).json({ error: "Datos inválidos" });
      }
        
      await accOrder.updateStatus(id, statusId);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

//////////////////////////////Eliminar pedido///////////////////////


router.delete("/:id", vToken, vPermis, async (req, res) => {
    try {
      const { id } = req.params;
  
      let order = await accOrder.findById(id);
      if (!order.length)
        return res.status(404).json({ error: "Dato inválidos" });
  
      await accOrderDet.deleteOr(id);
  
      await accOrder.deleteOr(id);
  
      res.json({ message: "Dato Eliminado Definitivamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }); 

module.exports = router;