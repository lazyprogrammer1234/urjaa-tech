"use client";

import { Button } from "@/components/ui/button";

export function FindGeneratorButton() {
    const handleClick = () => {
        console.log("DEBUG: FindGeneratorButton clicked. Dispatching 'trigger-availability-check'");
        // Dispatch custom event to open chat
        window.dispatchEvent(new Event('trigger-availability-check'));
    };

    return (
        <Button
            size="lg"
            onClick={handleClick}
            className="h-14 px-8 text-lg bg-urjaa-orange hover:bg-urjaa-orange-hover text-white shadow-xl shadow-urjaa-orange/20 border-none"
        >
            Find Your Generator
        </Button>
    );
}
