import Header2 from '@/components/Header2';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TurnosAdminPublic from '@/components/TurnosAdminPublic';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';

const IndexLoging = () => {

  return (
    <div className="min-h-screen">
    <Header2/>
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <TurnosAdminPublic />
        <Contact />
      </main>
      <Footer />
      <ChatbotTrigger />
    </div>
  );
};

export default IndexLoging;