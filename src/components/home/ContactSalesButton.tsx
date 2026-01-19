"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Phone, Mail, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSalesButtonProps extends ButtonProps {
    className?: string;
}

export function ContactSalesButton({ className, ...props }: ContactSalesButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const contactDetails = {
        email: "Urjaatechpowersolution@gmail.com",
        phone: "+91-75592 79059"
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className={cn("", className)}
                {...props}
            >
                {props.children || "Contact Sales"}
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200 border border-slate-100">
                        {/* Header */}
                        <div className="bg-urjaa-navy p-6 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-urjaa-primary/20 rounded-fullblur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-urjaa-accent/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Get in Touch 👋</h2>
                            <p className="text-blue-100 text-sm relative z-10">We're ready to power your business!</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">

                            {/* Phone Tile */}
                            <div
                                onClick={() => handleCopy(contactDetails.phone, 'phone')}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-urjaa-primary/30 hover:bg-green-50/50 cursor-pointer transition-all active:scale-[0.98]"
                            >
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Call Us 📞</p>
                                    <p className="text-lg font-bold text-slate-900 font-mono tracking-tight">{contactDetails.phone}</p>
                                </div>
                                <div className="text-slate-400">
                                    {copied === 'phone' ? <Check className="h-5 w-5 text-green-600" /> : <span className="text-xs bg-white px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">Copy</span>}
                                </div>
                            </div>

                            {/* Email Tile */}
                            <div
                                onClick={() => handleCopy(contactDetails.email, 'email')}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-urjaa-accent/30 hover:bg-blue-50/50 cursor-pointer transition-all active:scale-[0.98]"
                            >
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Email Us 📧</p>
                                    <p className="text-sm font-bold text-slate-900 truncate" title={contactDetails.email}>{contactDetails.email}</p>
                                </div>
                                <div className="text-slate-400">
                                    {copied === 'email' ? <Check className="h-5 w-5 text-green-600" /> : <span className="text-xs bg-white px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">Copy</span>}
                                </div>
                            </div>

                            <div className="pt-2 text-center">
                                <p className="text-xs text-slate-400">Click on details to copy to clipboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
