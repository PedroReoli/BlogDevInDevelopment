// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Para animações de transição
import { ThemeProvider } from "./context/ThemeContext";

// Layouts e Transições
import RootLayout from "./_root/RootLayout";
import PageTransition from "./components/Transition/PageTransition";

// Páginas principais
import MainPage from "@/pages/Main/MainPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import LoginPage from "@/pages/auth/LoginPage";

// Blog e Detalhes
import PostDetails from "./pages/blog/PostDetails";
import LessonDetails from "./pages/lesson/LessonDetails";
import ProjectDetails from "./pages/project/ProjectDetails";

// Aprendizado
import TutorialsPage from "@/pages/learning/TutorialsPage";
import CoursesPage from "@/pages/learning/CoursesPage";
import MaterialsPage from "@/pages/learning/MaterialsPage";

// Perfil e Pessoal
import ProfilePage from "@/pages/profile/ProfilePage";
import SavedContentPage from "@/pages/profile/SavedContentPage";
import MyPostsPage from "@/pages/profile/MyPostsPage";

// Comunidade
import UsersPage from "@/pages/community/UsersPage";
import DiscussionsPage from "@/pages/community/DiscussionsPage";

// Profissional
import JobPortalPage from "@/pages/professional/JobPortalPage";
import NetworkingPage from "@/pages/professional/NetworkingPage";
import Events from "@/pages/professional/Events";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Layout Principal */}
            <Route path="/" element={<RootLayout />}>
              {/* Página Inicial */}
              <Route
                index
                element={
                  <PageTransition>
                    <MainPage />
                  </PageTransition>
                }
              />

              {/* Blog e Detalhes */}
              <Route
                path="post/:id"
                element={
                  <PageTransition>
                    <PostDetails />
                  </PageTransition>
                }
              />
              <Route
                path="lesson/:id"
                element={
                  <PageTransition>
                    <LessonDetails />
                  </PageTransition>
                }
              />
              <Route
                path="project/:id"
                element={
                  <PageTransition>
                    <ProjectDetails />
                  </PageTransition>
                }
              />

              {/* Rotas de Aprendizado */}
              <Route
                path="aprendizado/tutoriais"
                element={
                  <PageTransition>
                    <TutorialsPage />
                  </PageTransition>
                }
              />
              <Route
                path="aprendizado/cursos"
                element={
                  <PageTransition>
                    <CoursesPage />
                  </PageTransition>
                }
              />
              <Route
                path="aprendizado/materiais"
                element={
                  <PageTransition>
                    <MaterialsPage />
                  </PageTransition>
                }
              />

              {/* Rotas de Perfil e Pessoal */}
              <Route
                path="profile"
                element={
                  <PageTransition>
                    <ProfilePage />
                  </PageTransition>
                }
              />
              <Route
                path="salvos"
                element={
                  <PageTransition>
                    <SavedContentPage />
                  </PageTransition>
                }
              />
              <Route
                path="meus-posts"
                element={
                  <PageTransition>
                    <MyPostsPage />
                  </PageTransition>
                }
              />

              {/* Rotas de Comunidade */}
              <Route
                path="usuarios"
                element={
                  <PageTransition>
                    <UsersPage />
                  </PageTransition>
                }
              />
              <Route
                path="discussoes"
                element={
                  <PageTransition>
                    <DiscussionsPage />
                  </PageTransition>
                }
              />

              {/* Rotas Profissionais */}
              <Route
                path="vagas"
                element={
                  <PageTransition>
                    <JobPortalPage />
                  </PageTransition>
                }
              />
              <Route
                path="networking"
                element={
                  <PageTransition>
                    <NetworkingPage />
                  </PageTransition>
                }
              />
              <Route
                path="eventos"
                element={
                  <PageTransition>
                    <Events />
                  </PageTransition>
                }
              />
            </Route>

            {/* Rota de Login */}
            <Route
              path="login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />

            {/* Página 404 */}
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFoundPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
};

export default App;
