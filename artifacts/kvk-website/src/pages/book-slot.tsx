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
} from "lib/api-client-react/src/generated/api.schemas";
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
  if (data.deviceType === "Other" && (!data.deviceName || data.deviceName.trim().length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Device name is required when 'Other' is selected.",
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
        deviceName: values.deviceType === "Other" ? values.deviceName : undefined,
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
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: error.error || "An error occurred while booking.",
        });
      }
    });
  };

  if (successData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-secondary/30 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">{successData.message}</p>
          
          <div className="bg-background/50 rounded-lg p-4 mb-8 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
            <div className="text-xl font-mono text-primary font-bold tracking-widest">{successData.id}</div>
          </div>

          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pt-20 flex flex-col lg:flex-row bg-background overflow-x-hidden">
      <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Book Repair Slot</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Schedule a service with our expert technicians.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-secondary/20" data-testid="input-fullName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9705551090" className="bg-secondary/20" data-testid="input-phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/20" data-testid="select-deviceType">
                            <SelectValue placeholder="Select device type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Desktop">Desktop</SelectItem>
                          <SelectItem value="Laptop">Laptop</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AnimatePresence>
                  {deviceType === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <FormField
                        control={form.control}
                        name="deviceName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Device Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. MacBook Pro, PS5" className="bg-secondary/20" data-testid="input-deviceName" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <FormField
                control={form.control}
                name="problemDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe the issue in detail..." 
                        className="resize-none bg-secondary/20 h-32" 
                        data-testid="textarea-problem"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-secondary/20 border-input hover:bg-secondary/40 hover:text-foreground",
                                !field.value && "text-muted-foreground"
                              )}
                              data-testid="button-datePicker"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTimeSlot"
                  render={({ field }) => (
                    <FormItem className="pt-2">
                      <FormLabel>Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/20" data-testid="select-timeSlot">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</SelectItem>
                          <SelectItem value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</SelectItem>
                          <SelectItem value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</SelectItem>
                          <SelectItem value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter full address for pickup/service" 
                        className="resize-none bg-secondary/20" 
                        data-testid="textarea-address"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all" 
                disabled={createBooking.isPending}
                data-testid="button-submit-booking"
              >
                {createBooking.isPending ? "Booking..." : "Confirm Booking"}
              </Button>

            </form>
          </Form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative border-l border-border bg-secondary/10">
        <img 
          src={bookingVisual} 
          alt="Premium Repair Service" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        <div className="absolute bottom-12 left-12 right-12 bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <ShieldAlert className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Transparent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your device is in safe hands. We provide detailed diagnostics before proceeding with any repairs. 90-day warranty on all parts and labor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
