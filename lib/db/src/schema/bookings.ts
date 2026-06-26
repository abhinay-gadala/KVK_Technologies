import { z } from "zod/v4";

export const insertBookingSchema = z.object({
  bookingId: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone is required"),
  deviceType: z.string().min(1, "Device type is required"),
  deviceName: z.string().optional().nullable(),
  problemDescription: z.string().min(1, "Problem description is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTimeSlot: z.string().min(1, "Preferred time slot is required"),
  address: z.string().min(1, "Address is required"),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = InsertBooking & { id: number; createdAt: Date };
