// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from '@/_root/RootLayout';
import MainPage from '@/_root/pages/MainPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
