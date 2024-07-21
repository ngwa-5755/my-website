const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selfAssessmentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  jobResponsibilities: { type: String, required: true },
  achievements: { type: String, required: true },
  evidence: { type: [String], required: false }, // Storing file paths
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SelfAssessment', selfAssessmentSchema);
