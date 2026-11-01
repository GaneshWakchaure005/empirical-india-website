import connectDB from "@/lib/mongodb";
import Counter from "@/models/Counter";

export async function nextEnquiryReference(counterId = "enquiry-reference") {
  await connectDB();
  const counter = await Counter.findOneAndUpdate({ _id: counterId }, { $inc: { value: 1 } }, {
    upsert: true, returnDocument: "after",
  });
  return `EI-RFQ-${String(counter!.value).padStart(6, "0")}`;
}
