import User from '../models/User.js'

const getModel = async (req, res) => {
    try {
        // Lấy toàn bộ user từ database
        const users = await User.find({});

        // Trả về danh sách user dưới dạng JSON
        const newArray = users.map(v => {
            return {
                // user: v.username,
                glbModel: v.glbModels
            }
        })

        const flat = newArray.flatMap(v => v.glbModel)

        res.json(flat)
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export { getModel }