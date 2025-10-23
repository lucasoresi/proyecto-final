import { BookOpenText, SquarePen , Brain, Target, Heart,LibraryBig, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: BookOpenText,
      title: 'Diagnósticos Psicopedagógicos',
      description: 'Orientado a comprender el modo en que cada persona aprende, sus fortalezas, desafíos y particularidades. A través de una evaluacion rigurossa, que incluye:',
      features: ['Entrevistas', 'Pruevas estandarizadas', 'Observaciones clínicas','Informe psicopedagógico']
    },
    {
      icon: SquarePen,
      title: 'Tratamientos Psicopedagógicos',
      description: 'Desarrollado con intervenciones personalizadas, orientadas a fortalecer los procesos de aprendizaje y promover el desarrollo integral: ',
      features: ['Potencia el aprendizaje', 'Favorece la autonomia', 'Interviene en diferentes contextos']
    },
    {
      icon: Brain,
      title: 'Evaluaciones Neurocognitivas',
      description: 'Es una "muestra" de la cognición del individuo recabada bajo condiciones controladas. Cuenta con diferentes fuentes de datos:',
      features: ['Entrevista exhaustiva', 'Demanda del paciente y/o familiar', 'Pruebas neuropsicologicas' ]
    },
    {
      icon: LibraryBig,
      title: 'Grupos de Estudio',
      description: 'Espacio organizado en el que nos reunimos con el propóposito de aprender, debatir y profundizar en temas específicos de la Psicopedagogía Clínica: ACI, DI, FIL, TDAH, DEA, TANV, etc.',
      features: []
    },
    {
      icon: Users,
      title: 'Orientación a Padres',
      description: 'Espacio de acompañamiento y reflexión sobre las necesidades educativas y emocionales de niños y adolescentes, fortaleciendo los vínculos y promoviendo el aprendizaje desde una mirada psicopedagógica.',
      features: []
    },
    {
      icon: Target,
      title: 'Orientación Vocacional/Ocupacional',
      description: 'Orientación para alcanzar objetivos personales y profesionales, desarrollando habilidades y fortalezas.',
      features: ['Definición de metas', 'Plan de acción', 'Desarrollo personal']
    }
  ];Heart

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-heading text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-subheading text-muted-foreground max-w-3xl mx-auto">
            Combinamos experiencia clínica y enfoque integral para potenciar el aprendizaje 
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