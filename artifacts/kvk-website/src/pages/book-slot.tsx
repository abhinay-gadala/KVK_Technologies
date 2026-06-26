import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@workspace/api-client-react";
import { 
  BookingInputDeviceType, 
  BookingInputPreferredTimeSlot 
} from "@workspace/api-client-react";
import bookingVisual from "@/assets/images/booking-visual.png";
import { Link } from "wouter";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  deviceType: z.enum(["Desktop", "Laptop", "Other"] as const),
  deviceName: z.string().optional(),
  problemDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  preferredDate: z.date({
    required_error: "A date is required.",
  }),
  preferredTimeSlot: z.enum([
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM"
  ] as const),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
}).superRefine((data, ctx) => {
  if (!data.deviceName || data.deviceName.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Device name/model is required.`,
      path: ["deviceName"],
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

export default function BookSlot() {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      deviceType: "Desktop",
      deviceName: "",
      problemDescription: "",
      address: "",
    },
  });

  const deviceType = form.watch("deviceType");

  const onSubmit = (values: FormValues) => {
    // Map to API types
    const mappedDeviceType = values.deviceType as BookingInputDeviceType;
    // The API expects exactly the string from the enum
    const mappedTimeSlot = values.preferredTimeSlot as BookingInputPreferredTimeSlot;

    createBooking.mutate({
      data: {
        fullName: values.fullName,
        phone: values.phone,
        deviceType: mappedDeviceType,
        deviceName: values.deviceName,
        problemDescription: values.problemDescription,
        preferredDate: values.preferredDate.toISOString(),
        preferredTimeSlot: mappedTimeSlot,
        address: values.address,
      }
    }, {
      onSuccess: (data) => {
        setSuccessData({ id: data.bookingId, message: data.message });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: error.error || error.message || "An error occurred while booking.",
        });
      }
    });
  };

  if (successData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }}
          className="max-w-md w-full bg-background border border-white/10 p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/[0.02]" />
          <div className="relative z-10">
            <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8 bg-white/5">
              <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-light mb-3 tracking-tight text-white">Reservation Confirmed</h2>
            <p className="text-white/50 mb-8 font-light leading-relaxed">
              Our team will contact you at {form.getValues().phone} to coordinate the intervention.
            </p>
            
            <div className="border border-white/10 p-6 mb-10 bg-white/[0.01]">
              <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Reservation ID</div>
              <div className="text-2xl font-light text-white tracking-widest">{successData.id}</div>
            </div>

            <Link href="/">
              <Button className="w-full bg-white text-black hover:bg-white/90 rounded-none uppercase tracking-widest text-xs font-bold h-14">
                Return to Studio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-background overflow-x-hidden">
      <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-4 pt-28 pb-12 sm:px-12 sm:pt-32 lg:p-20 lg:pt-32 overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tighter mb-4 text-white">Initiate Repair</h1>
            <p className="text-white/50 text-lg font-light">Secure a dedicated slot with our master technicians.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex Thompson" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light h-10" data-testid="input-fullName" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9876543210" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light h-10" data-testid="input-phone" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Device Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus:ring-0 focus:border-white shadow-none font-light h-10" data-testid="select-deviceType">
                            <SelectValue placeholder="Select device type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border border-white/10 rounded-none">
                          <SelectItem value="Desktop" className="rounded-none focus:bg-white/10">Desktop</SelectItem>
                          <SelectItem value="Laptop" className="rounded-none focus:bg-white/10">Laptop</SelectItem>
                          <SelectItem value="Other" className="rounded-none focus:bg-white/10">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Device Model / Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. MacBook Pro, Dell XPS, PS5" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light h-10" data-testid="input-deviceName" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="problemDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs tracking-widest uppercase text-white/50">Anomaly Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please detail the specific technical anomaly..." 
                        className="resize-none bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light min-h-[80px]" 
                        data-testid="textarea-problem"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-light text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-0 text-left font-light bg-transparent border-0 border-b border-white/20 rounded-none h-10 hover:bg-transparent hover:text-white shadow-none",
                                !field.value && "text-white/40"
                              )}
                              data-testid="button-datePicker"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-30" strokeWidth={1} />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background border border-white/10 rounded-none" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTimeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase text-white/50">Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus:ring-0 focus:border-white shadow-none font-light h-10" data-testid="select-timeSlot">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border border-white/10 rounded-none">
                          <SelectItem value="9:00 AM - 11:00 AM" className="rounded-none focus:bg-white/10">09:00 - 11:00</SelectItem>
                          <SelectItem value="11:00 AM - 1:00 PM" className="rounded-none focus:bg-white/10">11:00 - 13:00</SelectItem>
                          <SelectItem value="1:00 PM - 3:00 PM" className="rounded-none focus:bg-white/10">13:00 - 15:00</SelectItem>
                          <SelectItem value="3:00 PM - 5:00 PM" className="rounded-none focus:bg-white/10">15:00 - 17:00</SelectItem>
                          <SelectItem value="5:00 PM - 7:00 PM" className="rounded-none focus:bg-white/10">17:00 - 19:00</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400 font-light text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs tracking-widest uppercase text-white/50">Location Coordinates</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter full address for pickup/service execution" 
                        className="resize-none bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white shadow-none font-light min-h-[40px]" 
                        data-testid="textarea-address"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-light text-xs" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-14 bg-white text-black hover:bg-white/90 transition-all uppercase tracking-widest text-xs font-bold rounded-none mt-8" 
                disabled={createBooking.isPending}
                data-testid="button-submit-booking"
              >
                {createBooking.isPending ? "Initiating..." : "Confirm Reservation"}
              </Button>

            </form>
          </Form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative border-l border-white/10 bg-background">
        <img 
          src={bookingVisual} 
          alt="Premium Repair Service" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
        
        <div className="absolute bottom-16 left-16 right-16 bg-white/[0.02] backdrop-blur-md border border-white/10 p-10">
          <div className="flex items-start gap-6">
            <ShieldAlert className="w-8 h-8 text-white shrink-0 opacity-80" strokeWidth={1} />
            <div>
              <h3 className="text-xl font-light text-white mb-3 tracking-wide">Absolute Integrity</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Your device enters a highly secure environment. We execute deep diagnostics before any intervention. 90-day comprehensive coverage on all components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
