const express = require("express");
const Item = require("../schema/Items");
const Role = require("../enum/role");
const { authenticateToken, authorizeRole } = require("./middleware");
const formattedCurrentDate = require("../utils/isoFormatCurrentDate");
const router = express.Router();

// Get all barang/product
router.get(
  "/admin/all-equipment",
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items ", error });
    }
  }
);

// Get list of names barang
router.get(
    "/operator/items",
    authenticateToken,
    authorizeRole([Role.OPERATOR]),
    async (req, res) => {
      try {
        const items = await Item.find();
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: "Error fetching items ", error });
      }
    }
  );
  
// Sum Barang
router.get(
    "/admin/all-equipment/sum",
    authenticateToken,
    authorizeRole([Role.ADMIN, Role.OPERATOR]),
    async (req, res) => {
      try {
        const sum = await Item.aggregate([
          {
            $group: {
              _id: null, 
              totalAmount: { $sum: { $toInt: "$amount" } },
            },
          },
        ]);
        if (sum.length > 0) {
          res.status(200).json({ totalAmount: sum[0].totalAmount });
        } else {
          res.status(200).json({ totalAmount: 0 });
        }
      } catch (err) {
        console.error("Error in sum endpoint:", err);
        res.status(500).json({ message: "Error fetching sum of data", err });
      }
    }
  );

// Create Barang
router.post(
  "/admin/create",
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  async (req, res) => {
    const data = req.body;
    const isExist = await Item.findOne({ name:data.name});
    try {
      if (isExist) {
        if (data.condition === isExist[0].condition) {
          const getAmount = parseInt(isExist[0].amount) + parseInt(data.amount);
          const updatedAmount = await Item.findByIdAndUpdate(
            isExist[0]._id,
            {
              name: data.name,
              amount: getAmount,
              condition: data.condition,
              created_at: formattedCurrentDate,
            },
            { new: true }
          );
          return res
            .status(201)
            .json({
              message: "Existing data found. Data amount updated. ",
              updatedAmount,
            });
        }
      }
      const item = new Item({
        ...data,
        created_at: formattedCurrentDate,
      });
      await item.save();
      return res
        .status(201)
        .json({ message: "Data has been created successfully. ", item });
    } catch (err) {
      res.status(500).json({ message: "Error creating item ", err });
    }
  }
);

// update barang
router.put("/admin/update/:id", async (req, res) => {
  try {
    const { name, amount, condition } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, amount, condition },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
});

// delete barang
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
});

module.exports = router;
