import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import BookingCalendar from "./components/BookingCalendar";
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
