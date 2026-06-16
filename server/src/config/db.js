const mongoose = require ('mongoose');
const { mongodbURL } = require('../secret');

const connectDatabase = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options);
        console.log('Connected successfully to mongoDB database');

        mongoose.connection.on('error', (error) => {
            console.error('DB Connection Error:', error);
            
        })
        
    } catch (error) {
        console.error('Could not connected to DB:', error.toString());
    }
}

module.exports = connectDatabase;