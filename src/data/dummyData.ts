import { Role, User, Item, Operator, BorrowItem } from "../types";

// Dummy Users (updated usernames and passwords)
export const dummyUsers: User[] = [
  {
    id: "1",
    username: "superadmin",
    password: "secureAdmin2024",
    role: Role.ADMIN,
  },
  {
    id: "2",
    username: "staffOperator",
    password: "opPass2024",
    role: Role.OPERATOR,
  },
];

// Dummy Items (updated names, amounts, and conditions)
export const dummyItems: Item[] = [
  {
    id: "1",
    name: "Laptop HP Pavilion",
    amount: 7,
    condition: "Baru",
    created_at: new Date("2024-02-10"),
  },
  {
    id: "2",
    name: "Proyektor BenQ",
    amount: 2,
    condition: "Baik",
    created_at: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Raspberry Pi Kit",
    amount: 15,
    condition: "Baik",
    created_at: new Date("2024-03-05"),
  },
];

// Dummy Operators (updated names and passwords)
export const dummyOperators: Operator[] = [
  {
    id: "1",
    name: "Aldo",
    username: "AldoOps",
    password: "aldoPass123",
  },
  {
    id: "2",
    name: "Nadia",
    username: "NadiaTech",
    password: "nadiaSecure123",
  },
];

// Dummy Borrowings (updated items, dates, and statuses)
export const dummyBorrowings: BorrowItem[] = [
  {
    id: "1",
    item_name: "Laptop HP Pavilion",
    amount: 2,
    borrow_date: new Date("2024-03-15"),
    return_date: new Date("2024-03-22"),
    borrower_name: "Dimas",
    officer_name: "Nadia",
    status: "BORROWED",
  },
  {
    id: "2",
    item_name: "Proyektor BenQ",
    amount: 1,
    borrow_date: new Date("2024-03-10"),
    return_date: new Date("2024-03-17"),
    borrower_name: "Rizky",
    officer_name: "Aldo",
    status: "RETURNED",
  },
];
