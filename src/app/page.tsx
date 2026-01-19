import { Button } from "@/components/ui/button";
import { ContactSalesButton } from "@/components/home/ContactSalesButton";
import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-urjaa-navy-dark relative overflow-hidden font-sans">
      {/* Intro Logo Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-white"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <video
            src="/logo-intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover md:object-contain max-w-[100vw] max-h-[100vh]"
          />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-urjaa-navy/30 animate-bounce z-20">
          <ArrowRight className="h-8 w-8 rotate-90 text-slate-400" />
        </div>
      </section>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-urjaa-navy-dark text-white pt-20">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-25">
          <img src="/logo.jpg" alt="" className="w-full h-full object-cover opacity-60 mix-blend-plus-lighter" />
        </div>

        {/* Abstract Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-urjaa-navy-dark/80 via-urjaa-navy-dark/60 to-urjaa-navy-dark/90"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Text */}
            <div className="text-center lg:text-left pt-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-urjaa-primary/10 backdrop-blur border border-urjaa-primary/20 text-xs font-semibold text-urjaa-orange-light mb-8 mx-auto lg:mx-0 tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urjaa-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-urjaa-orange"></span>
                </span>
                Authorized Industrial Dealer
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-white drop-shadow-2xl">
                Powering Industries, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-urjaa-orange-light to-urjaa-orange">Reliably & Responsibly.</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                We provide certified, high-efficiency power generation solutions for businesses that cannot afford downtime. Partner with engineering experts who understand your load requirements.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ContactSalesButton size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:border-white">
                  Schedule Site Audit
                </ContactSalesButton>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex justify-center lg:justify-end w-full">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section (Kubota) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted Power Partners</h2>
            <p className="text-slate-600">We offer certified generators from the world's most reliable manufacturers.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-urjaa-accent z-10"></div>

              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <div className="mb-8 flex flex-col items-start gap-6">
                    <div className="relative h-16 w-48 shrink-0">
                      <img src="/kubota-logo.jpg" alt="Escorts Kubota Limited" className="h-full w-full object-contain object-left" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Kubota Gensets</h3>
                      <p className="text-sm font-medium text-urjaa-accent">Japanese Engineering Excellence</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Compact, quiet, and fuel-efficient diesel generators perfect for commercial spaces and noise-sensitive areas. Known for legendary durability.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Low Noise Levels", "Compact Design", "High Fuel Economy", "CPCB IV+ Compliant"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-urjaa-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="https://enginebusiness.escortskubota.com/ekl-engines/gensets" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto inline-block">
                    <Button variant="outline" className="w-full border-slate-300 hover:border-urjaa-accent hover:text-urjaa-accent text-slate-700">
                      View Kubota Models <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="relative h-full min-h-[400px] bg-slate-50 md:rounded-r-xl overflow-hidden">
                  <img
                    src="/kubota-final.jpg"
                    alt="Kubota Generators"
                    className="absolute inset-0 w-full h-full object-cover md:object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Why Industry Leaders <br />
                Trust <span className="text-urjaa-accent">Urjaa Tech</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We don't just sell generators; we provide guaranteed peace of mind. Our team of experts ensures you get the exact power solution your business needs, backed by stellar support.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-urjaa-navy shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Certified Authenticity</h4>
                    <p className="text-slate-500 mt-1">100% genuine parts and verified warranty coverage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-urjaa-accent shadow-sm">
                    <Factory className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Tailored Solutions</h4>
                    <p className="text-slate-500 mt-1">Expert assessment of your load requirements to prevent overspending.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Reliable Support</h4>
                    <p className="text-slate-500 mt-1">Dedicated service team to keep your operations running.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Gallery */}
            <div className="relative grid grid-cols-2 gap-4 mt-12 lg:mt-0">
              <div className="aspect-[3/4] rounded-xl bg-white overflow-hidden relative shadow-lg transform translate-y-8 border border-slate-100">
                <Image
                  src="/generator.png"
                  alt="Industrial Generator Installation"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] rounded-xl bg-white overflow-hidden relative shadow-lg transform -translate-y-8 border border-slate-100">
                <Image
                  src="/generator-2.jpg"
                  alt="Soundproof Generator"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-urjaa-navy text-white text-center">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Power Your Business?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">Let our experts guide you to the perfect generator selection today.</p>
          <ContactSalesButton size="lg" className="bg-white text-urjaa-navy hover:bg-slate-100 font-bold px-8 text-base">
            Get a Free Consultation: +91-75592 79059
          </ContactSalesButton>
        </div>
      </section>
    </div>
  );
}
