const cron = require("node-cron");

// Dummy notification function
function sendNotification() {
  // Replace with actual notification logic
  console.log("Notification sent at", new Date().toISOString());
}

// Job scheduler function
const startNotificationJob = () => {
  // Runs every minute -> cron expression can be changed
  cron.schedule("* * * * *", () => {
    sendNotification();
  });
  console.log("✅ Notification job scheduled to run every minute");
};

module.exports = { startNotificationJob };
