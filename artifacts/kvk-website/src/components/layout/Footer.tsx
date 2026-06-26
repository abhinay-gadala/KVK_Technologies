export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 py-16 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1778738164/IMG-20260514-WA0000_x718vq.jpg"
              alt="KVK Technologies Logo"
              className="h-10 w-auto rounded-none grayscale opacity-50"
            />
            <span className="font-medium text-lg tracking-[0.2em] uppercase text-white">
              KVK <span className="font-light text-white/50">Tech</span>
            </span>
          </div>
          <div className="text-[10px] tracking-widest uppercase text-white/40 text-center md:text-left leading-relaxed">
            <p>136 Flat Number, Venkateshwara Colony Phase 2</p>
            <p>Hastinapuram, Ranga Reddy - 500079</p>
          </div>
          <div className="text-[10px] tracking-widest uppercase text-white/40">
            &copy; {new Date().getFullYear()} KVK. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
