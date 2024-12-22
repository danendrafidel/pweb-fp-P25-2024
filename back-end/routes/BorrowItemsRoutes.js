const express = require("express");
const BorrowItem = require("../schema/BorrowItems");
const Role = require("../enum/role");
const { authenticateToken, authorizeRole } = require("./middleware");
const Items = require("../schema/Items");
const router = express.Router();

// Get all operators
router.get(
  "/summary",
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.OPERATOR]),
  async (req, res) => {
    try {
      const borrowItems = await BorrowItem.find()
        .populate("item_id", " name")
        .exec();
      res.json(borrowItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items ", error });
    }
  }
);

// Create BorrowItem / borrow and item
router.post(
  "/operator/book-equipment",
  authenticateToken,
  authorizeRole([Role.OPERATOR]),
  async (req, res) => {
    try {
      const { item_id, amount, return_date, borrower_name, officer_name } =
        req.body;

      if (
        !item_id ||
        !amount ||
        !return_date ||
        !borrower_name ||
        !officer_name
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const item = await Items.findById(item_id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      const requestedAmount = parseInt(amount);
      const currentStock = parseInt(item.amount);

      if (currentStock < requestedAmount) {
        return res.status(400).json({
          message: "Insufficient stock",
          available: currentStock,
          requested: requestedAmount,
        });
      }

      const updatedStock = currentStock-requestedAmount
      await Items.findByIdAndUpdate(
        item_id,
        { $set: {amount: updatedStock.toString() } },
        { new: true }
      );

      const newBorrow = new BorrowItem({
        item_id,
        amount,
        return_date: new Date(return_date),
        borrower_name,
        officer_name,
      });
      await newBorrow.save();

      res.status(201).json({
        message: "Equipment borrowed successfully",
        data: newBorrow,
      });
    } catch (error) {
      console.error("Error in book-equipment:", error);
      res
        .status(500)
        .json({
          message: "Error creating borrow record",
          error: error.message,
        });
    }
  }
);

router.get(
  "/operator/equipment/sum",
  authenticateToken,
  authorizeRole([Role.OPERATOR]),
  async (req, res) => {
    try {
      const result = await BorrowItem.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $toInt: "$amount" } },
          },
        },
      ]);
      res.status(200).json({ totalAmount: result[0].total });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching sum of borrowed item ", err });
    }
  }
);

// Get all equipment
router.get(
  "/operator/equipment",
  authenticateToken,
  authorizeRole([Role.OPERATOR]),
  async (req, res) => {
    try {
      const result = await BorrowItem.aggregate([
        {
          $group: {
            _id: "$item_id",
            totalAmount: { $sum: { $toInt: "$amount" } },
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "_id",
            as: "itemDetails",
          },
        },
        {
          $unwind: "$itemDetails",
        },
        {
          $project: {
            _id: 0,
            itemName: "$itemDetails.name",
            condition: "$itemDetails.condition",
            registered_at: "$itemDetails.created_at",
            totalAmount: 1,
          },
        },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error fetching borrowed item", err });
    }
  }
);

module.exports = router;
