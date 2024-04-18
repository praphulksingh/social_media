import mongoose from "mongoose";

//defining connection type optionally
type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}


/*here we are expecting Promise which can be any type(void) */
async function dbConnect():Promise<void>{
    //checking if we already have connection
    if(connection.isConnected){
        console.log("Already connected to database")
        return;
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || "",{})
console.log(db)
        connection.isConnected=db.connections[0].readyState
console.log(db.connections)
        console.log("Connected to database")
    } catch (error) {
        console.log("database connection failed",error)
        process.exit(1)
    }
}

export default dbConnect