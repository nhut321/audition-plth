import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.tp3tu.mongodb.net/Audition?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000  // Tăng thời gian timeout nếu cần
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Dừng server nếu không thể kết nối
    }
};

export default connectDB;
