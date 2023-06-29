import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
    {
        to: {
          type: String,
          required: true,
          trim: true,
        },
        from: {
          type: String,
          required: true,
          unique: true,
        },
        subject: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          
        },
        message: {
          type: String,
          required: true,
        },
        referanceno: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
    );
    
    export default mongoose.model("formd", formSchema);
