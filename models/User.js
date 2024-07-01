import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        avatarURL: {
            type: String,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
