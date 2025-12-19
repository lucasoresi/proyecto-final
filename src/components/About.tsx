import { Award, BookOpen, Users, Heart } from 'lucide-react';
import psychologistPortrait from '@/assets/psychologist-portrait.jpg';
import laura from '@/assets/foto_laura.png';
const About = () => {
  const credentials = [
    {
      icon: Award,
      title: 'Profesionales Matriculados',
      description: 'Universidad del Salvador'
    },
    {
      icon: BookOpen,
      title: '+30 Años de Experiencia',
      description: 'En Psicopedagogía clínica y en Docencia universitaria'
    },
    {
      icon: Users,
      title: '+700 Pacientes y Consultas',
      description: 'Han confiado en nuestros servicios'
    },
    {
      icon: Heart,
      title: 'Enfoque Integral',
      description: 'Neuropsicología del aprendizaje'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-heading text-foreground mb-6">
              Sobre Nuestro Equipo
            </h2>
            
            <div className="space-y-6 text-body text-muted-foreground">
              <p>
                A Equipo Psip lo conforma la Dra. María Laura Toziano con más de 30 años de experiencia en 
                Psicopedagogía Clínica y la Psicopedagoga María Eugenia Favarel, quien se distingue por su
                vocación de servicio y profesionalismo.
              </p>
              
              <p>
                Nuestra práctica se basa en el respeto por la singularidad de cada persona y en la convicción 
                de que toda experiencia de aprendizaje puede potenciarse a través del acompañamiento 
                adecuado.
              </p>
              
              <p>
                Trabajamos desde una perspectiva psicopedagógica y neurocognitiva, integrando aportes de 
                la educación, la psicología y las neurociencias para desarrollar procesos de evaluación, 
                orientación e intervención que promuevan el bienestar, la autonomía y la construcción de 
                estrategias que fortalezcan los recursos personales y familiares.
              </p>

              <p>
                Sostenemos una práctica ética, reflexiva y colaborativa, que valora la 
                diversidad, el trabajo interdisciplinario y el aprendizaje a lo largo de la vida.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <credential.icon className="w-5 h-5 text-trust" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {credential.title}
                    </h3>
                    <p className="text-small text-muted-foreground">
                      {credential.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={laura}
                alt="Equipo profesional de psicología"
                className="w-full max-w-md mx-auto rounded-2xl gentle-shadow"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-trust/10 rounded-full -z-10"></div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-trust/5 rounded-2xl border border-primary/10">
            <h3 className="text-subheading text-foreground mb-4">
              Nuestra Filosofía
            </h3>
            <p className="text-body text-muted-foreground">
               "Equipo PSIP adopta una mirada integral del aprendizaje y respeta la singularidad de 
               cada persona. Desde un enfoque psicopedagógico y neurocognitivo, articula educación, 
               psicología y neurociencias para evaluar, orientar e intervenir en el bienestar y desarrollo de la autonomía. 
               Su práctica se basa en la ética, la colaboración y la valoración de la diversidad y el aprendizaje continuo."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;