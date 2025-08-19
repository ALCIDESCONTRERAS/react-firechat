import { CardFooterAuth } from "@/components/cardFooterAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@/hooks/useAuthActions";
import { registerZodSchema, type registerZodSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const RegisterPage = () => {
  const { loading, register } = useAuthActions();

  const form = useForm<registerZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = async (data: registerZodSchemaType) => {
    const res = await register(data);
    if (res.error) {
      toast.error("Problema al crear la cuenta");
      console.log(res.error);
      if (res.error?.code === "auth/email-already-in-use") {
        form.setError("email", {
          type: "manual",
          message: "Email is already in use",
        });
      } else {
        console.error("Regitration error:", res.error);
      }
    } else {
      console.log("Registration successul", data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register to your account using Email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Displayname</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "loggin in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="register" loading={loading} />
    </Card>
  );
};
