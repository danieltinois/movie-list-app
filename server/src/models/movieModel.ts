import mongoose, { Document } from "mongoose";

interface IMovie extends Document {
  title: string;
  author: string;
  genre: string;
  watched: boolean;
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  watched: { type: Boolean, default: false },
});

export default mongoose.model<IMovie>("Movie", movieSchema);
