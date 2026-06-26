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

import { useLoader } from "@/components/layout/LoaderContext";

/* ─── Animation Variants ──────────────────────────────────────── */
const appleEase = [0.65, 0, 0.35, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: appleEase } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: appleEase } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: appleEase } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const heroContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const wordReveal = {
  hidden: { y: "100%", opacity: 0, rotate: 2 },
  visible: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 1.2, ease: appleEase } }
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: appleEase } }
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
  const { isLoaderDone } = useLoader();

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
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={isLoaderDone ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 2.4, ease: appleEase }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.03),transparent)]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {isLoaderDone && (
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="w-full flex flex-col items-center"
            >
              <motion.div variants={fadeScale} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-12">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-xs font-medium text-white/70 tracking-widest uppercase">Premium Service Studio</span>
              </motion.div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tighter mb-8 leading-[1.05] text-white flex flex-col items-center">
                <div className="overflow-hidden pb-2"><motion.div variants={wordReveal}>We restore</motion.div></div>
                <div className="overflow-hidden pb-4"><motion.div variants={wordReveal} className="font-bold">the future.</motion.div></div>
              </h1>

              <motion.p variants={fadeScale} className="text-lg sm:text-xl md:text-2xl text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                Masterful computer and device restoration. No compromises. Just pure precision.
              </motion.p>

              <motion.div variants={fadeScale} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto">
                <Link href="/book-slot" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-sm tracking-widest uppercase font-semibold bg-white text-black hover:bg-white/90 transition-all rounded-none" data-testid="button-hero-book">
                    Book Restoration <ArrowRight className="ml-3 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-sm tracking-widest uppercase font-medium border-white/10 text-white hover:bg-white/5 transition-all rounded-none" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-hero-contact">
                  Contact Studio
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 2. Stats ──────────────────────────────────────────── */}
      <section className="relative z-20 -mt-12 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
          {[
            { value: 5000, suffix: "+", label: "Happy Clients", isNum: true },
            { staticText: "Certified", label: "Expert Technicians", isNum: false },
            { staticText: "Free", label: "Diagnostics", isNum: false },
            { value: 90, suffix: " Days", label: "Warranty", isNum: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="h-full bg-background p-8 sm:p-12 text-center flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-5xl font-light text-white mb-2 tracking-tighter">
                {stat.isNum && stat.value ? <CountUp target={stat.value} suffix={stat.suffix} /> : stat.staticText}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-medium mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. Emergency Repair ───────────────────────────────── */}
      <section className="py-12 sm:py-20 relative overflow-hidden border-y border-white/5 bg-white/[0.01]">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">Urgent Restoration</h2>
            <p className="text-white/50 max-w-xl mx-auto font-light text-lg">Critical failure? We handle emergency repairs with zero compromise on precision.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-white/5 mb-16 border border-white/5">
            {[
              { icon: Zap, title: "Same Day", desc: "Device back by end of day" },
              { icon: Headphones, title: "Priority", desc: "Dedicated studio access" },
              { icon: Stethoscope, title: "Immediate", desc: "Instant triage on arrival" },
              { icon: UserCheck, title: "Dedicated", desc: "Assigned master tech" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-background p-8 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors">
                <item.icon className="w-6 h-6 text-white mb-6 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <div className="font-medium text-sm tracking-wide mb-2 uppercase">{item.title}</div>
                <div className="text-xs text-white/40">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center">
            <Link href="/book-slot">
              <Button size="lg" className="h-14 px-10 text-sm tracking-widest uppercase font-semibold bg-white text-black hover:bg-white/90 rounded-none transition-all" data-testid="button-emergency-book">
                Book Emergency Slot
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Brands ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 border-y border-white/[0.05]">
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
      <section className="py-12 sm:py-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">The Standard</h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg font-light">Uncompromising quality in every aspect of our process.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
            {[
              { icon: Package, title: "Genuine Parts", desc: "We use only OEM and certified replacement parts, so your device performs exactly as intended." },
              { icon: BadgeCheck, title: "Master Engineers", desc: "Our technicians are trained and certified with years of hands-on experience across all architectures." },
              { icon: Timer, title: "Rapid Turnaround", desc: "Most standard restorations are completed within hours. Fast without compromising precision." },
              { icon: Truck, title: "Studio Transport", desc: "Secure pickup and delivery across Hastinapuram and surrounding areas — zero friction." },
              { icon: Shield, title: "90 Days Warranty", desc: "All restorations carry a 90-day warranty on both parts and labor, ensuring complete peace of mind." },
              { icon: LifeBuoy, title: "Continuous Support", desc: "Post-restoration support at no extra charge. We stand by our work indefinitely." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-background p-10 sm:p-12 text-left group hover:bg-white/[0.02] transition-all">
                <item.icon className="w-6 h-6 text-white mb-8 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <h3 className="font-medium text-sm uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Services ───────────────────────────────────────── */}
      <section id="services" className="py-12 sm:py-20 border-y border-white/5">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-16 sm:mb-24 flex flex-col sm:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">Our Services</h2>
              <p className="text-lg text-white/50 font-light max-w-md">Comprehensive restoration protocols for every technical anomaly.</p>
            </div>
            <Link href="/book-slot" className="text-sm tracking-widest uppercase font-semibold text-white flex items-center gap-2 group/link border-b border-white/20 pb-1 hover:border-white transition-all">
              View All Services <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="flex flex-col border-t border-white/10">
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Link href="/book-slot" className="group block">
                  <div className="py-8 sm:py-10 border-b border-white/10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 hover:bg-white/[0.02] transition-colors px-6 sm:px-4 sm:-mx-4 rounded-none">
                    <div className="text-sm font-mono text-white/30 w-12 shrink-0">0{i + 1}</div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-2 group-hover:text-white transition-colors">{service.title}</h3>
                      <p className="text-sm text-white/40 font-light max-w-xl">{service.desc}</p>
                    </div>
                    <div className="flex items-center gap-8 justify-between sm:justify-end sm:w-48 shrink-0 mt-4 sm:mt-0">
                      <div className="text-sm font-medium tracking-wide">₹{service.price}</div>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Before / After ─────────────────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">The KVK Standard</h2>
            <p className="text-white/50 max-w-xl mx-auto font-light text-lg">Observe the absolute contrast of our interventions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] items-start bg-white/10 border border-white/10">
            {/* Before */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="h-full">
              <div className="bg-background h-full p-10 sm:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 bg-white/30" />
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Before</span>
                </div>
                <ul className="space-y-5">
                  {["Sluggish, unresponsive performance", "Cracked or damaged display screen", "Dust build-up causing overheating", "Random crashes and data loss risk", "Outdated, bloated operating system"].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-white/40 font-light">
                      <span className="w-px h-4 bg-white/20 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="h-full bg-background flex flex-col items-center justify-center py-12 md:py-0 border-y md:border-y-0 md:border-x border-white/10">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                  <ArrowRight className="w-6 h-6 text-white md:block hidden opacity-50" strokeWidth={1} />
                  <ArrowRight className="w-6 h-6 text-white rotate-90 md:hidden opacity-50" strokeWidth={1} />
                </div>
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] text-center">Intervention</span>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="h-full">
              <div className="bg-background h-full p-10 sm:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 bg-white" />
                  <span className="text-xs font-semibold text-white uppercase tracking-widest">After</span>
                </div>
                <ul className="space-y-5">
                  {["Lightning-fast, smooth performance", "Crystal-clear, repaired display", "Cleaned internals, optimal airflow", "Stable system with secured data", "Fresh OS with essential drivers"].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-white/80 font-light">
                      <span className="w-px h-4 bg-white mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Reviews ────────────────────────────────────────── */}
      <section id="reviews" className="py-12 sm:py-20 border-y border-white/5">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-8">Client Satisfaction</h2>
            <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
              <div>
                <div className="text-4xl sm:text-5xl font-light mb-2">4.9</div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-light mb-2">5000+</div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Restorations</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-light mb-2">98%</div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 sm:gap-6 animate-[scroll_50s_linear_infinite] w-max hover:[animation-play-state:paused] px-4">
            {[...reviews, ...reviews].map((review, i) => (
              <div key={i} className="w-[min(85vw,360px)] shrink-0 bg-white/[0.02] border border-white/[0.05] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-mono text-white/80 text-xs shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-medium text-sm tracking-wide">{review.name}</div>
                    <div className="flex text-white mt-1 gap-0.5">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} className="fill-current w-3 h-3 opacity-80" />)}
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm font-light leading-loose">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">Inquiries</h2>
            <p className="text-white/50 font-light">Clarity before execution.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <Accordion type="single" collapsible className="space-y-0 border-t border-white/10">
              {faqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem value={`faq-${i}`} className="border-b border-white/10 px-0">
                    <AccordionTrigger className="px-2 py-6 text-base sm:text-lg font-light tracking-wide hover:no-underline hover:text-white/70 text-left [&[data-state=open]]:text-white transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-2 pb-8">
                      <p className="text-base text-white/50 font-light leading-relaxed max-w-3xl">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA Banner ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-white/[0.02]" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-white mb-6 leading-tight">
              Initiate Repair.
            </h2>
            <p className="text-white/50 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-light">
              Reserve your slot. Our master technicians are ready to restore your device to absolute perfection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto">
              <Link href="/book-slot" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-12 text-sm tracking-widest uppercase font-semibold bg-white text-black hover:bg-white/90 rounded-none transition-all" data-testid="button-cta-book">
                  Book Reservation
                </Button>
              </Link>
              <a href="tel:9705551090" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-12 text-sm tracking-widest uppercase font-medium border-white/20 text-white hover:bg-white/5 rounded-none transition-all" data-testid="button-cta-call">
                  Call Studio
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 11. Contact & Map ─────────────────────────────────── */}
      <section id="contact" className="py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4">Studio Contact</h2>
              <p className="text-white/50 mb-12 font-light">Reach out for direct technical inquiries.</p>
              
              <div className="space-y-8 mb-16">
                {[
                  { icon: Phone, label: "Direct Line", value: "9705551090" },
                  { icon: MapPin, label: "Headquarters", value: "136 Flat Number, Venkateshwara Colony Phase 2,\nHastinapuram, Ranga Reddy - 500079" },
                  { icon: Clock, label: "Operational Hours", value: "Mon–Sat: 9am – 7pm\nSun: 10am – 5pm" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="mt-1 opacity-50 shrink-0">
                      <item.icon className="w-5 h-5 text-white" strokeWidth={1} />
                    </div>
                    <div>
                      <div className="font-medium text-xs tracking-widest uppercase mb-1">{item.label}</div>
                      <div className="text-white/60 text-sm leading-relaxed whitespace-pre-line font-light">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input placeholder="Name" required className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light" data-testid="input-contact-name" />
                  <Input type="email" placeholder="Email" required className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light" data-testid="input-contact-email" />
                </div>
                <Textarea placeholder="Inquiry details..." rows={1} required className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light resize-none min-h-[40px] pt-2" data-testid="input-contact-message" />
                <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-white/90 transition-all uppercase tracking-widest text-xs font-bold rounded-none mt-4" data-testid="button-submit-contact">
                  Transmit Request
                </Button>
              </form>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="h-[400px] sm:h-[500px] lg:h-full min-h-[400px] border border-white/10 p-2 bg-white/[0.02]">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-background mix-blend-color pointer-events-none z-10" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.571477755532!2d78.5447171!3d17.3361427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba266baee2e55%3A0xc3ec5c4d284a1e94!2sHastinapuram%2C%20Hyderabad%2C%20Telangana%20500070!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(120%) brightness(80%)", minHeight: "400px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KVK Technologies Location"
                  className="relative z-0"
                />
              </div>
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
