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
  const existingCount = await app.db
    .select()
    .from(schema.trainingRegistrations);

  if (existingCount.length === 0) {
    app.logger.info({}, 'Seeding training registrations');
    const seedDevices = Array.from({ length: 47 }, (_, i) => ({
      deviceId: `seed-device-${i + 1}`,
    }));

    for (const device of seedDevices) {
      await app.db
        .insert(schema.trainingRegistrations)
        .values(device)
        .onConflictDoNothing();
    }

    app.logger.info({ count: 47 }, 'Seeding completed');
  }
}

await seedData();
await app.run();
app.logger.info('Application running');
