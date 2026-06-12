import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { SiApple, SiDell, SiLenovo, SiHp, SiAsus, SiAcer } from "react-icons/si";
import {
  Monitor, Laptop, HardDrive, Cpu, ShieldAlert, Terminal,
  Database, Wrench, Star, Phone, MapPin, Clock,
  Zap, Headphones, Stethoscope, UserCheck,
  Package, BadgeCheck, Timer, Truck, Shield, LifeBuoy,
  ChevronRight, ArrowRight,
} from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

/* ─── Animation Variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─── CountUp ─────────────────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = Date.now();
          const dur = 1400;
          const tick = () => {
            const t = Math.min((Date.now() - start) / dur, 1);
            setCount(Math.floor((1 - Math.pow(1 - t, 3)) * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Data ────────────────────────────────────────────────────── */
const services = [
  { title: "Desktop Repair", icon: Monitor, price: "499", desc: "Full diagnostics and hardware repair for all desktop PCs." },
  { title: "Laptop Repair", icon: Laptop, price: "399", desc: "Screen, keyboard, hinge, and motherboard repairs." },
  { title: "SSD Upgrade", icon: HardDrive, price: "799", desc: "Dramatically boost speed with a fast SSD installation." },
  { title: "RAM Upgrade", icon: Cpu, price: "299", desc: "Increase multitasking performance with extra memory." },
  { title: "Virus Removal", icon: ShieldAlert, price: "199", desc: "Deep scan and removal of malware, viruses, and spyware." },
  { title: "Windows Install", icon: Terminal, price: "299", desc: "Clean Windows installation with all drivers configured." },
  { title: "Data Recovery", icon: Database, price: "999", desc: "Recover lost files from failed or corrupted drives." },
  { title: "Custom PC Build", icon: Wrench, price: "4999", desc: "Hand-built performance PCs tailored to your needs." },
];

const reviews = [
  { name: "Rahul S.", text: "Excellent service! Fixed my MacBook display issue in just 2 days.", rating: 5, initials: "RS" },
  { name: "Priya M.", text: "Upgraded my old laptop with an SSD. It feels brand new now. Highly recommended.", rating: 5, initials: "PM" },
  { name: "Karthik V.", text: "Very transparent pricing and professional behavior. They recovered all my lost data.", rating: 5, initials: "KV" },
  { name: "Sneha R.", text: "Got a custom PC built for video editing. The cable management is flawless.", rating: 5, initials: "SR" },
  { name: "Aditya K.", text: "Quick diagnosis and genuine parts used for my Dell laptop repair.", rating: 5, initials: "AK" },
  { name: "Vikram Reddy", text: "The best computer service center in Hastinapuram. Very knowledgeable staff.", rating: 5, initials: "VR" },
  { name: "Meera T.", text: "Affordable pricing, fast turnaround, and the team kept me updated throughout.", rating: 5, initials: "MT" },
  { name: "Suresh B.", text: "Had my virus-infected PC cleaned in 3 hours. Professional and thorough work.", rating: 5, initials: "SB" },
];

const faqs = [
  { q: "How long does a repair take?", a: "Most repairs are completed within 24–48 hours. For complex issues like data recovery or motherboard repair, it may take 3–5 business days. We always provide an estimated timeline upfront." },
  { q: "Is the initial diagnosis free?", a: "Yes, we offer completely free diagnostics on all devices. You will receive a detailed report of the issue before we proceed with any repair." },
  { q: "Do you repair MacBooks and Apple devices?", a: "Absolutely. Our certified engineers have expertise in MacBook Air, MacBook Pro, iMac, and other Apple devices including screen replacement, battery, and logic board repairs." },
  { q: "Do you offer pickup and drop service?", a: "Yes, we provide a convenient doorstep pickup and drop service within the Hastinapuram and Ranga Reddy area. Contact us to schedule a pickup." },
  { q: "What warranty do you provide on repairs?", a: "All our repairs come with a 90-day warranty covering both parts and labor. If the same issue recurs within the warranty period, we fix it at no additional cost." },
  { q: "Can I track the status of my repair?", a: "Yes. Once your device is booked in, you will receive a unique Booking ID. You can call us anytime with this ID to get a real-time status update on your repair." },
];

