import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  SiApple, SiDell, SiLenovo, SiHp, SiAsus, SiAcer
} from "react-icons/si";
import {
  Monitor, Laptop, HardDrive, Cpu, ShieldAlert, Terminal,
  Database, Wrench, Star, Phone, MapPin, Clock
} from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = Date.now();
          const duration = 1500;
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
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
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const services = [
    { title: "Desktop Repair", icon: Monitor, price: "499", desc: "Full diagnostics and hardware repair for all desktop PCs." },
    { title: "Laptop Repair", icon: Laptop, price: "399", desc: "Screen, keyboard, hinge, and motherboard repairs." },
    { title: "SSD Upgrade", icon: HardDrive, price: "799", desc: "Boost speed dramatically with a fast SSD upgrade." },
    { title: "RAM Upgrade", icon: Cpu, price: "299", desc: "Increase multitasking performance with more memory." },
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

  const mapFilter = darkMap
    ? "invert(90%) hue-rotate(180deg) contrast(80%) grayscale(20%) opacity(80%)"
    : "none";

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Luxury Electronics Lab"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/20 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Premium Service Center</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Expert Care for Your{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-blue-600">
                Premium Devices
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto px-2">
              Professional computer and desktop repair services with transparent pricing and expert technicians.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto">
              <Link href="/book-slot" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all"
                  data-testid="button-hero-book"
                >
                  Book Repair
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg border-border hover:bg-secondary/80 backdrop-blur-sm"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-contact"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="relative z-20 -mt-12 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { value: "5000", suffix: "+", label: "Happy Clients", isNum: true },
            { value: null, staticText: "Certified", label: "Expert Technicians", isNum: false },
            { value: null, staticText: "Free", label: "Diagnostics", isNum: false },
            { value: "90", suffix: " Days", label: "Warranty", isNum: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="h-full">
              <Card className="h-full bg-secondary/40 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-colors shadow-lg shadow-black/20">
                <CardContent className="p-4 sm:p-6 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] leading-tight">
                    {stat.isNum && stat.value !== null
                      ? <CountUp target={parseInt(stat.value)} suffix={stat.suffix} />
                      : stat.staticText
                    }
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Brands Section */}
      <section className="py-16 sm:py-20 bg-background/50 border-y border-border/50">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Brands We Repair</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Expertise across all major manufacturers</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 justify-items-center"
          >
            {[
              { icon: SiApple, name: "Apple" },
              { icon: SiDell, name: "Dell" },
              { icon: SiLenovo, name: "Lenovo" },
              { icon: SiHp, name: "HP" },
              { icon: SiAsus, name: "Asus" },
              { icon: SiAcer, name: "Acer" },
            ].map((brand, i) => (
              <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center gap-2 sm:gap-3 w-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary/30 border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <brand.icon className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{brand.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-16 sm:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Precision repairs for every issue.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="h-full bg-secondary/20 border-border/50 hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground flex-1 mb-4">{service.desc}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <div className="text-sm">
                        <span className="text-muted-foreground">From </span>
                        <span className="font-bold text-foreground">₹{service.price}</span>
                      </div>
                      <Link href="/book-slot" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 group/link" data-testid={`link-book-${i}`}>
                        Book Now
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Reviews Section */}
      <section id="reviews" className="py-16 sm:py-24 bg-secondary/10 border-y border-border/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Client Satisfaction</h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-4">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">4.9</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">5000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Repairs Completed</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel: intentionally full-bleed outside container */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-secondary/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-secondary/20 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-6 animate-[scroll_40s_linear_infinite] w-max hover:[animation-play-state:paused] px-4">
            {[...reviews, ...reviews].map((review, i) => (
              <Card key={i} className="w-[min(80vw,320px)] sm:w-[320px] md:w-[350px] shrink-0 bg-background border-border/50 shadow-md">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-sm sm:text-lg shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">{review.name}</div>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="fill-current w-3 h-3 sm:w-4 sm:h-4" />
                        ))}
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

      {/* 6. Contact & Map */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Ready to fix your device? Drop us a message or visit our service center.</p>

              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Phone</div>
                    <div className="text-muted-foreground">9705551090</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Address</div>
                    <div className="text-muted-foreground text-sm sm:text-base">136 Flat Number, Venkateshwara Colony Phase 2, Hastinapuram, Ranga Reddy - 500079</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Business Hours</div>
                    <div className="text-muted-foreground text-sm sm:text-base">Mon–Sat: 9am – 7pm<br />Sun: 10am – 5pm</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Name" required className="bg-secondary/20" data-testid="input-contact-name" />
                  <Input type="email" placeholder="Email" required className="bg-secondary/20" data-testid="input-contact-email" />
                </div>
                <Textarea placeholder="How can we help?" rows={4} required className="bg-secondary/20 resize-none" data-testid="input-contact-message" />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" data-testid="button-submit-contact">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl overflow-hidden border border-border h-[320px] sm:h-[420px] lg:h-[500px] relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.571477755532!2d78.5447171!3d17.3361427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba266baee2e55%3A0xc3ec5c4d284a1e94!2sHastinapuram%2C%20Hyderabad%2C%20Telangana%20500070!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: mapFilter }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KVK Technologies Location"
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
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
