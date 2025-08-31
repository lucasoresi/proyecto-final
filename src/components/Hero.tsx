import { MessageCircle, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-therapy-room.jpg';

const Hero = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/5491234567890?text=Hola, me gustaría agendar una consulta psicológica', '_blank');
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Profesionales Matriculados
            </span>
          </div>
          
          <h1 className="text-display text-foreground mb-6">
            Tu bienestar mental es nuestra{' '}
            <span className="text-primary">prioridad</span>
          </h1>
          
          <p className="text-subheading text-muted-foreground mb-8 max-w-2xl">
            Equipo profesional de psicología en Bahía Blanca. Brindamos acompañamiento 
            terapéutico personalizado para ayudarte a alcanzar tu bienestar emocional 
            y mental.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg"
              onClick={openWhatsApp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-xl gentle-shadow"
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
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Consultas Online</h3>
                <p className="text-sm text-muted-foreground">Sesiones virtuales seguras</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-trust/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-trust" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Horarios Flexibles</h3>
                <p className="text-sm text-muted-foreground">Adaptados a tu rutina</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-card/80 backdrop-blur rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-warmth/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-warmth-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Confidencialidad</h3>
                <p className="text-sm text-muted-foreground">Ambiente seguro y privado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;