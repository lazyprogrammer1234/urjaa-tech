import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-urjaa-navy/80 backdrop-blur-md supports-[backdrop-filter]:bg-urjaa-navy/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">Urjaa Tech</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {["Home", "Products", "Services", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Button className="hidden md:inline-flex bg-urjaa-orange hover:bg-urjaa-orange-hover text-white">
                        Get Quote
                    </Button>
                    <button className="md:hidden text-white">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
