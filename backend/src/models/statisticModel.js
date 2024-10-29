import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
   purchasedCourses: { type: Number, default: 0 },
   completedCourses: { type: Number, default: 0 },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

async function initializeStatistics() {
   const existingStats = await Statistics.findOne({});
   if (!existingStats) {
      await Statistics.create({ purchasedCourses: 0, completedCourses: 0 });
      console.log('Initial statistics document created');
   }
}

export { Statistics, initializeStatistics };
