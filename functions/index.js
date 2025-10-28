// functions/index.js
// Main entry point for all Firebase Cloud Functions

const visionAnalysis = require('./vision-analysis');
const dataManagement = require('./data-management');

// Export Vision Analysis Functions
exports.analyzeImage = visionAnalysis.analyzeImage;
exports.quickBarcodeScan = visionAnalysis.quickBarcodeScan;
exports.batchAnalyzeImages = visionAnalysis.batchAnalyzeImages;

// Export Data Management Functions
exports.seedDatabase = dataManagement.seedDatabase;
exports.clearDatabase = dataManagement.clearDatabase;
exports.setUserAdmin = dataManagement.setUserAdmin;
