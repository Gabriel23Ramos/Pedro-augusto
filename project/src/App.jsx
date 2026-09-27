import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import BookingCalendar from "./components/BookingCalendar";
import Locations from "./components/Locations";
import Footer from "./components/Footer";

function App() {
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
