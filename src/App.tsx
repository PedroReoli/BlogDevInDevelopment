// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Importação para animação de transição
import PostDetails from "./pages/blog/PostDetails";
import LessonDetails from "./pages/lesson/LessonDetails";
import ProjectDetails from "./pages/project/ProjectDetails";
import MainPage from "@/pages/Main/MainPage";
import RootLayout from "./_root/RootLayout";
import PageTransition from "./components/Transition/PageTransition";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import { ThemeProvider } from "./context/ThemeContext";


const App = () => {
  return (
  <ThemeProvider>
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Outras rotas */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<PageTransition><MainPage /></PageTransition>} />
            <Route path="post/:id" element={<PageTransition><PostDetails /></PageTransition>} />
            <Route path="lesson/:id" element={<PageTransition><LessonDetails /></PageTransition>} />
            <Route path="project/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Router>
  </ThemeProvider>
  );
};

export default App;
