import { Heart, Users, Brain, Baby, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Terapia Individual',
      description: 'Sesiones personalizadas para trabajar en tu crecimiento personal, autoestima, ansiedad, depresión y otros desafíos emocionales.',
      features: ['Evaluación psicológica', 'Plan terapéutico personalizado', 'Seguimiento continuo']
    },
    {
      icon: Users,
      title: 'Terapia de Pareja',
      description: 'Acompañamiento para fortalecer la relación, mejorar la comunicación y resolver conflictos de manera constructiva.',
      features: ['Comunicación efectiva', 'Resolución de conflictos', 'Fortalecimiento del vínculo']
    },
    {
      icon: Brain,
      title: 'Evaluación neurocognitiva',
      description: 'Es una "muestra" de la cognición del individuo recabada bajo condiciones controladas. Cuenta con diferentes fuentes de datos:',
      features: ['Entrevista exhaustiva', 'Demanda del paciente y/o familiar', 'Pruebas neuropsicologicas' ]
    },
    {
      icon: Baby,
      title: 'Psicología Infantil',
      description: 'Atención especializada para niños y adolescentes, abordando dificultades emocionales, conductuales y del desarrollo.',
      features: ['Ludoterapia', 'Orientación a padres', 'Evaluación del desarrollo']
    },
    {
      icon: Lightbulb,
      title: 'Mindfulness y Bienestar',
      description: 'Técnicas de atención plena para reducir el estrés, mejorar la concentración y promover el equilibrio emocional.',
      features: ['Meditación guiada', 'Técnicas de relajación', 'Manejo del estrés']
    },
    {
      icon: Target,
      title: 'Coaching Psicológico',
      description: 'Orientación para alcanzar objetivos personales y profesionales, desarrollando habilidades y fortalezas.',
      features: ['Definición de metas', 'Plan de acción', 'Desarrollo personal']
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-heading text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios psicológicos adaptados a tus necesidades específicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group gentle-shadow hover:shadow-lg transition-all duration-300 bg-card border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground text-lg">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-primary/5 rounded-xl border border-primary/20">
            <Heart className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">
              Consultas presenciales y online disponibles
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;