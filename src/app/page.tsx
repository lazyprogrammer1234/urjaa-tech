import { Button } from "@/components/ui/button";
import { FindGeneratorButton } from "@/components/home/FindGeneratorButton";
import { ContactSalesButton } from "@/components/home/ContactSalesButton";
import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
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
          <ArrowRight className="h-8 w-8 rotate-90" />
        </div>
      </section>

      {/* Hero Section */}
      <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="container relative z-10 px-4 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Text */}
              <div className="text-center lg:text-left pt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 border border-slate-300 text-xs font-semibold text-slate-700 mb-8 mx-auto lg:mx-0 tracking-wide uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-urjaa-accent"></span>
                  </span>
                  Authorized Industrial Dealer
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-slate-900">
                  Powering Industries, <br />
                  <span className="text-urjaa-accent">Reliably & Responsibly.</span>
                </h1>

                <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                  We provide certified, high-efficiency power generation solutions for businesses that cannot afford downtime. Partner with engineering experts who understand your load requirements.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <ContactSalesButton size="lg" className="h-12 px-8 text-base bg-urjaa-navy hover:bg-urjaa-navy-light text-white rounded-md shadow-sm">
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

        {/* Brands Section */}
        <section id="products" className="py-24 bg-slate-50">
          <div className="container px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-urjaa-navy-dark mb-4">Trusted Power Partners</h2>
              <p className="text-slate-600">We offer certified generators from the world's most reliable manufacturers.</p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Kubota Card */}
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#E54817] z-10"></div> {/* Kubota Orange */}

                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <div className="mb-8 flex flex-col items-start gap-6">
                      <div className="relative h-16 w-48 shrink-0">
                        <img src="/kubota-logo.jpg" alt="Escorts Kubota Limited" className="h-full w-full object-contain object-left" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Kubota Gensets</h3>
                        <p className="text-sm font-medium text-[#E54817]">Japanese Engineering Excellence</p>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      Compact, quiet, and fuel-efficient diesel generators perfect for commercial spaces and noise-sensitive areas. Known for legendary durability.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {["Low Noise Levels", "Compact Design", "High Fuel Economy", "CPCB IV+ Compliant"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-[#E54817]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="https://enginebusiness.escortskubota.com/ekl-engines/gensets" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto inline-block">
                      <Button variant="outline" className="w-full border-slate-200 hover:border-[#E54817] hover:text-[#E54817]">
                        View Kubota Models <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Poster Image */}
                  <div className="relative h-full min-h-[400px] bg-slate-100 md:rounded-r-2xl overflow-hidden">
                    <img
                      src="/kubota-final.jpg"
                      alt="Kubota Generators"
                      className="absolute inset-0 w-full h-full object-fill md:object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
          <div className="container px-4 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-urjaa-navy-dark leading-tight">
                  Why Industry Leaders <br />
                  Trust <span className="text-urjaa-orange">Urjaa Tech</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We don't just sell generators; we provide guaranteed peace of mind. Our team of experts ensures you get the exact power solution your business needs, backed by stellar support.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Authorized Dealership</h4>
                      <p className="text-slate-500 mt-1">Direct from manufacturer. 100% genuine parts and warranties.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-urjaa-orange">
                      <Factory className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Tailored Solutions</h4>
                      <p className="text-slate-500 mt-1">Expert assessment of your load requirements to prevent overspending.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Reliable Support</h4>
                      <p className="text-slate-500 mt-1">Dedicated service team to keep your operations running 24/7.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Gallery */}
              <div className="relative grid grid-cols-2 gap-4 mt-12 lg:mt-0">
                <div className="aspect-[3/4] rounded-2xl bg-white overflow-hidden relative shadow-lg transform translate-y-8 border-4 border-white">
                  <Image
                    src="/generator.png"
                    alt="Industrial Generator Installation"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl bg-white overflow-hidden relative shadow-lg transform -translate-y-8 border-4 border-white">
                  <Image
                    src="/generator-2.jpg"
                    alt="Soundproof Generator"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] text-center z-10 w-full">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex -space-x-2 mb-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white"></div>
                      ))}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-xl">500+</span>
                      <p className="text-xs text-slate-500 font-medium">Projects Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-urjaa-navy text-white text-center">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Power Your Business?</h2>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto">Let our experts guide you to the perfect generator selection today.</p>
            <ContactSalesButton size="lg" className="bg-white text-urjaa-navy-dark hover:bg-blue-50 font-bold px-8">
              Get a Free Consultation: +91-75592 79059
            </ContactSalesButton>
          </div>
        </section>
      </div>
      );
}
