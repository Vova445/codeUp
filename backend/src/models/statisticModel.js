import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
   purchasedCourses: { type: Number, default: 0 },
   completedCourses: { type: Number, default: 0 },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

export default Statistics;
