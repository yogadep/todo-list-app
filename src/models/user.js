import { mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// hashing password when creating user
userSchema.pre('save', async function(next){
    const modifyPassword = this.isModified('password');

    if(!modifyPassword) return next;
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(this.password, salt);
      this.password = hashedPass;
      next()
    } catch (error) {
      next(error)
    }
});

// hashing password when updating user
userSchema.pre('findOneAndUpdate', async function(next){
    const update = this.getUpdate();
    if(update.password){
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(update.password, salt);
            this.setUpdate({
                ...update,
                password : hashedPass
              })
        } catch (error) {
            next(error)
        }
    }
    next()
})

const User = mongoose.model('user', userSchema);

export default User;
