// src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { OverlayProvider } from "@react-aria/overlays";
import AppRoutes from "@/routes/AppRoutes";

const App: React.FC = () => {
  return (
    <OverlayProvider>
      <ThemeProvider>
        <Router>
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </OverlayProvider>
  );
};

export default App;
