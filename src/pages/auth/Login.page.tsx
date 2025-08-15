import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/useAuthActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoginPage = () => {
  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if(result.success){
      console.log("Login Succesful");
    }else {
      console.error("Login failed", result.error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using Email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooter>
        <Button onClick={handleLoginWithGoogle} className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};
