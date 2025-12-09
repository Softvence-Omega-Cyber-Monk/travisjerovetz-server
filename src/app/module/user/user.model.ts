import { model, Schema } from "mongoose";

const userSchema = new Schema({});


const User = model("user" , userSchema);