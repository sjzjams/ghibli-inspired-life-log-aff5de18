
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import Gallery from "./pages/Gallery";
import Milestones from "./pages/Milestones";
import NotFound from "./pages/NotFound";
import { GhibliLayout } from "./components/GhibliLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GhibliLayout />}>
            <Route index element={<Index />} />
            <Route path="journal" element={<Journal />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="milestones" element={<Milestones />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
