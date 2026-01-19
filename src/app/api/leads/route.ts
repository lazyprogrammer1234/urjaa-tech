import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


// Scoring Logic
function calculateScore(text: string): { score: number; category: 'HOT' | 'WARM' | 'COLD' } {
    let score = 50; // Base score
    const lowerText = text.toLowerCase();

    // Signal Weights
    if (lowerText.match(/builder|construction|real estate|apartment|tower/)) score += 30; // Real Estate
    if (lowerText.match(/factory|industrial|plant|manufacturing|heavy/)) score += 30; // Industrial
    if (lowerText.match(/urgent|immediate|asap|emergency|quickly/)) score += 25; // Urgency
    if (lowerText.match(/price|cost|budget|quote|rate/)) score += 20; // Budget Intent
    if (lowerText.match(/home|house|residential|villa/)) score += 10; // Residential
    if (lowerText.match(/exploring|just looking|browsing|info only/)) score -= 20; // Low Intent

    // Cap score at 100
    score = Math.min(score, 100);

    // Determine Category
    let category: 'HOT' | 'WARM' | 'COLD' = 'COLD';
    if (score >= 80) category = 'HOT';
    else if (score >= 50) category = 'WARM';

    return { score, category };
}

function generateWhatsAppReply(name: string, category: string, kva: string): string {
    const baseUrl = "https://wa.me/?text=";
    let message = "";

    if (category === 'HOT') {
        message = `Hi ${name}, I noticed your urgent requirement for a ${kva || 'generator'}. We have stock ready for immediate dispatch. When can we connect? - Urjaa Tech`;
    } else if (category === 'WARM') {
        message = `Hi ${name}, thank you for contacting Urjaa Tech. Regarding your ${kva || 'generator'} requirement - do you have a specific brand preference (Kubota/Mahindra)?`;
    } else {
        message = `Hi ${name}, thanks for reaching out. Here is our digital catalog for your reference. Let us know if you need any specific details.`;
    }

    return baseUrl + encodeURIComponent(message);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Combine all text fields for analysis
        const analysisText = `${body.company || ''} ${body.application || ''} ${body.intent || ''} ${body.capacity || ''}`;

        // Run Intelligence
        const { score, category } = calculateScore(analysisText);
        const waDraft = generateWhatsAppReply(body.contactName || 'there', category, body.capacity);

        // Create a structured log object
        const leadRecord = {
            timestamp: new Date().toISOString(),
            source: body.source || 'Website',
            name: body.contactName,
            company: body.company || 'N/A',
            phone: body.contactPhone,
            email: body.email || 'N/A',
            capacity: body.capacity || 'N/A',
            location: body.location || 'N/A',
            details: body.application || body.intent,
            // Intelligence Fields
            score: score,
            category: category,
            wa_draft: waDraft
        };

        // Log to console (Persistent in Vercel Logs)
        console.log("----------------------------------------");
        if (category === 'HOT') console.log("🔥 HOT LEAD ALERT 🔥");
        console.log("🔔 NEW LEAD CAPTURED:", JSON.stringify(leadRecord, null, 2));
        console.log("----------------------------------------");

        // Check for google credentials
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            return NextResponse.json({ success: true, message: "Lead logged (Sheet skipped)", intelligence: { score, category } });
        }

        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        // Append row with Score
        await sheet.addRow({
            Date: leadRecord.timestamp,
            Name: leadRecord.name,
            Company: leadRecord.company,
            Phone: leadRecord.phone,
            Email: leadRecord.email,
            Capacity: leadRecord.capacity,
            Location: leadRecord.location,
            Details: leadRecord.details,
            Source: leadRecord.source,
            Score: leadRecord.score,
            Category: leadRecord.category,
            WhatsApp_Draft: leadRecord.wa_draft
        });

        return NextResponse.json({ success: true, intelligence: { score, category } });

    } catch (error) {
        console.error("Error processing lead:", error);
        return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
    }
}
