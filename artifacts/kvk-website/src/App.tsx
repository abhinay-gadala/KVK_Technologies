import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BookSlot from "@/pages/book-slot";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book-slot" component={BookSlot} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { LoaderProvider } from "@/components/layout/LoaderContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoaderProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="noise" />
            <div className="vignette" />
            <Loader />
            <Navbar />
            <main className="flex-grow flex flex-col relative z-10">
              <Router />
            </main>
            <Footer />
          </WouterRouter>
        </LoaderProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
