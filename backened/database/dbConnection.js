import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "resturant",
    })
    .then(()=> {
        console.log("Databse is connected succesfully")
    }).catch((err)=> {
console.error("DB connection error:", err);    })
}