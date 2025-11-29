import HeaderAdmin from '@/components/HeaderAdmin';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TurnosAdminPublic from '@/components/TurnosAdminPublic';

const IndexAdmin = () => {

  return (
    <div className="min-h-screen">
    <HeaderAdmin/>
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

export default IndexAdmin;