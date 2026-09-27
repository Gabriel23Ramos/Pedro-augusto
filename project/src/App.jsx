import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import BookingCalendar from "./components/BookingCalendar";
import Locations from "./components/Locations";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";

function App() {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return <AdminPage />;
  }

  return (
    <div className="font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Benefits />
        <BookingCalendar />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
