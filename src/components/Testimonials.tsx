import { Star, Quote } from 'lucide-react';
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "María González",
    location: "Bahía Blanca",
    body: "El acompañamiento que recibí fue excepcional. Me ayudaron a superar un momento muy difícil en mi vida y a desarrollar herramientas que sigo usando hoy en día.",
    rating: 5,
    initials: "MG"
  },
  {
    name: "Carlos Rodríguez",
    location: "Bahía Blanca", 
    body: "Las sesiones online fueron muy efectivas. La profesionalidad y calidez humana del equipo me permitieron sentirme cómodo desde el primer encuentro.",
    rating: 5,
    initials: "CR"
  },
  {
    name: "Ana López",
    location: "Bahía Blanca",
    body: "Excelente atención. Me ayudaron con mis niveles de ansiedad y ahora puedo manejar mejor las situaciones estresantes. Muy recomendable.",
    rating: 5,
    initials: "AL"
  },
  {
    name: "Jorge Martínez",
    location: "Bahía Blanca",
    body: "La terapia de pareja nos ayudó enormemente. Aprendimos a comunicarnos mejor y a fortalecer nuestra relación. Estamos muy agradecidos.",
    rating: 5,
    initials: "JM"
  },
  {
    name: "Lucía Fernández",
    location: "Bahía Blanca",
    body: "Un espacio seguro donde pude expresar mis emociones sin juicios. El proceso terapéutico cambió mi perspectiva de vida de manera positiva.",
    rating: 5,
    initials: "LF"
  },
  {
    name: "Roberto Silva",
    location: "Bahía Blanca",
    body: "Profesionales muy capacitados. La terapia me ayudó a gestionar el estrés laboral y mejorar mi calidad de vida significativamente.",
    rating: 5,
    initials: "RS"
  },
  {
    name: "Patricia Morales",
    location: "Bahía Blanca",
    body: "Mi hijo adolescente encontró en este equipo el apoyo que necesitaba. Excelente trabajo con jóvenes y familias.",
    rating: 5,
    initials: "PM"
  },
  {
    name: "Alejandro Castro",
    location: "Bahía Blanca",
    body: "Las técnicas de mindfulness que aprendí han sido fundamentales para mi bienestar. Recomiendo ampliamente sus servicios.",
    rating: 5,
    initials: "AC"
  }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  location,
  body,
  rating,
  initials,
}: {
  name: string;
  location: string;
  body: string;
  rating: number;
  initials: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 gentle-shadow",
        // light styles
        "border-border bg-card hover:bg-card/80",
        // dark styles  
        "dark:border-border dark:bg-card dark:hover:bg-card/80",
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-6 h-6 text-primary" />
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-sm text-muted-foreground mb-6 italic leading-relaxed">
        "{body}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <span className="text-primary font-semibold text-sm">
            {initials}
          </span>
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">
            {name}
          </div>
          <div className="text-xs text-muted-foreground">
            {location}
          </div>
        </div>
      </div>
    </figure>
  );
};

const Testimonials = () => {
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

        {/* Marquee Testimonials */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem]">
            {firstRow.map((review, index) => (
              <ReviewCard key={`first-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:1rem]">
            {secondRow.map((review, index) => (
              <ReviewCard key={`second-${index}`} {...review} />
            ))}
          </Marquee>
          
        {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background via-background/50 to-transparent"></div>
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