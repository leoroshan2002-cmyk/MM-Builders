import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';
import Concept from '../models/Concept.js';
import Blueprint from '../models/Blueprint.js';
import SiteSetting from '../models/SiteSetting.js';
import { settings, services, concepts, blueprints } from '../data/siteData.js';

const destroyOnly = process.argv.includes('--destroy');

const run = async () => {
  await connectDB();
  await Promise.all([Service.deleteMany(), Concept.deleteMany(), Blueprint.deleteMany(), SiteSetting.deleteMany()]);
  console.log('• Old content removed');

  if (!destroyOnly) {
    await SiteSetting.create(settings);
    await Service.insertMany(services);
    await Concept.insertMany(concepts);
    await Blueprint.insertMany(blueprints);
    console.log(
      `✔ Seeded: ${services.length} services, ${concepts.length} concepts, ${blueprints.length} blueprints, 1 settings document`
    );
  }
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error('✖ Seeding failed:', err);
  await mongoose.disconnect();
  process.exit(1);
});
