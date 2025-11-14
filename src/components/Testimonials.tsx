"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/config/spabaseClient";
import { set } from "date-fns";
import { toast } from "sonner";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const initialReviews = [
  {
    name: "María González",
    location: "Bahía Blanca",
    body: "El acompañamiento que recibí fue excepcional. Me ayudaron a superar un momento muy difícil en mi vida y a desarrollar herramientas que sigo usando hoy en día.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    location: "Bahía Blanca",
    body: "Las sesiones online fueron muy efectivas. La profesionalidad y calidez humana del equipo me permitieron sentirme cómodo desde el primer encuentro.",
    rating: 5,
  },
  {
    name: "Ana López",
    location: "Bahía Blanca",
    body: "Excelente atención. Me ayudaron con mis niveles de ansiedad y ahora puedo manejar mejor las situaciones estresantes. Muy recomendable.",
    rating: 5,
  },
  {
    name: "Jorge Martínez",
    location: "Bahía Blanca",
    body: "La terapia de pareja nos ayudó enormemente. Aprendimos a comunicarnos mejor y a fortalecer nuestra relación. Estamos muy agradecidos.",
    rating: 5,
  },
  {
    name: "Lucía Fernández",
    location: "Bahía Blanca",
    body: "Un espacio seguro donde pude expresar mis emociones sin juicios. El proceso terapéutico cambió mi perspectiva de vida de manera positiva.",
    rating: 5,
  },
  {
    name: "Roberto Silva",
    location: "Bahía Blanca",
    body: "Profesionales muy capacitados. La terapia me ayudó a gestionar el estrés laboral y mejorar mi calidad de vida significativamente.",
    rating: 5,
  },
  {
    name: "Patricia Morales",
    location: "Bahía Blanca",
    body: "Mi hijo adolescente encontró en este equipo el apoyo que necesitaba. Excelente trabajo con jóvenes y familias.",
    rating: 5,
  },
  {
    name: "Alejandro Castro",
    location: "Bahía Blanca",
    body: "Las técnicas de mindfulness que aprendí han sido fundamentales para mi bienestar. Recomiendo ampliamente sus servicios.",
    rating: 5,
  },
];

const firstRow = initialReviews.slice(0, initialReviews.length / 2);
const secondRow = initialReviews.slice(initialReviews.length / 2);

const ReviewCard = ({ name, location, body, rating }) => {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <figcaption className="text-lg font-semibold">{name}</figcaption>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
        {/* Content */}
        <blockquote className="mt-3 text-sm text-gray-700 italic">"{body}"</blockquote>
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              fill={rating >= star ? "currentColor" : "none"}
              stroke="currentColor"
              className={`cursor-pointer transition-colors ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </figure>
  );
};

export default function Testimonials() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    body: "",
    rating: 5,
  });
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order("id", { ascending: false });
        
      if (error) {
        console.log("Error fetching testimonials:", error);
        setReviews(null);
      }
      if (data) {
        setReviews(data);

      }
      
    } 
    fetchTestimonials();
        
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(!auth.isAuthenticated){ 
        navigate('/login');
      }else{
        if (!formData.name || !formData.body) return;

        const initials = formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        const { data, error } = await supabase
          .from('testimonials')
          .insert([{
            name: formData.name,
            location: formData.location,
            body: formData.body,
            rating: formData.rating,
          }])
          .select();
        if (error) {
          console.log("Error submitting testimonial:", error);
          return;
        }
        if (data) {
          console.log("Testimonial submitted:", data);
          const newReview = {
            ...formData, initials
          };

          setReviews([newReview, ...reviews]);
          setFormData({ name: "", location: "", body: "", rating: 5 });
          setShowForm(false);
          toast({
            title: "¡Gracias por tu opinión!",
            description: "Tu reseña ha sido enviada con éxito.",
            duration: 3000,
          });

        }
     }
    } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al enviar tu opinión. Por favor, intentá nuevamente.",
          duration: 3000,
        });
      return;
    }
  };

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">

      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Opiniones de Nuestros Clientes
      </h2>

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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/100 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background via-background/100 to-transparent"></div>
      </div>


      {/* Botón que despliega el formulario */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {showForm ? "Cerrar formulario" : "Dejá tu opinión"}
        </button>
      </div>

      {/* Formulario expandible con animación */}
      <div
        className={`transition-all duration-500 overflow-hidden ${showForm ? "max-h-[1000px] mt-6 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">
            Contanos tu experiencia
          </h3>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Ciudad (opcional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />
          <textarea
            name="body"
            placeholder="Tu opinión"
            value={formData.body}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            rows={3}
          />
          <div className="flex flex-row items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`cursor-pointer transition-colors ${formData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Enviar reseña
          </button>
        </form>
      </div>
    </div>
  );
}
