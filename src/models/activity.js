import { mongoose, Schema } from "mongoose";

const activitySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Activity = mongoose.model('activity', activitySchema);

export default Activity;
