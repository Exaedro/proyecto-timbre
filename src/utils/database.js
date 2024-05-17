import mongoose from "mongoose";

export const conectarDB = await mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Base de datos conectada"));
