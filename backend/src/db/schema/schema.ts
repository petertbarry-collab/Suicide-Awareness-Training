import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const trainingRegistrations = pgTable('training_registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  registeredAt: timestamp('registered_at', { withTimezone: true }).defaultNow().notNull(),
  deviceId: text('device_id').notNull().unique(),
});
