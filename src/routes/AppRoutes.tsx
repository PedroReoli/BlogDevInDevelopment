// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PageTransition from "@/components/Transition/PageTransition";
import RootLayout from "@/_root/RootLayout";

// Páginas principais
import MainPage from "@/pages/Main/MainPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Blog e Detalhes
import PostDetails from "@/pages/blog/PostDetails";
import LessonDetails from "@/pages/lesson/LessonDetails";
import ProjectDetails from "@/pages/project/ProjectDetails";

// Aprendizado
import TutorialsPage from "@/pages/learning/TutorialsPage";
import CoursesPage from "@/pages/learning/CoursesPage";
import MaterialsPage from "@/pages/learning/MaterialsPage";

// Perfil e Pessoal
import ProfilePage from "@/pages/profile/ProfilePage";

// Comunidade
import UsersPage from "@/pages/community/UsersPage";
import DiscussionsPage from "@/pages/community/DiscussionsPage";

// Profissional
import NetworkingPage from "@/pages/professional/NetworkingPage";

const AppRoutes: React.FC = () => (
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

      {/* Aprendizado */}

      {/* mudar para vídeos recomendados */}
      <Route
        path="aprendizado/tutoriais"
        element={
          <PageTransition>
            <TutorialsPage />
          </PageTransition>
        }
      />
      {/* Manter */}
      <Route
        path="aprendizado/cursos"
        element={
          <PageTransition>
            <CoursesPage />
          </PageTransition>
        }
      />
      {/* Manter */}
      <Route
        path="aprendizado/materiais"
        element={
          <PageTransition>
            <MaterialsPage />
          </PageTransition>
        }
      />

      {/* Perfil */}
      <Route
        path="profile"
        element={
          <PageTransition>
            <ProfilePage />
          </PageTransition>
        }
      />

      {/* Comunidade */}
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

      {/* Profissional */}
      <Route
        path="networking"
        element={
          <PageTransition>
            <NetworkingPage />
          </PageTransition>
        }
      />
    </Route> {/* Fechamento correto do RootLayout */}

    {/* Autenticação */}
    <Route
      path="login"
      element={
        <PageTransition>
          <LoginPage />
        </PageTransition>
      }
    />
    <Route
      path="register"
      element={
        <PageTransition>
          <RegisterPage />
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
);

export default AppRoutes;
