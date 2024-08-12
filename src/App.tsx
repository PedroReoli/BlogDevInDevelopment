// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetails from "./components/Blog/PostDetails"; 
import MainPage from "./_root/pages/MainPage";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <Router>
    <Routes>
      {/* Rota raiz que utiliza o RootLayout */}
      <Route path="/" element={<RootLayout />}>
        {/* Rota que renderiza a MainPage */}
        <Route index element={<MainPage />} />
        {/* Rota que renderiza o PostDetail para posts específicos */}
        <Route path="post/:id" element={<PostDetails />} />
      </Route>
      {/* Adicione outras rotas conforme necessário */}
    </Routes>
  </Router>
  );
};

export default App;
