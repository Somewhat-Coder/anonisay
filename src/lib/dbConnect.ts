import mongoose from "mongoose";

type connectionObjectType = {
  isConnected?: number;
};

const connection: connectionObjectType = {}; // object to hold connection status

async function dbConnenct(): Promise<void> {
  if (connection.isConnected) {
    // check if already connected
    console.log("Already connected to the database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || ""); // connect to the database

    connection.isConnected = db.connections[0].readyState; // flag to indicate connection status
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // exit the process if connection fails
  }
}

export default dbConnenct; // export the function to be used in other files
