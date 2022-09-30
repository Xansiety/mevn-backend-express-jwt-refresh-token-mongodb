import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

//override -> sobrescribir para solo devolver y omitir propiedades en el retorno
// usuarioSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...usuario } = this.toObject()
//   usuario.uid = _id
//   return usuario
// } 

const User = model("User", userSchema);

export default User;
