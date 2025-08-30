const cron = require("node-cron");
const cacheService = require("../cache/cacheService");
// If you use DB, also import models here (e.g., const Token = require("../models/tokenModel"))

function cleanupTask() {
  console.log("🧹 Cleanup job started at", new Date().toISOString());

  // Example 1: Clear expired cache keys
  // (your cacheService already auto-clears on access,
  // but you can reset everything at intervals)
  cacheService.clear();

  // Example 2: Clean up old database records
  // Example: delete expired tokens (pseudo-code)
  /*
  Token.deleteMany({ expiresAt: { $lt: new Date() } })
    .then(() => console.log("✅ Expired tokens cleaned"))
    .catch(err => console.error("❌ Token cleanup failed", err));
  */

  console.log("🧹 Cleanup job finished at", new Date().toISOString());
}

// Start cleanup job every day at midnight
const startCleanupJob = () => {
  cron.schedule("0 0 * * *", () => {
    cleanupTask();
  });
  console.log("✅ Cleanup job scheduled to run daily at midnight");
};

module.exports = { startCleanupJob };
