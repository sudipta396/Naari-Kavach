const SOS = require("../models/SOS");

class SOSRepository {
    // Create a new SOS record
    async createSOS(sosData) {
        try {
            const sos = new SOS(sosData);
            return await sos.save();
        } catch (error) {
            throw error;
        }
    }

    // Get SOS by ID
    async getSOSById(id) {
        return await SOS.findById(id);
    }

    // Get all SOS records (optionally filter by user)
    async getAllSOS(userId = null) {
        if (userId) {
            return await SOS.find({ user: userId }).sort({ createdAt: -1 });
        }
        return await SOS.find().sort({ createdAt: -1 });
    }

    // Update SOS by ID
    async updateSOS(id, updateData) {
        return await SOS.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Delete SOS by ID
    async deleteSOS(id) {
        return await SOS.findByIdAndDelete(id);
    }
}