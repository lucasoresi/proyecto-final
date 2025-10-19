import heroImage from '@/assets/hero-therapy-room.jpg';
import '@/components/css/hero.css';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, Shield, UserCheck} from 'lucide-react';

const Hero = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/2077297713?text=Hola, me gustaría agendar una consulta psicológica', '_blank');
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-font">
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Espacio terapéutico profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="container-content relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-morado font-medium text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Profesionales Matriculados
            </span>
          </div>
          
          <h1 className="text-display text-foreground mb-3">
            Espacio de {' '}
            <span className="psicopedagogica">Psicopedagogía </span>
          </h1>
          <h2 className="text-heading text-foreground mb-4">
               Asistencia clínica y formación {''}
              <span className="profesional"> profesional</span>
          </h2>
          <p className="text-subheading text-muted-foreground mb-8 max-w-2xl">
            Promueve el desarollo del aprendizaje a través de un enfoque neurocognitivo y
            psicopedagógico, integrando ciencia, sensibilidad y acompañamiento personalizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg"
              onClick={openWhatsApp}
              className="whatapp2-color"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Consulta por WhatsApp
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-2 border-trust text-trust hover:bg-trust hover:text-trust-foreground font-medium px-8 py-3 rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Cita
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
              <div className="w-11 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Consultas Online</h3>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
                <div className="w-11 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Consultas Presenciales</h3>

                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
              <div className="w-11 h-10 bg-trust/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-trust" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Disponibilidad Horaria</h3>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
              <div className="w-11 h-10 bg-warmth/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-warmth-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Profesionalismo</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Hero;