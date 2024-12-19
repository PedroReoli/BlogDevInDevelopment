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
import ProfilePage from "@/pages/profile/ProfilePage";
import SavedContentPage from "@/pages/profile/SavedContentPage";
import MyPostsPage from "@/pages/profile/MyPostsPage";
import UsersPage from "@/pages/community/UsersPage";
import DiscussionsPage from "@/pages/community/DiscussionsPage";
import JobPortalPage from "@/pages/professional/JobPortalPage";
import NetworkingPage from "@/pages/professional/NetworkingPage";
import AnnounceJobPage from "@/pages/professional/AnnounceJobPage";
import LoginPage from "@/pages/auth/LoginPage";
import TutorialsPage from "@/pages/learning/TutorialsPage"; // Nova rota
import CoursesPage from "@/pages/learning/CoursesPage"; // Nova rota
import DocumentationPage from "@/pages/learning/DocumentationPage"; // Nova rota
import { ThemeProvider } from "./context/ThemeContext";

// DEPOIS FAZER UM ROUTES.TS para organizar isso aqui
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Layout Principal */}
            <Route path="/" element={<RootLayout />}>
              <Route
                index
                element={
                  <PageTransition>
                    <MainPage />
                  </PageTransition>
                }
              />
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
                path="aprendizado/documentacao"
                element={
                  <PageTransition>
                    <DocumentationPage />
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
                path="anuncios"
                element={
                  <PageTransition>
                    <AnnounceJobPage />
                  </PageTransition>
                }
              />
            </Route>

            {/* Rotas de Login */}
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
