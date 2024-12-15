import { create } from "zustand";
import { Item } from "../types";
import { dummyItems } from "../data/dummyData";

interface ItemsState {
  items: Item[];
  addItem: (item: Omit<Item, "id">) => void;
  updateItem: (name: string, updateFn: (item: Item) => Partial<Item>) => void;
  deleteItem: (id: string) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [...dummyItems],
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        { ...item, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateItem: (name, updateFn) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.name === name ? { ...item, ...updateFn(item) } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
