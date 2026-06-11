import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KVK-${timestamp}-${random}`;
}

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  const {
    fullName,
    phone,
    deviceType,
    deviceName,
    problemDescription,
    preferredDate,
    preferredTimeSlot,
    address,
  } = parsed.data;

  try {
    const bookingId = generateBookingId();

    await db.insert(bookingsTable).values({
      bookingId,
      fullName,
      phone,
      deviceType,
      deviceName: deviceName ?? null,
      problemDescription,
      preferredDate,
      preferredTimeSlot,
      address,
    });

    req.log.info({ bookingId }, "Booking created");

    res.status(201).json({
      bookingId,
      message: `Your booking has been confirmed! Our team will contact you at ${phone} to confirm the appointment.`,
    });
  } catch (err) {
    logger.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Failed to create booking. Please try again." });
  }
});

export default router;
