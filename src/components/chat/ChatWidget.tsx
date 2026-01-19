"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatStage, UserRequirement, Message, INITIAL_GREETING, determineRecommendation } from "@/lib/chat-agent";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // State Machine
    const [stage, setStage] = useState<ChatStage>('GREETING');
    const [requirements, setRequirements] = useState<UserRequirement>({});

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                addMessage({
                    role: 'bot',
                    content: INITIAL_GREETING,
                    type: 'options',
                    options: ["Get a Quotation", "Check Availability", "Service Support"]
                });
                setIsTyping(false);
                setStage('INTENT_DETECTION');
            }, 1000); // Fake delay
        }
    }, [isOpen]);

    const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
        setMessages(prev => [...prev, {
            ...msg,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now()
        }]);
    };

    const handleUserResponse = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        addMessage({ role: 'user', content: text });
        setInputValue("");
        setIsTyping(true);

        // Process logic with delay
        setTimeout(() => {
            processAgentLogic(text);
            setIsTyping(false);
        }, 1200);
    };

    const processAgentLogic = (input: string) => {
        // This is the core "Agent" logic from the Prompt
        const lowerInput = input.toLowerCase();

        switch (stage) {
            case 'CHECK_AVAILABILITY_INPUT':
                // Extract number from input
                const kvaMatch = input.match(/\d+/);
                if (kvaMatch) {
                    const kva = parseInt(kvaMatch[0]);
                    if (kva >= 5 && kva <= 250) {
                        addMessage({ role: 'bot', content: `Great news! We have ${kva}kVA generators available in stock. Would you like to see the specifications or get a quote?` });
                        setStage('INTENT_DETECTION'); // Or custom flow
                    } else {
                        addMessage({ role: 'bot', content: `I apologize, but we currently only stock generators between 5kVA and 250kVA. Yours is ${kva}kVA. Would you like us to arrange a special order?` });
                        setStage('COMPLETED');
                    }
                } else {
                    addMessage({ role: 'bot', content: "I didn't catch the number. Please enter the capacity in kVA (e.g., 25)." });
                }
                break;

            case 'INTENT_DETECTION':
                if (lowerInput.includes('quote') || lowerInput.includes('price') || lowerInput.includes('buy')) {
                    setRequirements(prev => ({ ...prev, intent: 'QUOTATION' }));
                } else {
                    setRequirements(prev => ({ ...prev, intent: 'BROWSING' }));
                }

                addMessage({
                    role: 'bot',
                    content: "Excellent choice. We specialize in reliable power backup for critical operations. To recommend the best fit, could you tell me where this generator will be used? (e.g., Factory, Hospital, Residential Tower)"
                });
                setStage('DISCOVERY_APPLICATION');
                break;

            case 'DISCOVERY_APPLICATION':
                setRequirements(prev => ({ ...prev, application: input }));
                addMessage({
                    role: 'bot',
                    content: "Noted. Identifying the right load is crucial. Do you have a specific capacity in mind (e.g., 62.5 kVA, 125 kVA)? Or just a rough estimate?"
                });
                setStage('DISCOVERY_CAPACITY');
                break;

            case 'DISCOVERY_CAPACITY':
                setRequirements(prev => ({ ...prev, capacity: input }));
                addMessage({
                    role: 'bot',
                    content: "Thanks. Lastly, which city or area will this be installed in?"
                });
                setStage('DISCOVERY_LOCATION');
                break;

            case 'DISCOVERY_LOCATION':
                const newReq = { ...requirements, location: input };
                setRequirements(newReq);

                // Agent 3: Recommendation
                const recommendation = determineRecommendation(newReq);
                addMessage({ role: 'bot', content: recommendation });

                setTimeout(() => {
                    addMessage({
                        role: 'bot',
                        content: "I can arrange a formal technical proposal for you to review. Shall we proceed?"
                    });
                    setStage('UNKNOWN_CAPTURE_PREP'); // Intermediate
                }, 1000);

                setStage('UNKNOWN_CAPTURE_PREP'); // Wait for user confirmation
                break;

            case 'UNKNOWN_CAPTURE_PREP':
                // User responds to "Shall we proceed?"
                if (lowerInput.includes('no') || lowerInput.includes('cancel')) {
                    addMessage({ role: 'bot', content: "Understood. Feel free to browse our products section in the meantime!" });
                    setStage('COMPLETED');
                } else {
                    // Assume Yes/Proceed
                    addMessage({ role: 'bot', content: "Great. May I start with your **name**?" });
                    setStage('LEAD_CAPTURE_NAME');
                }
                break;

            case 'LEAD_CAPTURE_NAME':
                setRequirements(prev => ({ ...prev, contactName: input }));
                addMessage({ role: 'bot', content: "Thanks. Could you please share your phone number so our team can reach out?" });
                setStage('LEAD_CAPTURE_PHONE');
                break;



            case 'LEAD_CAPTURE_PHONE':
                setRequirements(prev => ({ ...prev, contactPhone: input }));
                addMessage({ role: 'bot', content: "Perfect. I've noted your requirements. Our sales team will contact you shortly. Thank you for choosing Urjaa Tech!" });
                setStage('COMPLETED');

                // Submit Data
                const finalData = {
                    ...requirements,
                    contactPhone: input,
                    source: 'AI Chat Agent'
                };
                console.log("LEAD CAPTURED:", finalData);

                // Send to API
                fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData)
                }).catch(err => console.error("Failed to submit lead:", err));
                break;

            case 'COMPLETED':
                addMessage({ role: 'bot', content: "Is there anything else I can help you with?" });
                // Optional: Reset to intent detection if they have new q
                break;

            default:
                break;
        }
    };

    // Listen for custom event to trigger availability check
    useEffect(() => {
        const handleAvailabilityCheck = () => {
            console.log("DEBUG: Event 'trigger-availability-check' received in ChatWidget!");
            setIsOpen(true);
            // Reset if needed, or just append
            addMessage({ role: 'bot', content: "To check availability, please enter the generator capacity you are looking for (in kVA). Range: 5kVA - 250kVA." });
            setStage('CHECK_AVAILABILITY_INPUT');
        };

        window.addEventListener('trigger-availability-check', handleAvailabilityCheck);
        return () => window.removeEventListener('trigger-availability-check', handleAvailabilityCheck);
    }, []);

    return (
        <>
            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 transition-all duration-300 bg-urjaa-orange hover:bg-urjaa-orange-hover",
                    isOpen && "rotate-90 scale-0"
                )}
            >
                <MessageCircle className="h-7 w-7 text-white" />
            </Button>

            {/* Main Chat Window */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
                    isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="bg-urjaa-navy p-4 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                            <Bot className="h-6 w-6 text-urjaa-orange" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-base">Urjaa Assistant</h3>
                            <p className="text-xs text-blue-200 flex items-center gap-1">
                                <span className="block h-2 w-2 rounded-full bg-green-500"></span> Online
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Messages Field */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full",
                                msg.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-urjaa-orange text-white rounded-tr-none"
                                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    {stage === 'INTENT_DETECTION' && messages.length < 3 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                            {["Get a Quote", "Browse Models", "Service Support"].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => handleUserResponse(opt)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-full text-xs font-medium border border-slate-200 transition-colors"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        onSubmit={(e) => { e.preventDefault(); handleUserResponse(inputValue); }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-urjaa-navy-light/20 text-slate-800 placeholder:text-slate-400"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!inputValue.trim() || isTyping}
                            className="bg-urjaa-navy hover:bg-urjaa-navy-light h-10 w-10 rounded-full shrink-0"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
