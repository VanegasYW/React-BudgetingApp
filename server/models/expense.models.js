import {Schema, model} from 'mongoose';

const expenseSchema = new Schema({
    budget: {
        type: Object,
        required: false
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    expenses: {
        type: Array,
        required: false
    }
});

export default model('Expense',  expenseSchema);
