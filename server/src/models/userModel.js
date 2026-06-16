const {schema, model} = require ('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [4, 'User name must be more than 3 characters'],
        maxlength: [31, 'User name must be less than 32 characters']
    },

    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
});

module.exports = mongoose.model('User', userSchema);