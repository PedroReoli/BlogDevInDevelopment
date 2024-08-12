// src/components/Topbar.tsx

import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="bg-gradient-to-b from-black to-[#111111]  text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 border-b-2 border-gray-700">
      {/* Nome Pedro Reoli */}
      <div className="text-2xl font-bold">
        &lt; PedroReoli /&gt;
      </div>

      {/* Menu */}
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/portfolio" className="hover:underline">Portfolio</Link>
        <Link to="https://x.com/opedroreoli" className="hover:underline">Twitter</Link>
        {/* <Link to="/cursos" className="hover:underline">Cursos</Link> */}
      </div>
    </div>
  );
};

export default Topbar;