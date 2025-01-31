import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    glbModels: {
        type: [{
            name: { type: String, required: true },  // Tên model
            type: { type: String, required: true, default: "glbModel" }, // Loại tài nguyên
            path: { type: String, required: true },  // Đường dẫn đến file .glb
            img: { type: String, required: true }    // Link ảnh đại diện
        }],
        default: [{
            name: "Default Model",
            type: "glbModel",
            path: "https://example.com/default.glb",
            img: "https://example.com/default.jpg"
        }]
    }
});


// Mã hóa mật khẩu trước khi lưu vào database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Kiểm tra mật khẩu khi đăng nhập
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
