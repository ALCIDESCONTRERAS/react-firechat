import { toast } from "sonner";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

export const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

  const { loginWithGoogle } = useAuthActions();
  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login Succesful");
    } else {
      console.error("Login failed", result.error);
      toast.error("Login Failed");
    }
  };

  return (
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant={"outline"}
      >
        <Mail className="mr-2" />
        {isLogin ? "Login with Google" : "Register with Google"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have account? " : "Already have an account "}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button variant={"link"} className="p-0 h-auto font-normal">
            {isLogin ? "Register" : "Sing in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};
