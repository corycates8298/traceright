// functions/index.js
// Main entry point for all Firebase Cloud Functions

const visionAnalysis = require('./vision-analysis');
// Data management functions are now handled by Genkit flows
// const dataManagement = require('./data-management');

// Export Vision Analysis Functions
exports.analyzeImage = visionAnalysis.analyzeImage;
exports.quickBarcodeScan = visionAnalysis.quickBarcodeScan;
exports.batchAnalyzeImages = visionAnalysis.batchAnalyzeImages;

// Export Data Management Functions (now deprecated, kept for reference if needed)
// exports.seedDatabase = dataManagement.seedDatabase;
// exports.clearDatabase = dataManagement.clearDatabase;
// exports.setUserAdmin = dataManagement.setUserAdmin;
