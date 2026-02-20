import mongoose from "mongoose";

const isValidGmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
};

const isValidISOStringDate = (dateString) => {
    if (typeof dateString !== 'string' || dateString.trim() === '') {
        return false;
    }
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
};

export { isValidGmail, isValidISOStringDate, isValidObjectId };