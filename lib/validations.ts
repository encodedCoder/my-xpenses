import { z } from "zod";

export const expenseSchema = z.object({
  item: z
    .string()
    .min(1, "Item name is required")
    .max(100, "Item name cannot exceed 100 characters")
    .trim(),
  type: z.enum(
    [
      "Food",
      "Electronics",
      "Clothes",
      "Subscription",
      "SIP",
      "Stocks",
      "Travel",
      "Fees",
      "Mobile Recharge",
      "Other",
      "Medicine",
      "Transfer to Others",
      "Sports",
    ],
    {
      errorMap: () => ({ message: "Please select a valid expense type" }),
    }
  ),
  mode: z.enum(["Online", "Cash", "Card"], {
    errorMap: () => ({ message: "Please select a valid payment mode" }),
  }),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .max(10000000, "Amount cannot exceed ₹1,00,00,000"),
  date: z.string().min(1, "Date is required"),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;

export const filterSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum([
      "Food",
      "Electronics",
      "Clothes",
      "Subscription",
      "SIP",
      "Stocks",
      "Travel",
      "Fees",
      "Mobile Recharge",
      "Other",
      "Medicine",
      "Transfer to Others",
      "Sports",
      "",
    ])
    .optional(),
  mode: z.enum(["Online", "Cash", "Card", ""]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sort: z.enum(["latest", "oldest", "highest", "lowest"]).optional(),
});
