import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SearchProvider } from "./contexts/SearchContext";
import { store } from "./store";
import Navigation from "./components/Navigation";

// Code split pages
const Index = lazy(() => import("./pages/Index"));
const Rent = lazy(() => import("./pages/Rent"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <SearchProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-gradient">
              <BrowserRouter>
                <Navigation />
                <main className="w-full pt-14">
                  <Routes>
                    <Route path="/" element={
                      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading map...</div>}>
                        <Index />
                      </Suspense>
                    } />
                    <Route path="/rent" element={
                      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
                        <Rent />
                      </Suspense>
                    } />
                    <Route path="/about" element={
                      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
                        <About />
                      </Suspense>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={
                      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
                        <NotFound />
                      </Suspense>
                    } />
                  </Routes>
                </main>
              </BrowserRouter>
            </div>
          </SearchProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
