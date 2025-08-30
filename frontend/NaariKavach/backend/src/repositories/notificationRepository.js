// repositories/notificationRepository.js
const Notification = require("../models/Notification");

class NotificationRepository {
  // Create a new notification
  async createNotification({ user, location, contacts, message, status = "sent" }) {
    try {
        const notification = new Notification({
            user,
            location,
            contacts,
            message,
            status,
        });
        return await notification.save();
    } catch (error) {
        // Handle or log error
        throw error;
    }
  }

  // Get all notifications (or filter by phone if needed)
  async getNotifications(phone = null) {
    if (phone) {
      return await Notification.find({ "user.phone": phone }).sort({ createdAt: -1 });
    }
    return await Notification.find().sort({ createdAt: -1 });
  }

  // Get a single notification by ID
  async getNotificationById(id) {
    return await Notification.findById(id);
  }

  // Update status (sent/failed)
  async updateStatus(id, status) {
    return await Notification.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }

  // Delete a notification
  async deleteNotification(id) {
    return await Notification.findByIdAndDelete(id);
  }
}

module.exports = new NotificationRepository();
