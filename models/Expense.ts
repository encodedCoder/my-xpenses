import mongoose, { Schema, Document, Model } from "mongoose";
import { ExpenseType, PaymentMode } from "@/types";

export interface IExpenseDocument extends Document {
  userId: string;
  item: string;
  type: ExpenseType;
  mode: PaymentMode;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpenseDocument>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      index: true,
    },
    item: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: [100, "Item name cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Expense type is required"],
      enum: {
        values: ["Food", "Travel", "Electronics", "SIP", "Other"],
        message: "{VALUE} is not a valid expense type",
      },
    },
    mode: {
      type: String,
      required: [true, "Payment mode is required"],
      enum: {
        values: ["Online", "Cash", "Card"],
        message: "{VALUE} is not a valid payment mode",
      },
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.index({ userId: 1, date: -1 });

const Expense: Model<IExpenseDocument> =
  mongoose.models.Expense ||
  mongoose.model<IExpenseDocument>("Expense", ExpenseSchema);

export default Expense;
