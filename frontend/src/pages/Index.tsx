import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TurnosAdminPublic from '@/components/TurnosAdminPublic';

const Index = () => {
  return (
    <div className="min-h-screen">
    <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <TurnosAdminPublic />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
