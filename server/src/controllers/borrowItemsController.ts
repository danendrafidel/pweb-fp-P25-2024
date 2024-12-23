import { Request, Response } from "express";
import { Item, items } from "./itemsController";

// Simulasi database peminjaman
export interface BorrowRequest {
  borrowerName: string;  // Pastikan ada borrowerName
  userId: number;
  itemId: number;
  itemName: string;  // Pastikan ada itemName
  quantity: number;
  borrowDate: Date;
}

export const borrowRequests: BorrowRequest[] = [];

// Endpoint untuk membuat peminjaman
export const borrowItem = (req: Request, res: Response) => {
  const { borrowerName, userId, itemId, quantity } = req.body; // Ambil borrowerName, userId, itemId, dan quantity

  // Validasi input
  if (!borrowerName || !userId || !itemId || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validasi apakah itemId ada di tabel items
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Validasi stok barang
  if (item.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  // Kurangi stok barang
  item.quantity -= quantity;

  // Simpan data peminjaman
  const newBorrowRequest: BorrowRequest = {
    borrowerName,
    userId,
    itemId,
    itemName: item.name,  // Ambil itemName dari tabel items
    quantity,
    borrowDate: new Date(),
  };
  borrowRequests.push(newBorrowRequest);

  return res.status(201).json({
    message: "Borrow request created successfully",
    request: newBorrowRequest,
  });
};

// Endpoint untuk mendapatkan semua peminjaman
export const getBorrowRequests = (req: Request, res: Response) => {
  const detailedBorrowRequests = borrowRequests.map((borrow) => {
    const item = items.find((item) => item.id === borrow.itemId);
    return {
      ...borrow,
      itemName: item?.name || "Unknown Item",  // Menambahkan itemName ke dalam response
    };
  });

  return res.status(200).json(detailedBorrowRequests);
};
