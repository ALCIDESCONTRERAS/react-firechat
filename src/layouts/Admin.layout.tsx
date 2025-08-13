import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

export const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  console.log({ status, signInCheckResult, hasEmitted });

  // Mostrar loading mientrtas se verifica el estado de inicio de sesión

  if (status === "loading") {
    return <div>Loading....</div>;
  }

  //redirigir si el usuario no está autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
