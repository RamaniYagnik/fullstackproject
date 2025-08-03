import mongoose from "mongoose";

const url = "mongodb+srv://ramaniyagnik06:J5TXbYzQG87qt8Qv@cluster0.ddqxc.mongodb.net/FullStack-Project-Backend?retryWrites=true&w=majority&appName=Cluster0"

mongoose.set('strictQuery',false)

export default mongoose.connect(url)