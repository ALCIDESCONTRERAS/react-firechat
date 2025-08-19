import { CardFooterAuth } from "@/components/cardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthActions } from "@/hooks/useAuthActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = async (data: LoginZodSchemaType) => {
    const res = await login(data);
    if (!res.success){
      if(res.error?.code === "auth/invalid-login-credentials"){
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password"
        });
        
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password"
        });
      }
      return;
    }
    
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using Email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={loading} type="submit">{loading ? "loggin in..." : "Login"}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};
