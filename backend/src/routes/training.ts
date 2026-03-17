import type { App } from '../index.js';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema/schema.js';

export function registerTrainingRoutes(app: App) {
  // GET /api/training/count
  app.fastify.get('/api/training/count', {
    schema: {
      description: 'Get the total count of training registrations',
      tags: ['training'],
      response: {
        200: {
          description: 'Training count retrieved successfully',
          type: 'object',
          properties: {
            count: { type: 'number' },
          },
        },
      },
    },
  }, async (request, reply) => {
    app.logger.info({}, 'Fetching training registration count');
    try {
      const result = await app.db
        .select({ count: schema.trainingRegistrations.id })
        .from(schema.trainingRegistrations);
      const count = result.length;
      app.logger.info({ count }, 'Training count retrieved');
      return { count };
    } catch (error) {
      app.logger.error({ err: error }, 'Failed to fetch training count');
      throw error;
    }
  });

  // POST /api/training/register
  app.fastify.post('/api/training/register', {
    schema: {
      description: 'Register a device for training',
      tags: ['training'],
      body: {
        type: 'object',
        required: ['device_id'],
        properties: {
          device_id: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Device registered or already registered',
          type: 'object',
          properties: {
            count: { type: 'number' },
            already_registered: { type: 'boolean' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const body = request.body as { device_id: string };
    app.logger.info({ deviceId: body.device_id }, 'Registering device for training');
    try {
      // Check if device already exists
      const existing = await app.db
        .select()
        .from(schema.trainingRegistrations)
        .where(eq(schema.trainingRegistrations.deviceId, body.device_id));

      if (existing.length > 0) {
        // Device already registered, return current count
        const result = await app.db
          .select({ count: schema.trainingRegistrations.id })
          .from(schema.trainingRegistrations);
        const count = result.length;
        app.logger.info({ deviceId: body.device_id, count }, 'Device already registered');
        return { count, already_registered: true };
      }

      // Insert new registration
      await app.db
        .insert(schema.trainingRegistrations)
        .values({
          deviceId: body.device_id,
        });

      // Get new count
      const result = await app.db
        .select({ count: schema.trainingRegistrations.id })
        .from(schema.trainingRegistrations);
      const count = result.length;
      app.logger.info({ deviceId: body.device_id, count }, 'Device registered successfully');
      return { count, already_registered: false };
    } catch (error) {
      app.logger.error({ err: error, deviceId: body.device_id }, 'Failed to register device');
      throw error;
    }
  });
}
