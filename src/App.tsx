// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetails from "./components/Blog/PostDetails"; 
import MainPage from "./_root/pages/MainPage";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
