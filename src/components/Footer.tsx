import { Heart, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import logo from '@/assets/ep logo-40.png'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-8 flex items-center justify-center">
                <img src={logo} alt='logo'/>
              </div>
              <span className="text-xl font-semibold">
                Equipo de Psicología
              </span>
            </div>
            <p className="text-background/80 mb-6">
              Acompañamiento profesional para tu bienestar mental y emocional en Bahía Blanca.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/equipopsipbbca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/equipopsipbbca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@equipopsipbbca.com"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <nav className="space-y-2">
              {[
                { name: 'Inicio', href: '#home' },
                { name: 'Servicios', href: '#services' },
                { name: 'Sobre Nosotros', href: '#about' },
                { name: 'Testimonios', href: '#testimonials' },
                { name: 'Contacto', href: '#contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block text-background/80 hover:text-background transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-background/80">+54 9 291 416 1306</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-background/80">equipopsipbbca@gmail.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Horarios de atención:</h4>
              <p className="text-background/80 text-sm">
                Lunes a Viernes: 9:00 - 19:00<br />
                Viernes: 9:00 - 13:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © {currentYear} Equipo de Psicología Bahía Blanca. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-background/60 text-sm mr-1">Hecho con</span>
            <Heart className="w-4 h-4 text-red-400 mx-1" />
            <span className="text-background/60 text-sm">para tu bienestar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;