// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Importação para animação de transição
import PostDetails from "./components/Blog/PostDetails";
import LessonDetails from "./components/Lesson/LessonDetails";
import ProjectDetails from "./components/Projects/ProjectDetails";
import MainPage from "./_root/pages/MainPage";
import RootLayout from "./_root/RootLayout";
import PageTransition from "./components/Transition/PageTransition";

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait"> {/* Habilitando transição suave entre rotas */}
        <Routes>
          {/* Rota raiz que utiliza o RootLayout */}
          <Route path="/" element={<RootLayout />}>
            {/* Página inicial */}
            <Route index element={<PageTransition><MainPage /></PageTransition>} />

            {/* Rota para detalhes de posts */}
            <Route
              path="post/:id"
              element={<PageTransition><PostDetails /></PageTransition>}
            />

            {/* Rota para detalhes de aulas */}
            <Route
              path="lesson/:id"
              element={<PageTransition><LessonDetails /></PageTransition>}
            />

            {/* Rota para detalhes de projetos */}
            <Route
              path="project/:id"
              element={<PageTransition><ProjectDetails /></PageTransition>}
            />
          </Route>
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
