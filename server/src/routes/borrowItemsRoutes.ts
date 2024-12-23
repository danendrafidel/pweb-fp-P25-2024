import { Router, Request, Response } from "express";
import { items } from "../controllers/itemsController"; // Ambil data barang dari itemsController
import { BorrowRequest, borrowRequests } from "../controllers/borrowItemsController"; // Data peminjaman

const router = Router();

// Endpoint untuk meminjam barang
router.post("/borrow", (req: Request, res: Response): void => {
  const { borrowerName, itemName, quantity } = req.body;

  // Validasi input
  if (!borrowerName || !itemName || !quantity) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Validasi apakah barang ada di tabel all-equipment
  const item = items.find((item) => item.name === itemName);
  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  // Validasi stok barang
  if (item.quantity < quantity) {
    res.status(400).json({ message: "Insufficient stock" });
    return;
  }

  // Kurangi stok barang
  item.quantity -= quantity;

  // Simpan data peminjaman
  const newBorrowRequest: BorrowRequest = {
    borrowerName,
    userId,
    itemId: item.id, // Menggunakan item.id bukan itemName
    itemName: item.name, // Menyertakan itemName yang ditemukan
    quantity,
    borrowDate: new Date(),
  };
  borrowRequests.push(newBorrowRequest);

  res.status(201).json({
    message: "Item borrowed successfully",
    borrowRecord: newBorrowRequest,
  });
});

// Endpoint untuk mendapatkan data semua peminjaman
router.get("/borrowers", (_req: Request, res: Response): void => {
  res.status(200).json(borrowRequests);
});

export default router;
