const router = require("express").Router();
const ctrl = require("../controllers/transactionController");

router.post("/", ctrl.add);
router.get("/", ctrl.getAll);
router.delete("/:id", ctrl.delete);
router.put("/:id", ctrl.update); 

module.exports = router;