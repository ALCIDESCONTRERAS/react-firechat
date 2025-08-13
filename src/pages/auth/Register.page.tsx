import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

export const RegisterPage = () => {
  const auth = useAuth();

  const handleClickGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google", error);
      
    }
  };

  return (
    <>
      <h1>Register</h1>
      <button onClick={handleClickGoogle}>Sing In Google</button>
    </>
  );
};
