import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
   purchasedCourses: { type: Number, default: 8000 },
   completedCourses: { type: Number, default: 10000 },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

async function initializeStatistics() {
   const existingStats = await Statistics.findOne({});
   if (!existingStats) {
      await Statistics.create({ purchasedCourses: 8000, completedCourses: 10000 });
      console.log('Initial statistics document created');
   }
}

export { Statistics, initializeStatistics };
