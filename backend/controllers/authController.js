import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Hàm đăng nhập
const loginUser = async (req, res) => {
    console.log('Đang đăng nhập...');
    const { username, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password); // So sánh mật khẩu nhập vào với mật khẩu đã băm

    if (!isMatch) {
        // console.log(user.password +','+ password)
        return res.status(401).json({ message: 'Mật khẩu sai' });
    }

    console.log(user)

    

    // Chỉ lấy trường 'name' trong glbModels
const filteredUser = {
    ...user,
    glbModels: user.glbModels.map(model => ({ name: model.name, image: model.img }))
  };

  console.log()

    res.json({
        message: 'Đăng nhập thành công',
        user: filteredUser.glbModels
    });
};


// Hàm đăng ký
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    // // Băm mật khẩu
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    //Tạo người dùng mới
    const newUser = new User({ username, password });

    try {
        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        
        res.status(201).json({
            message: 'Đăng ký thành công',
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

export { loginUser, registerUser };
