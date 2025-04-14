// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PageTransition from "@/components/Transition/PageTransition";
import RootLayout from "@/_root/RootLayout";

// Páginas principais
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Blog e Detalhes
import PostDetails from "@/pages/PostDetails";
import LessonDetails from "@/pages/LessonDetails";
import ProjectDetails from "@/pages/ProjectDetails";

// Aprendizado
import TutorialsPage from "@/pages/TutorialsPage";
import CoursesPage from "@/pages/CoursesPage";
import MaterialsPage from "@/pages/MaterialsPage";



// Profissional
import NetworkingPage from "@/pages/NetworkingPage";

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
