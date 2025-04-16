import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// encrypt the password before storing
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validPassword = async function (candidatePassword) {
  if (this.password != null) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
  return false;
};

export default mongoose.model("User", userSchema);
