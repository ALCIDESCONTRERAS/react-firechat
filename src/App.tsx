import { Route, Routes } from "react-router";

import { RootLayout } from "./layouts/Root.layout";
import { PublicLayout } from "./layouts/Public.layout";
import { AdminLayout } from "./layouts/Admin.layout";
import { AuthLayout } from "./layouts/Auth.layout";

import { HomePage } from "./pages/public/Home.page";
import { DashboardPage } from "./pages/admin/Dashboard.page";
import { ProfilePage } from "./pages/admin/Profile.page";
import { ChatPage } from "./pages/admin/Chat.page";
import { LoginPage } from "./pages/auth/Login.page";
import { RegisterPage } from "./pages/auth/Register.page";
import { NotFoundPage } from "./pages/public/NotFound.page";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Private */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        {/* Auth */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
