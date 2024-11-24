// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Importação para animação de transição
import PostDetails from "./components/Blog/PostDetails";
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
            {/* Rota que renderiza a MainPage */}
            <Route index element={<PageTransition><MainPage /></PageTransition>} />
            {/* Rota que renderiza o PostDetail para posts específicos */}
            <Route
              path="post/:id"
              element={<PageTransition><PostDetails /></PageTransition>}
            />
          </Route>
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
