const { Schema, model } = require('mongoose');
import { isEmail } from 'validator';

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        }
    },
    {
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [ isEmail, 'invalid email' ],
        }
    },
    {
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
    },
    {
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

    const User = model('user', userSchema);

module.exports = User;