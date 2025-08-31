import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'María González',
      location: 'Bahía Blanca',
      content: 'El acompañamiento que recibí fue excepcional. Me ayudaron a superar un momento muy difícil en mi vida y a desarrollar herramientas que sigo usando hoy en día.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      location: 'Bahía Blanca',
      content: 'Las sesiones online fueron muy efectivas. La profesionalidad y calidez humana del equipo me permitieron sentirme cómodo desde el primer encuentro.',
      rating: 5
    },
    {
      name: 'Ana López',
      location: 'Bahía Blanca',
      content: 'Excelente atención. Me ayudaron con mis niveles de ansiedad y ahora puedo manejar mejor las situaciones estresantes. Muy recomendable.',
      rating: 5
    },
    {
      name: 'Jorge Martínez',
      location: 'Bahía Blanca',
      content: 'La terapia de pareja nos ayudó enormemente. Aprendimos a comunicarnos mejor y a fortalecer nuestra relación. Estamos muy agradecidos.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-heading text-foreground mb-4">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
            La confianza de quienes han elegido nuestro acompañamiento es nuestro mayor orgullo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="gentle-shadow hover:shadow-lg transition-all duration-300 bg-card border-border/50 relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-body text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-small text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-trust/10 rounded-xl border border-trust/20">
            <Star className="w-5 h-5 text-trust mr-2" />
            <span className="text-trust font-medium">
              Más de 100 reseñas positivas en Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;