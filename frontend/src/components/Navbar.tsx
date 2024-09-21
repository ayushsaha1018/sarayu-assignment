import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarClock, CircleUser } from "lucide-react";

import { AuthForm } from "@/lib/types";
import AuthService from "@/services/authService";
import EventService from "@/services/eventService";
import { useAuthStore } from "@/store/authStore";
import { useEventStore } from "@/store/eventStore";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Navbar() {
  const { isLoggedIn, loginUser, logoutUser, isDialogOpen, setIsDialogOpen } =
    useAuthStore();
  const { setEvents } = useEventStore();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { handleSubmit, register } = useForm<AuthForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: AuthForm) => {
    console.log(data);
    if (isRegister) {
      try {
        const res = await AuthService.registerUser(data);
        console.log(res);
        setIsRegister(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await AuthService.loginUser(data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        loginUser(res.data.user);
        const userEvents = await EventService.getUserEvents();
        setEvents(userEvents.data);
        setIsDialogOpen(false);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setEvents([]);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <nav className="gap-3 text-lg font-medium flex flex-row items-center md:text-lg">
        <CalendarClock />
        Calendar
      </nav>
      <div className="flex items-center gap-4  md:gap-2 lg:gap-4 ">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog
            open={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="grid gap-4 py-4"
              >
                {isRegister ? (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: isRegister })}
                      required={isRegister}
                      className="col-span-3"
                    />
                  </div>
                ) : null}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className="col-span-3"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    {isRegister ? "Register" : "Login"}
                  </Button>
                </div>

                {isRegister ? (
                  <p className="text-sm">
                    Already have an account?
                    <Button
                      variant={"link"}
                      onClick={() => setIsRegister(false)}
                    >
                      Login
                    </Button>
                  </p>
                ) : (
                  <p className="text-sm">
                    Don't have an account?
                    <Button
                      variant={"link"}
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </Button>
                  </p>
                )}
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
