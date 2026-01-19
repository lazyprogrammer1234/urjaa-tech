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
    recommendedBrand?: 'KUBOTA' | 'MAHINDRA' | 'BOTH';
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

export const INITIAL_GREETING = "Hi! Tell us your power needs and we’ll guide you.";

export const KUBOTA_KEYWORDS = ['silent', 'quiet', 'compact', 'small', 'fuel efficient', 'low noise'];
export const MAHINDRA_KEYWORDS = ['heavy', 'factory', 'industrial', 'large', 'continuous', 'robust'];

export function determineRecommendation(req: UserRequirement): string {
    // Simple heuristic logic
    const text = (req.application + " " + req.capacity).toLowerCase();

    const scores = { kubota: 0, mahindra: 0 };

    KUBOTA_KEYWORDS.forEach(k => { if (text.includes(k)) scores.kubota++; });
    MAHINDRA_KEYWORDS.forEach(k => { if (text.includes(k)) scores.mahindra++; });

    if (scores.kubota > scores.mahindra) return "Based on your need for quiet and compact power, I highly recommend our **Kubota** series. They are Japanese-engineered for silence and efficiency.";
    if (scores.mahindra > scores.kubota) return "For your heavy-duty industrial requirements, our **Shyam Global (Mahindra)** generators are the best fit. They offer robust performance and low maintenance.";

    return "We have excellent options from both **Kubota** and **Mahindra**. Kubota is great for silent operation, while Mahindra is a workhorse for heavy loads.";
}
