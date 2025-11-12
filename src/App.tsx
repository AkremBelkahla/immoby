import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "./components/ScrollToTop";
import { MarketingLayout } from "./components/MarketingLayout";
import { AppLayout } from "./components/AppLayout";

// Pages marketing
import Landing from "./pages/Landing";
import Location from "./pages/Location";
import Fonctionnalites from "./pages/Fonctionnalites";
import Tarifs from "./pages/Tarifs";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

// Pages application
import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import Baux from "./pages/Baux";
import Locataires from "./pages/Locataires";
import EtatsLieux from "./pages/EtatsLieux";
import Proprietaires from "./pages/Proprietaires";
import RevenusBien from "./pages/RevenusBien";
import Tickets from "./pages/Tickets";
import Interventions from "./pages/Interventions";
import Prestataires from "./pages/Prestataires";
import Ecritures from "./pages/Ecritures";
import Factures from "./pages/Factures";
import Reglements from "./pages/Reglements";
import ExportComptable from "./pages/ExportComptable";
import Documents from "./pages/Documents";
import Rapports from "./pages/Rapports";
import Agenda from "./pages/Agenda";
import Parametres from "./pages/Parametres";

import NotFound from "./pages/NotFound";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Routes>
              {/* Routes marketing */}
              <Route element={<MarketingLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/location" element={<Location />} />
                <Route path="/fonctionnalites" element={<Fonctionnalites />} />
                <Route path="/tarifs" element={<Tarifs />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
              </Route>

            {/* Routes application (dashboard) */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Locatif */}
              <Route path="/locatif/biens" element={<Biens />} />
              <Route path="/locatif/baux" element={<Baux />} />
              <Route path="/locatif/locataires" element={<Locataires />} />
              <Route path="/locatif/etats-lieux" element={<EtatsLieux />} />
              
              {/* Propriétaires */}
              <Route path="/proprietaires/liste" element={<Proprietaires />} />
              <Route path="/proprietaires/revenus" element={<RevenusBien />} />
              
              {/* SAV */}
              <Route path="/sav/tickets" element={<Tickets />} />
              <Route path="/sav/interventions" element={<Interventions />} />
              <Route path="/sav/prestataires" element={<Prestataires />} />
              
              {/* Comptabilité */}
              <Route path="/compta/ecritures" element={<Ecritures />} />
              <Route path="/compta/factures" element={<Factures />} />
              <Route path="/compta/reglements" element={<Reglements />} />
              <Route path="/compta/export" element={<ExportComptable />} />
              
              {/* Autres sections */}
              <Route path="/documents" element={<Documents />} />
              <Route path="/rapports" element={<Rapports />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/parametres" element={<Parametres />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
