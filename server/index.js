import express from 'express';
import db from './db/config.js';
import expenseRoutes from './routes/expense.routes.js';

// Set the port for the server to the value specified in the PORT environment variable, or 3000 if the PORT variable is not set
const PORT = process.env.PORT || 3000;

// Wait for the connection to the database to be established
db.then((response) => {
    console.log(response);

    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });

    app.use('/api/expenses', expenseRoutes);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
