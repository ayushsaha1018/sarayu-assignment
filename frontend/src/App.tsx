import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { Navbar } from "./components/Navbar";
import { getAllEvents } from "./lib/utils";
import { useAuthStore } from "./store/authStore";
import { useEventStore } from "./store/eventStore";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { isLoggedIn, loginUser } = useAuthStore();
  const { setEvents } = useEventStore();

  useEffect(() => {
    if (localStorage && !isLoggedIn) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        loginUser(JSON.parse(user));
        loginUserAndFetchEvents();
      }
    }
  }, []);

  const loginUserAndFetchEvents = async () => {
    const userEvents = await getAllEvents();
    setEvents(userEvents);
  };

  return (
    <>
      <Navbar />
      <Calendar />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
