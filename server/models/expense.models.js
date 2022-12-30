import {Schema, model} from 'mongoose';

const expenseSchema = new Schema({
    budget: {
        type: Array,
        required: false
    },
    expenses: {
        type: Array,
        required: false
    }
});

export default model('Expense',  expenseSchema);
