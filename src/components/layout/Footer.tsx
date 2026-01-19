import Link from "next/link";
import { Zap, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-urjaa-navy-dark border-t border-white/5 py-12 md:py-16 text-slate-400">
            <div className="container mx-auto px-4 sm:px-8 grid gap-12 md:grid-cols-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-urjaa-orange text-white">
                            <Zap className="h-5 w-5 fill-current" />
                        </div>
                        <span className="text-lg font-bold">URJAA TECH</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-[280px]">
                        Authorized dealership for Kubota generators. Powering industries with reliable energy solutions.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-6">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Home</Link></li>
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Products</Link></li>
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Services</Link></li>
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-6">Brands</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Kubota Gensets</Link></li>
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Spare Parts</Link></li>
                        <li><Link href="#" className="hover:text-urjaa-orange transition-colors">Maintenance</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-6">Contact</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-urjaa-orange shrink-0" />
                            <span>123 Industrial Area, Pune, Maharashtra, India</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-urjaa-orange shrink-0" />
                            <span>+91-75592 79059</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-urjaa-orange shrink-0" />
                            <span>Urjaatechpowersolution@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-white/5 text-center text-xs">
                © {new Date().getFullYear()} Urjaa Tech and Power Solutions. All rights reserved.
            </div>
        </footer>
    );
}
