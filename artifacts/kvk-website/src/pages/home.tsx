import { motion } from "framer-motion";
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const services = [
    { title: "Desktop Repair", icon: Monitor, price: "499" },
    { title: "Laptop Repair", icon: Laptop, price: "399" },
    { title: "SSD Upgrade", icon: HardDrive, price: "799" },
    { title: "RAM Upgrade", icon: Cpu, price: "299" },
    { title: "Virus Removal", icon: ShieldAlert, price: "199" },
    { title: "Windows Install", icon: Terminal, price: "299" },
    { title: "Data Recovery", icon: Database, price: "999" },
    { title: "Custom PC Build", icon: Wrench, price: "4999" },
  ];

  const reviews = [
    { name: "Rahul S.", text: "Excellent service! Fixed my MacBook display issue in just 2 days.", rating: 5, initials: "RS" },
    { name: "Priya M.", text: "Upgraded my old laptop with an SSD. It feels brand new now. Highly recommended.", rating: 5, initials: "PM" },
    { name: "Karthik V.", text: "Very transparent pricing and professional behavior. They recovered all my lost data.", rating: 5, initials: "KV" },
    { name: "Sneha R.", text: "Got a custom PC built for video editing. The cable management is flawless.", rating: 5, initials: "SR" },
    { name: "Aditya K.", text: "Quick diagnosis and genuine parts used for my Dell laptop repair.", rating: 5, initials: "AK" },
    { name: "Vikram Reddy", text: "The best computer service center in Hastinapuram. Very knowledgeable staff.", rating: 5, initials: "VR" },
  ];

  return (
    <div className="w-full">
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

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/20 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Premium Service Center</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Expert Care for Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-blue-600">Premium Devices</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Professional computer and desktop repair services with transparent pricing and expert technicians.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-slot">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all">
                  Book Repair
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-border hover:bg-secondary/80 backdrop-blur-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { value: "5000+", label: "Happy Clients" },
            { value: "Certified", label: "Expert Technicians" },
            { value: "Free", label: "Diagnostics" },
            { value: "90 Days", label: "Warranty" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="bg-secondary/40 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-colors shadow-lg shadow-black/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Brands Section */}
      <section className="py-20 bg-background/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Brands We Repair</h2>
            <p className="text-muted-foreground">Expertise across all major manufacturers</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {[
              { icon: SiApple, name: "Apple" },
              { icon: SiDell, name: "Dell" },
              { icon: SiLenovo, name: "Lenovo" },
              { icon: SiHp, name: "HP" },
              { icon: SiAsus, name: "Asus" },
              { icon: SiAcer, name: "Acer" },
            ].map((brand, i) => (
              <motion.div key={i} variants={fadeInUp} className="group flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-2xl bg-secondary/30 border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300">
                  <brand.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{brand.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Precision repairs for every issue.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full bg-secondary/20 border-border/50 hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">From </span>
                        <span className="font-bold text-foreground">₹{service.price}</span>
                      </div>
                      <Link href="/book-slot" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 group/link">
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
      <section id="reviews" className="py-24 bg-secondary/10 border-y border-border/30 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Client Satisfaction</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-1 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">4.9</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">5000+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Repairs Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">98%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>

          <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex gap-6 animate-[scroll_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
              {[...reviews, ...reviews].map((review, i) => (
                <Card key={i} className="w-[350px] shrink-0 bg-background border-border/50 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-lg">
                        {review.initials}
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="flex text-yellow-500 text-sm">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star key={j} className="fill-current w-4 h-4" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact & Map */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Ready to fix your device? Drop us a message or visit our service center.</p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-muted-foreground">9705551090</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div className="text-muted-foreground">136 Flat Number, Venkateshwara Colony Phase 2, Hastinapuram, Ranga Reddy - 500079</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Business Hours</div>
                    <div className="text-muted-foreground">Mon-Sat: 9am - 7pm<br/>Sun: 10am - 5pm</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input placeholder="Name" required className="bg-secondary/20" data-testid="input-contact-name" />
                  </div>
                  <div className="space-y-2">
                    <Input type="email" placeholder="Email" required className="bg-secondary/20" data-testid="input-contact-email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="How can we help?" rows={4} required className="bg-secondary/20 resize-none" data-testid="input-contact-message" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" data-testid="button-submit-contact">Send Message</Button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border h-[500px] relative"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.571477755532!2d78.5447171!3d17.3361427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba266baee2e55%3A0xc3ec5c4d284a1e94!2sHastinapuram%2C%20Hyderabad%2C%20Telangana%20500070!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="filter invert-[90%] hue-rotate-180 contrast-80 grayscale opacity-80"
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
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
