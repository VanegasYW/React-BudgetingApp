import { connect, set } from 'mongoose';
import {config} from 'dotenv';

// Configure the dotenv module to read the .env file
config();

// Set the strictQuery option to false
set('strictQuery', false);

// Return a Promise that resolves with the message "DB Connected" if the connection is successful, or rejects with the error message "Connection Error" if there is an error
export default new Promise ((resolve, reject) => {
    // Connect to the MongoDB database using the connection string stored in the MONGO_CNN environment variable
    connect(process.env.MONGO_CNN, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
        if(error) reject("Connection Error")
        resolve("DB Connected")
    });
})
