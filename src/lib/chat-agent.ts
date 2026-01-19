export type ChatStage =
    | 'GREETING'
    | 'INTENT_DETECTION'
    | 'DISCOVERY_APPLICATION'
    | 'DISCOVERY_CAPACITY'
    | 'DISCOVERY_LOCATION'
    | 'RECOMMENDATION'
    | 'LEAD_CAPTURE_NAME'
    | 'LEAD_CAPTURE_PHONE'
    | 'UNKNOWN_CAPTURE_PREP'
    | 'CHECK_AVAILABILITY_INPUT' // New stage for 5-250kVA check
    | 'COMPLETED';

export interface UserRequirement {
    intent?: 'BROWSING' | 'QUOTATION' | 'URGENT' | 'COMPARING';
    application?: string;
    capacity?: string;
    location?: string;
    recommendedBrand?: 'KUBOTA';
    contactName?: string;
    contactPhone?: string;
    contactDetails?: string;
}

export interface Message {
    id: string;
    role: 'bot' | 'user';
    content: string;
    type?: 'text' | 'options';
    options?: string[];
    timestamp: number;
}

export const INITIAL_GREETING = "Welcome to Urjaa Tech & Power Solutions. I’m your virtual power consultant. How can I assist you today?";

export const KUBOTA_KEYWORDS = ['silent', 'quiet', 'compact', 'small', 'fuel efficient', 'low noise'];

export function determineRecommendation(req: UserRequirement): string {
    // Universal Recommendation for Kubota
    return "Based on your requirements, I highly recommend our Kubota series. It offers renowned Japanese engineering, superior fuel efficiency, and compact design suitable for both industrial and residential needs.";
}
