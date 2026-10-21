import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Trabajos from './components/Trabajos.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Trabajos />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
