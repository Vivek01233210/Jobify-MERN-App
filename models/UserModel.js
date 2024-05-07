import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: { type: String, select: false },
        lastName: {
            type: String,
            default: 'lastName',
        },
        location: {
            type: String,
            default: 'my city',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        avatar: String,
        avatarPublicId: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

//  method to remove password from the user object, however it can simply be done by using the select property in the password field
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};


export default User;