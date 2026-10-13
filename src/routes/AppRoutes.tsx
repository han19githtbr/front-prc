import { Navigate, Route, Routes } from 'react-router-dom'
import ComingSoonPage from '@/pages/ComingSoonPage'
import LoginPage from '@/pages/Login/LoginPage'
import SplashPage from '@/pages/Splash/SplashPage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<ComingSoonPage title="Cadastro" />} />
      <Route path="/recuperar-senha" element={<ComingSoonPage title="Recuperar senha" />} />

      {/* Privadas: só abrem com usuário autenticado (veja AuthContext) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<ComingSoonPage title="Painel" />} />
        {/* Futuras telas: propriedades, lotes, culturas, programações... */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
