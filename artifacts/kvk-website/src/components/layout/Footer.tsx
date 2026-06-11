export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1778738164/IMG-20260514-WA0000_x718vq.jpg"
              alt="KVK Technologies Logo"
              className="h-8 w-auto rounded-sm grayscale opacity-70"
            />
            <span className="font-semibold text-muted-foreground">
              KVK Technologies
            </span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>136 Flat Number, Venkateshwara Colony Phase 2</p>
            <p>Hastinapuram, Ranga Reddy - 500079</p>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KVK Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
