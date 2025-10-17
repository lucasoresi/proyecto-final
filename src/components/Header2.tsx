import { useState, useEffect} from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import supabase from '@/config/spabaseClient';

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  
  const navigation = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Sobre Nosotros', href: '#about' },
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
    useEffect(() => {
      const nameFromStorage = localStorage.getItem('userName');
      const emailFromStorage = localStorage.getItem('userEmail');
      if (nameFromStorage) {
        setUserName(nameFromStorage || null);
        return;
      }

      if (emailFromStorage) {
        (async () => {
          const { data, error } = await supabase
            .from('usuarios')
            .select('name')
            .eq('email', emailFromStorage)
            .maybeSingle();
          if (!error && data?.name) setUserName(data.name);
        })();
      }
    }, []);  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container-content py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EP</span>
            </div>
            <span className="text-heading font-semibold text-foreground">
              Equipo de Psicología
            </span>
          </div>

          {/* User Name Display */}
          <div className="hidden md:flex items-center space-x-8 mr-8">
            <button className="text-body text-muted-foreground hover:text-foreground transition-colors duration-200">
              Bienvenido {userName ?? 'Usuario'}
            </button>
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
          <div className="hidden md:flex items-center space-x-3">
            <Button
              size="sm"
              onClick={() => window.open('https://wa.me/5491234567890?text=Hola, me gustaría agendar una consulta', '_blank')}
              className="bg-primary hover:bg-primary/90"
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
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  size="sm"
                  onClick={() => window.open('https://wa.me/5491234567890?text=Hola, me gustaría agendar una consulta', '_blank')}
                  className="bg-primary hover:bg-primary/90 w-full justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header2;