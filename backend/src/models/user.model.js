import mongoose from "mongoose";

const GeoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

const AddressSchema = new mongoose.Schema({
  streetA: { type: String, required: true },
  streetB: { type: String, required: true },
  streetC: { type: String, required: true },
  streetD: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: { type: GeoSchema, required: true },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String, required: true },
  bs: { type: String, required: true },
});

const PostSchema = new mongoose.Schema({
  words: { type: [String], required: true },
  sentence: { type: String, required: true },
  sentences: { type: String, required: true },
  paragraph: { type: String, required: true },
});

const AccountHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  business: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  account: { type: String, required: true },
});

// Main User Schema added password field for authorizarion
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: { type: CompanySchema, required: true },
  posts: { type: [PostSchema], required: true },
  accountHistory: { type: [AccountHistorySchema], required: true },
  favorite: { type: Boolean, default: false },
  avatar: { type: String, required: true },
  id: { type: Number, unique: true },
});

// Создание модели
const User = mongoose.model("User", UserSchema);

// Экспорт модели
module.exports = User;
