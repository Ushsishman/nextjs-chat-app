"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(20)
      .email("This is not a valid email."),
    password: z
      .string()
      .min(5, { message: "Password should be longer." })
      .max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast({
          title: "Success",
          description: `You have successfully logged in, ${user.displayName}. Welcome back!`,
          variant: "default",
        });
        router.refresh();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-credential") {
          toast({
            title: "Error",
            description:
              "The email or password you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An error occured. Please try again.",
            variant: "destructive",
          });
        }
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-60 p-3 border-2 border-black rounded space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  className="border-black"
                  id="email"
                  type="email"
                  placeholder="Email"
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  className="border-black"
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/register">
          <p className="hover:underline text-sm mt-2">
            Don't have an account? Sign Up
          </p>
        </Link>
        <Button variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
