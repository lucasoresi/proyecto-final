import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const openWhatsApp = () => {
    const message = `Hola, me llamo ${formData.name || '[Nombre]'} y me gustaría agendar una consulta psicológica.`;
    window.open(`https://wa.me/5491234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      details: ['Bahía Blanca, Buenos Aires', 'Argentina'],
      action: () => window.open('https://maps.google.com/?q=Bahía+Blanca+Buenos+Aires', '_blank')
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['+54 9 123 456-7890'],
      action: () => window.open('tel:+5491234567890', '_self')
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contacto@equipopsipbbca.com'],
      action: () => window.open('mailto:contacto@equipopsipbbca.com', '_self')
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: ['Lunes a Viernes: 9:00 - 19:00', 'Sábados: 9:00 - 13:00']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-heading text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
            Estamos aquí para acompañarte. Agenda tu consulta o escríbenos para cualquier consulta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="gentle-shadow bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center">
                <Send className="w-5 h-5 mr-2 text-primary" />
                Envía tu consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+54 9 123 456-7890"
                    className="bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={4}
                    className="bg-background"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openWhatsApp}
                    className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`gentle-shadow bg-card border-border/50 ${
                  info.action ? 'cursor-pointer hover:shadow-lg transition-all duration-300' : ''
                }`}
                onClick={info.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Emergency Contact */}
            <Card className="gentle-shadow bg-warmth/10 border-warmth/30">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-warmth-foreground mb-2">
                    ¿Necesitas ayuda urgente?
                  </h3>
                  <p className="text-small text-muted-foreground mb-4">
                    Si estás atravesando una crisis, no dudes en contactarnos
                  </p>
                  <Button
                    size="sm"
                    onClick={() => window.open('tel:+5491234567890', '_self')}
                    className="bg-warmth hover:bg-warmth/90 text-warmth-foreground"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar Ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;