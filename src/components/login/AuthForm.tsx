import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";

import { schema, FormData } from "@/lib/schemaValid";
import { IApiResponse, ILoginData, IRequestAuth } from "@/types";
import { saveTokenStorage } from "@/service/token.service";

const USER: IRequestAuth = {
  email: "aleksei@example.com",
  password: "lkJlkn8hj",
};

const AuthForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "aleksei@example.com",
      password: "lkJlkn8hj",
    },
  });

  const onSubmit = async (dataForm: FormData) => {
    if (dataForm.email !== USER.email || dataForm.password !== USER.password) {
      return setError("Неверный логин или пароль!");
    }
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // method: "POST",
      // body: JSON.stringify({
      //   ...dataForm,
      // }),
    });

    if (!response.ok) {
      return setError("Не удалось авторизоваться");
    }

    const data: IApiResponse<ILoginData> = await response.json();

    if (!data) {
      return setError("Неверный логин или пароль!");
    }

    saveTokenStorage(data.data.token);

    navigate("/profile");

    form.reset();
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage children="We'll never share your email with anyone else" />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </form>
        {error && (
          <>
            <span className="inline-block mt-4 text-destructive-foreground">
              {error}
            </span>
          </>
        )}
      </Form>
    </>
  );
};

export default AuthForm;
