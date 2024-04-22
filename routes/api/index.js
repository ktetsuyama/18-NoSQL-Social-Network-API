const router = require("express").Router();
const thoughtRoutes = require("./thoughtsRoutes");
const userRoutes = require("./usersRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
