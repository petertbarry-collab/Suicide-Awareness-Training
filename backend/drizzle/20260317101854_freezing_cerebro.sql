CREATE TABLE "training_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registered_at" timestamp with time zone DEFAULT now() NOT NULL,
	"device_id" text NOT NULL,
	CONSTRAINT "training_registrations_device_id_unique" UNIQUE("device_id")
);
