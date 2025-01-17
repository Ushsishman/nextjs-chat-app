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
import { auth, db } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const router = useRouter();
  const { setRerender } = useAuth();
  const { toast } = useToast();

  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(50)
        .email("This is not a valid email."),
      userName: z
        .string()
        .min(3, { message: "Username should be more than 3 letter" })
        .max(20),
      password: z
        .string()
        .min(6, { message: "Password should be longer." })
        .max(20),
      confirmPassword: z
        .string()
        .min(6, { message: "Password should be longer." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${values.userName}`,
        }).then(async () => {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (!userSnapshot.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              userName: user.displayName,
              photoURL: user.photoURL,
            }).then(() => {
              setRerender(true);
              toast({
                title: "Success",
                description: `Your account has been created successfully, ${user.displayName}! Welcome aboard! You can now start exploring.`,
                variant: "default",
              });
              router.push("/");
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          toast({
            title: "Error",
            description: "This email address is already in use.",
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="userName">Username</FormLabel>
              <FormControl>
                <Input
                  className="border-black"
                  id="userName"
                  type="text"
                  placeholder="Username"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  className="border-black"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
