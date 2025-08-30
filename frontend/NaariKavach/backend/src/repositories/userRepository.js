const User = require("../models/User");

class UserRepository {
    // Create a new user
    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    // Get user by ID
    async getUserById(id) {
        return await User.findById(id);
    }

    // Get user by phone
    async getUserByPhone(phone) {
        return await User.findOne({ phone });
    }

    // Update user by ID
    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Delete user by ID
    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    // Get all users
    async getAllUsers() {
        return await User.find().sort({ createdAt: -1 });
    }
}