import { Router } from "express";
import { CreateBookingBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { google } from "googleapis";

const router = Router();

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KVK-${timestamp}-${random}`;
}

router.post("/bookings", async (req, res) => {
  try {
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

    const bookingId = generateBookingId();

    console.log("--- Environment Variables Check ---");
    const requiredVars = [
      "PORT",
      "GOOGLE_SHEETS_CLIENT_EMAIL",
      "GOOGLE_SHEETS_PRIVATE_KEY",
      "GOOGLE_SHEETS_SPREADSHEET_ID"
    ];
    for (const v of requiredVars) {
      if (process.env[v]) {
        console.log(`${v}: Loaded ✓`);
      } else {
        console.log(`${v}: Missing ✗`);
      }
    }
    console.log("-----------------------------------");

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error("Google Sheets API credentials are not configured");
    }

    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    if (privateKey.includes("\\n")) {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    try {
      const client = await auth.getClient();
      // @ts-ignore - getAccessToken exists on JWT client
      if (client.getAccessToken) {
        await client.getAccessToken();
      } else {
        await auth.getAccessToken();
      }
    } catch (authErr) {
      console.error("Google Sheets Auth Error:", authErr);
      throw new Error(`Google Authentication failed: ${authErr instanceof Error ? authErr.message : String(authErr)}`);
    }

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    let spreadsheetInfo;
    try {
      spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId,
      });
    } catch (getErr) {
      console.error("Google Sheets Access Error:", getErr);
      throw new Error(`Could not access spreadsheet. Ensure ID is correct and shared with Editor permission to ${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}. Error: ${getErr instanceof Error ? getErr.message : String(getErr)}`);
    }

    const sheetName = "Bookings";
    const sheetExists = spreadsheetInfo.data.sheets?.some(s => s.properties?.title === sheetName);

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                }
              }
            }
          ]
        }
      });
    }

    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:J1`,
    });

    if (!getRes.data.values || getRes.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A1:J1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              "Booking ID",
              "Full Name",
              "Phone",
              "Device Type",
              "Device Name",
              "Problem Description",
              "Preferred Date",
              "Preferred Time Slot",
              "Address",
              "Created At",
            ],
          ],
        },
      });
    }

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:J`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              bookingId,
              fullName,
              phone,
              deviceType,
              deviceName || "",
              problemDescription,
              preferredDate,
              preferredTimeSlot,
              address,
              new Date().toISOString()
            ],
          ],
        },
      });
    } catch (appendErr: any) {
      console.error("Google API Append Error:", appendErr);
      console.error("Status Code:", appendErr.code || appendErr.status);
      console.error("Stack Trace:", appendErr.stack);
      throw new Error(`Failed to append row: ${appendErr.message}`);
    }

    req.log.info({ bookingId }, "Booking created in Google Sheets");

    res.status(201).json({
      bookingId,
      message: `Your booking has been confirmed! Our team will contact you at ${phone} to confirm the appointment.`,
    });
  } catch (err: any) {
    console.error("Google Sheets Error:", err);
    logger.error({ err }, "Failed to create booking");
    
    const isDev = process.env.NODE_ENV === "development";
    res.status(500).json({ 
      error: "Failed to create booking", 
      details: isDev ? err.message : undefined 
    });
  }
});

export default router;
