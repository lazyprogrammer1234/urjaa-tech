import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Create a structured log object for console persistence (as per requirements)
        const leadRecord = {
            timestamp: new Date().toISOString(),
            source: body.source || 'Website',
            name: body.contactName,
            company: body.company || 'N/A',
            phone: body.contactPhone,
            email: body.email || 'N/A',
            capacity: body.capacity || 'N/A',
            location: body.location || 'N/A',
            details: body.application || body.intent
        };

        // Log to console (Persistent in Vercel Logs)
        console.log("----------------------------------------");
        console.log("🔔 NEW LEAD CAPTURED:");
        console.log(JSON.stringify(leadRecord, null, 2));
        console.log("----------------------------------------");

        // Check for google credentials
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            // Only log if missing
            return NextResponse.json({ success: true, message: "Lead logged to console" });
        }

        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0]; // use the first sheet

        // Append row
        await sheet.addRow({
            Date: leadRecord.timestamp,
            Name: leadRecord.name,
            Company: leadRecord.company,
            Phone: leadRecord.phone,
            Email: leadRecord.email,
            Capacity: leadRecord.capacity,
            Location: leadRecord.location,
            Details: leadRecord.details,
            Source: leadRecord.source
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error processing lead:", error);
        return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
    }
}
