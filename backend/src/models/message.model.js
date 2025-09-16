import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        text: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        image: {
            type: String,
        },
    },
    { timestamps: true }
);

messageSchema.pre('validate', function (next) {
    if (!this.text && !this.image) {
        return next(new Error('Either text or image is required'));
    }
    next();
});
export const Message = mongoose.model('Message', messageSchema);