/* ─── Component ───────────────────────────────────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [darkMap, setDarkMap] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMap(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMap(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent", description: "We'll get back to you as soon as possible." });
    (e.target as HTMLFormElement).reset();
  };

  const mapFilter = darkMap ? "invert(90%) hue-rotate(180deg) contrast(82%) grayscale(20%) opacity(75%)" : "none";

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.18),transparent)]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">Premium Service Center</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]">
              Expert Care for Your{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-blue-600">
                Premium Devices
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Professional computer and desktop repair services with transparent pricing and expert technicians.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-none mx-auto">
              <Link href="/book-slot" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-primary hover:bg-blue-600 shadow-[0_4px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.5)] transition-all" data-testid="button-hero-book">
                  Book Repair <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-white/10 hover:bg-white/5 backdrop-blur-sm" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-hero-contact">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Stats ──────────────────────────────────────────── */}
      <section className="relative z-20 -mt-12 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { value: 5000, suffix: "+", label: "Happy Clients", isNum: true },
            { staticText: "Certified", label: "Expert Technicians", isNum: false },
            { staticText: "Free", label: "Diagnostics", isNum: false },
            { value: 90, suffix: " Days", label: "Warranty", isNum: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="h-full">
              <Card className="h-full bg-secondary/60 backdrop-blur-xl border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]">
                <CardContent className="p-4 sm:p-6 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[118px]">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 leading-tight">
                    {stat.isNum && stat.value ? <CountUp target={stat.value} suffix={stat.suffix} /> : stat.staticText}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. Emergency Repair ───────────────────────────────── */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-900/30 to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(37,99,235,0.12),transparent)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/25 mb-5">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400 tracking-wide uppercase">Emergency Service</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Same Day Emergency Repair</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Critical device failure? We handle urgent repairs with same-day turnaround and dedicated technician support.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Zap, title: "Same Day Repair", desc: "Device back by end of day" },
              { icon: Headphones, title: "Priority Support", desc: "Dedicated helpline access" },
              { icon: Stethoscope, title: "Emergency Diagnosis", desc: "Instant assessment on arrival" },
              { icon: UserCheck, title: "Dedicated Technician", desc: "Assigned expert for your repair" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full text-center bg-white/[0.04] border-white/[0.07] backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
                  <CardContent className="p-4 sm:p-5 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base mb-0.5">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center">
            <Link href="/book-slot">
              <Button size="lg" className="h-12 px-8 text-base font-semibold bg-red-500 hover:bg-red-600 shadow-[0_4px_24px_rgba(239,68,68,0.35)] hover:shadow-[0_4px_32px_rgba(239,68,68,0.5)] transition-all" data-testid="button-emergency-book">
                <Zap className="mr-2 w-4 h-4" /> Book Emergency Repair
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Brands ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-y border-white/[0.05]">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Brands We Repair</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Expertise across all major manufacturers</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
            {[
              { icon: SiApple, name: "Apple" },
              { icon: SiDell, name: "Dell" },
              { icon: SiLenovo, name: "Lenovo" },
              { icon: SiHp, name: "HP" },
              { icon: SiAsus, name: "Asus" },
              { icon: SiAcer, name: "Acer" },
            ].map((brand, i) => (
              <motion.div key={i} variants={fadeUp} className="group flex flex-col items-center gap-2 w-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary/50 border border-white/[0.06] flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                  <brand.icon className="w-7 h-7 sm:w-9 sm:h-9 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{brand.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Why Choose Us ──────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need from a trusted repair partner — in one place.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Package, title: "Genuine Parts", desc: "We use only OEM and certified replacement parts, so your device performs exactly as intended." },
              { icon: BadgeCheck, title: "Certified Engineers", desc: "Our technicians are trained and certified with years of hands-on experience across all brands." },
              { icon: Timer, title: "Same Day Repair", desc: "Most standard repairs are completed within hours. Fast without compromising quality." },
              { icon: Truck, title: "Pickup & Drop", desc: "Doorstep pickup and delivery across Hastinapuram and surrounding areas — no travel required." },
              { icon: Shield, title: "90 Days Warranty", desc: "All repairs carry a 90-day warranty on both parts and labor, giving you complete peace of mind." },
              { icon: LifeBuoy, title: "Free Technical Support", desc: "Post-repair support at no extra charge. We answer your questions even after the job is done." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <Card className="h-full group bg-secondary/30 border-white/[0.06] hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300">
                  <CardContent className="p-5 sm:p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Services ───────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-24 bg-secondary/20 border-y border-white/[0.05]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Precision repairs for every issue.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((service, i) => (
              <motion.div key={i} variants={i % 2 === 0 ? fadeLeft : fadeRight} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
                <Card className="h-full group bg-background/60 border-white/[0.06] hover:border-primary/35 hover:bg-secondary/50 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-white/[0.07] flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">{service.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="text-sm">
                        <span className="text-muted-foreground">From </span>
                        <span className="font-bold text-foreground">₹{service.price}</span>
                      </div>
                      <Link href="/book-slot" className="text-sm font-semibold text-primary hover:text-blue-400 flex items-center gap-1 group/link" data-testid={`link-book-${i}`}>
                        Book Now <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. Before / After ─────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">The KVK Transformation</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">See the difference our expert technicians make on every device.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Before */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <Card className="bg-red-950/30 border-red-500/20">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Before</span>
                  </div>
                  <ul className="space-y-3">
                    {["Sluggish, unresponsive performance", "Cracked or damaged display screen", "Dust build-up causing overheating", "Random crashes and data loss risk", "Outdated, bloated operating system"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Arrow */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex items-center justify-center py-4 md:py-0">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <ArrowRight className="w-7 h-7 text-primary md:block hidden" />
                  <ArrowRight className="w-7 h-7 text-primary rotate-90 md:hidden" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider text-center">KVK Repair</span>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <Card className="bg-emerald-950/30 border-emerald-500/20">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">After</span>
                  </div>
                  <ul className="space-y-3">
                    {["Lightning-fast, smooth performance", "Crystal-clear, repaired display", "Cleaned internals, optimal airflow", "Stable system with secured data", "Fresh OS with essential drivers"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Reviews ────────────────────────────────────────── */}
      <section id="reviews" className="py-16 sm:py-24 bg-secondary/15 border-y border-white/[0.05]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Client Satisfaction</h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">4.9</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">5000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Repairs Completed</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-secondary/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-secondary/20 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 sm:gap-5 animate-[scroll_42s_linear_infinite] w-max hover:[animation-play-state:paused] px-4">
            {[...reviews, ...reviews].map((review, i) => (
              <Card key={i} className="w-[min(80vw,300px)] sm:w-[300px] md:w-[340px] shrink-0 bg-background/80 border-white/[0.07]">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{review.name}</div>
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, j) => <Star key={j} className="fill-current w-3 h-3" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm italic leading-relaxed">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know before booking your repair.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem value={`faq-${i}`} className="border border-white/[0.07] rounded-xl bg-secondary/30 px-1 overflow-hidden data-[state=open]:border-primary/25 data-[state=open]:bg-secondary/50 transition-colors">
                    <AccordionTrigger className="px-4 py-4 text-sm sm:text-base font-semibold hover:no-underline hover:text-primary text-left [&[data-state=open]]:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA Banner ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-700 to-blue-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,0,0,0.5),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Need Your Computer Repaired?
            </h2>
            <p className="text-blue-100/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book your repair today and let our certified technicians restore your device quickly and professionally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <Link href="/book-slot" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-blue-50 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all" data-testid="button-cta-book">
                  Book Repair <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:9705551090" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" data-testid="button-cta-call">
                  <Phone className="mr-2 w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 11. Contact & Map ─────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Ready to fix your device? Drop us a message or visit our service center.</p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: Phone, label: "Phone", value: "9705551090" },
                  { icon: MapPin, label: "Address", value: "136 Flat Number, Venkateshwara Colony Phase 2, Hastinapuram, Ranga Reddy - 500079" },
                  { icon: Clock, label: "Business Hours", value: "Mon–Sat: 9am – 7pm\nSun: 10am – 5pm" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">{item.label}</div>
                      <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Name" required className="bg-secondary/30 border-white/[0.07]" data-testid="input-contact-name" />
                  <Input type="email" placeholder="Email" required className="bg-secondary/30 border-white/[0.07]" data-testid="input-contact-email" />
                </div>
                <Textarea placeholder="How can we help?" rows={4} required className="bg-secondary/30 border-white/[0.07] resize-none" data-testid="input-contact-message" />
                <Button type="submit" className="w-full bg-primary hover:bg-blue-600 shadow-[0_2px_16px_rgba(37,99,235,0.3)] transition-all" data-testid="button-submit-contact">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="rounded-2xl overflow-hidden border border-white/[0.07] h-[300px] sm:h-[420px] lg:h-full min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.571477755532!2d78.5447171!3d17.3361427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba266baee2e55%3A0xc3ec5c4d284a1e94!2sHastinapuram%2C%20Hyderabad%2C%20Telangana%20500070!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: mapFilter, minHeight: "300px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KVK Technologies Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
