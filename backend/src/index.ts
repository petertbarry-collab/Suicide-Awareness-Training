import { createApplication } from "@specific-dev/framework";
import * as schema from './db/schema/schema.js';
import { registerTrainingRoutes } from './routes/training.js';

// Create application with schema for full database type support
export const app = await createApplication(schema);

// Export App type for use in route files
export type App = typeof app;

// Register routes - add your route modules here
// IMPORTANT: Always use registration functions to avoid circular dependency issues
registerTrainingRoutes(app);

// Seed initial data
async function seedData() {
  app.logger.info({}, 'Clearing and reseeding training registrations');

  // Delete all existing rows
  await app.db.delete(schema.trainingRegistrations);

  // Insert single seed row
  await app.db
    .insert(schema.trainingRegistrations)
    .values({
      deviceId: 'seed-device-1',
    });

  app.logger.info({ count: 1 }, 'Seeding completed');
}

await seedData();
await app.run();
app.logger.info('Application running');
