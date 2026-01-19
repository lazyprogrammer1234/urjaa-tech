"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeadCaptureForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        kva: "",
        location: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate/Real network request
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contactName: formData.name,
                    company: formData.company,
                    contactPhone: formData.phone,
                    email: formData.email,
                    capacity: formData.kva,
                    location: formData.location,
                    source: 'Hero Form'
                })
            });

            if (res.ok) {
                setSuccess(true);
                setFormData({ name: "", company: "", phone: "", email: "", kva: "", location: "" });
                setTimeout(() => setSuccess(false), 5000); // Reset success after 5s
            }
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-6 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Get a Free Consultation</h3>
                <p className="text-blue-100/80 text-sm">Fill out the details below and our experts will contact you.</p>
            </div>

            {success ? (
                <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in">
                    <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">Thank You!</h4>
                        <p className="text-blue-100">We have received your request.</p>
                    </div>
                    <Button variant="outline" onClick={() => setSuccess(false)} className="mt-4 border-white/20 text-white hover:bg-white/10">
                        Send Another
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="name" className="text-xs font-medium text-blue-100 ml-1">Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="company" className="text-xs font-medium text-blue-100 ml-1">Company</label>
                            <input
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="phone" className="text-xs font-medium text-blue-100 ml-1">Phone</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-xs font-medium text-blue-100 ml-1">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="kva" className="text-xs font-medium text-blue-100 ml-1">Required kVA</label>
                            <input
                                required
                                name="kva"
                                value={formData.kva}
                                onChange={handleChange}
                                placeholder="e.g. 62.5"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="location" className="text-xs font-medium text-blue-100 ml-1">Location</label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City/Area"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-urjaa-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-urjaa-primary hover:bg-urjaa-primary-dark text-white font-bold h-12 mt-2 shadow-lg shadow-urjaa-primary/25"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Free Consultation"}
                    </Button>
                </form>
            )}
        </div>
    );
}
