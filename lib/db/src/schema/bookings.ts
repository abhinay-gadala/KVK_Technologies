import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingId: text("booking_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  deviceType: text("device_type").notNull(),
  deviceName: text("device_name"),
  problemDescription: text("problem_description").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTimeSlot: text("preferred_time_slot").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
