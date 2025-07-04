"use client";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext"; // -> 1. ADD THIS IMPORT

const initialState: LoginState = { message: "", errors: {} };

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useActionState(loginAction, initialState);
  const { pending } = useFormStatus();
  const { refreshCart } = useCart(); // -> 2. ADD THIS HOOK
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // -> 3. MODIFY THIS EFFECT
    if (state.success) { // It's safer to check for the success flag directly
      toast.success(state.message || "Login successful!");

      // This is the crucial fix:
      // Explicitly tell the cart to refetch its data from the server
      // AFTER the login and server-side cart merge are complete.
      refreshCart();

      if (state.redirect) {
        router.push(state.redirect);
      }
    } else if (state.message && state.toastType === "error") {
      toast.error(state.message);
    }
    // Add refreshCart to the dependency array
  }, [state, router, refreshCart]);

  return (
    <div className="w-full lg:px-20">
      <form action={dispatch} noValidate className="w-full space-y-4">
        <div>
          <div className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="border-0 focus-visible:ring-0 shadow-none"
              aria-describedby="email-error"
              defaultValue={state?.values?.email || ""}
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="text-sm text-red-500 mt-1" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div>
          <div className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-0 focus-visible:ring-0 shadow-none"
              aria-describedby="password-error"
              defaultValue={state?.values?.password || ""}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="text-sm text-red-500 mt-1" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          size={"login"}
          disabled={pending}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default Form;