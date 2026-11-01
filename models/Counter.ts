import mongoose, { Schema, type Model } from "mongoose";

type CounterDocument = { _id: string; value: number };
const counterSchema = new Schema<CounterDocument>({
  _id: { type: String, required: true },
  value: { type: Number, required: true, min: 0 },
}, { versionKey: false });

const Counter: Model<CounterDocument> = mongoose.models.Counter || mongoose.model<CounterDocument>("Counter", counterSchema);
export default Counter;
