import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Programas from './pages/Programas';
import ProgramaDetalle from './pages/ProgramaDetalle';
import Voluntariado from './pages/Voluntariado';
import Impacto from './pages/Impacto';
import Donar from './pages/Donar';
import Aliados from './pages/Aliados';
import Proyectos from './pages/Proyectos';
import Contacto from './pages/Contacto';
import { TratamientoDatos, Terminos } from './pages/Legal';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVoluntarios from './pages/admin/AdminVoluntarios';
import {
  AdminAliados, AdminContactos, AdminDonaciones, AdminProgramas, AdminProyectos, AdminConfiguracion,
} from './pages/admin/AdminSections';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/programas/:slug" element={<ProgramaDetalle />} />
          <Route path="/voluntariado" element={<Voluntariado />} />
          <Route path="/impacto" element={<Impacto />} />
          <Route path="/donar" element={<Donar />} />
          <Route path="/aliados" element={<Aliados />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/legal/tratamiento-datos" element={<TratamientoDatos />} />
          <Route path="/legal/terminos" element={<Terminos />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="voluntarios" element={<AdminVoluntarios />} />
          <Route path="programas" element={<AdminProgramas />} />
          <Route path="proyectos" element={<AdminProyectos />} />
          <Route path="aliados" element={<AdminAliados />} />
          <Route path="contactos" element={<AdminContactos />} />
          <Route path="donaciones" element={<AdminDonaciones />} />
          <Route path="configuracion" element={<AdminConfiguracion />} />
        </Route>

        <Route path="*" element={<SiteLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
