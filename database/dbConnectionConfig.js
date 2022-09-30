import mongoose from "mongoose"

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_ATLAS)

    console.log("Base de datos online")
  } catch (error) {
    console.log(error)
    throw new Error("Error a la hora de iniciar la base de datos")
  }
} 

export { dbConnection }