import mongoose, { Document, Model, Schema } from "mongoose";

interface Person {
  name: string;
  email: string;
}

interface Card extends Document {
  postcardId: string;
  imagePath: string;
  text: string;
  title: string;
  sender: Person;
  recipient: Person;
}

const Postcard: Model<Document & Card> =
  mongoose.models.postcards ??
  mongoose.model(
    "postcards",
    new Schema({
      postcardId: { type: String, required: true },
      imagePath: { type: String, required: true },
      text: { type: String, required: true },
      title: { type: String, required: true },
      music: { type: String, required: false },
      sender: {
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
      recipient: {
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    })
  );

export default Postcard;
