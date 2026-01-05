import { useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { useAuthAdmin } from '@/components/auth/useAuthAdmin';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/ep logo-40.png';
import titulo from '@/assets/titulo.png';
import '@/components/css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const authAdmin = useAuthAdmin();
  
  const navigation = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Sobre Nosotras', href: '#about' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container-content py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="EP-logo">
              <img src={logo} alt="Logo" />
            </div>
            <span className= "titulo">
              <img src={titulo} alt="Equipo Psip" />
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {auth.isAuthenticated || authAdmin.isAuthenticatedAdmin ? (
              <button onClick={async () => { 
                await auth.logout(); 
                authAdmin.setIsAuthenticatedAdmin(false); 
                navigate('/'); }} 
                className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200">
                Cerrar Sesión
              </button>
            ) : (
              <button onClick={() =>navigate("/login") } className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200">
                Iniciar Sesión
              </button>
            )}
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Contact Actions */}
          <div className="boton-whatsapp">
            <Button
              size="sm"
              onClick={() => window.open('https://wa.me/2914161306?text=Hola, me gustaría agendar una consulta', '_blank')}
              className=""
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                {auth.isAuthenticated || authAdmin.isAuthenticatedAdmin ? (
                  <button
                    onClick={async () => {
                      await auth.logout();
                      authAdmin.setIsAuthenticatedAdmin(false);
                      setIsMenuOpen(false);
                      navigate('/');
                    }}
                    className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <button
                    onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                    className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
              {/* <div className="boton-whatsapp">
                <Button
                  size="sm"
                  onClick={() => window.open('https://wa.me/5491234567890?text=Hola, me gustaría agendar una consulta', '_blank')}
                  className="bg-primary hover:bg-primary/90 w-full justify-start"
                >
                <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;