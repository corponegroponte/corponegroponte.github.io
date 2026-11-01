import { useEffect, useState, useId } from "react";
import { 
  Sun, 
  Code, 
  TrendingUp, 
  Award, 
  Compass, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Menu,
  X
} from "lucide-react";
import { toast } from "sonner";

// Imágenes reales de la Corporación, empaquetadas localmente en el bundle.
// Antes apuntaban a /manus-storage/*.jpg, un proxy disponible solo dentro de Manus.
import solarParkImage from "@/assets/solar-park.webp";
import codingEducationImage from "@/assets/coding-education.webp";
import projectAdvisoryImage from "@/assets/project-advisory.webp";
import youthScienceImage from "@/assets/youth-science.webp";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    asunto: "",
  });

  const [imagesReady, setImagesReady] = useState(false);

  // La página espera a que estén cargadas todas las imágenes antes de mostrarse.
  useEffect(() => {
    const sources = [
      "/favicon.png",
      solarParkImage,
      codingEducationImage,
      projectAdvisoryImage,
      youthScienceImage,
    ];
    let cancelled = false;

    Promise.all(
      sources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setImagesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const emailId = useId();
  const nombreId = useId();
  const empresaId = useId();
  const asuntoId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.nombre || !formData.asunto) {
      toast.error("Por favor completa los campos requeridos para enviar tu mensaje.");
      return;
    }
    setFormSubmitted(true);
    toast.success("¡Mensaje preparado! Nos pondremos en contacto prontamente.");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2E2C2A] flex flex-col font-sans selection:bg-[#87BF34] selection:text-[#262626]">
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#FFFFFF] transition-opacity duration-700 ease-out ${
          imagesReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        role="status"
        aria-live="polite"
        aria-hidden={imagesReady}
      >
        <img src="/favicon.png" alt="" className="w-14 h-14 animate-pulse" />
        <span className="text-[13px] text-[#8A807B]">Cargando…</span>
      </div>

      {imagesReady && (
        <>
          <div className="reveal-glow" aria-hidden="true" />
          <div className="reveal-sweep" aria-hidden="true" />
        </>
      )}

      <div
        className={`flex flex-1 flex-col transition-[opacity,transform] duration-[900ms] ease-out ${
          imagesReady ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
      {/* 1. NAVEGACIÓN PRIMARIA (primary-nav) */}
      <header className="sticky top-0 z-50 bg-[#262626] border-b border-[#333333] h-16 transition-all duration-200">
        <div className="container h-full flex items-center justify-between">
          {/* Brand Wordmark & Isotipo */}
          <a href="#" className="flex items-center gap-3 group text-decoration-none">
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-150 group-hover:scale-95">
              <img
                src="/favicon.png"
                alt="Corporación Nicholas Negroponte"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#FFFFFF] font-bold text-[15px] sm:text-[16px] tracking-tight leading-tight uppercase">
                Corporación Nicholas Negroponte
              </span>
              <span className="text-[#B9ABA8] text-[11px] font-normal tracking-wide hidden sm:block">
                Investigación · Innovación · Transición Energética
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#quienes-somos" 
              className="text-[#FFFFFF] text-[15px] font-bold hover:text-[#87BF34] transition-colors"
            >
              ¿Quiénes somos?
            </a>
            <a 
              href="#proyectos" 
              className="text-[#FFFFFF] text-[15px] font-bold hover:text-[#87BF34] transition-colors"
            >
              Nuestros Proyectos
            </a>
            <a 
              href="#parque-solar" 
              className="text-[#FFFFFF] text-[15px] font-bold hover:text-[#87BF34] transition-colors"
            >
              Parque Solar
            </a>
            <a 
              href="#contacto" 
              className="text-[#FFFFFF] text-[15px] font-bold hover:text-[#87BF34] transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* CTA Pill Nav (Única pastilla permitida por el sistema de diseño) */}
          <div className="hidden md:block">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-5 py-2.5 text-[14.4px] font-bold text-[#FFFFFF] border border-[#B9ABA8] rounded-full hover:bg-[#87BF34] hover:text-[#262626] hover:border-[#87BF34] transition-all duration-200 active:scale-95"
            >
              Contáctanos
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="md:hidden text-[#FFFFFF] p-2 hover:text-[#87BF34]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#262626] border-b border-[#333333] px-6 py-5 flex flex-col gap-4 shadow-xl">
            <a 
              href="#quienes-somos" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FFFFFF] font-bold text-[16px] py-1 border-b border-[#333333]"
            >
              ¿Quiénes somos?
            </a>
            <a 
              href="#proyectos" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FFFFFF] font-bold text-[16px] py-1 border-b border-[#333333]"
            >
              Nuestros Proyectos
            </a>
            <a 
              href="#parque-solar" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FFFFFF] font-bold text-[16px] py-1 border-b border-[#333333]"
            >
              Parque Solar José María Córdova
            </a>
            <a 
              href="#contacto" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FFFFFF] font-bold text-[16px] py-1"
            >
              Contacto
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-[14px] font-bold bg-[#87BF34] text-[#262626] rounded-full mt-2"
            >
              Anímate. Contáctanos
            </a>
          </div>
        )}
      </header>

      {/* 2. SUB-NAV STRIP (sub-nav-strip: fondo #F6F5F1, texto #262626, altura 56px) */}
      <div className="bg-[#F6F5F1] border-b border-[#E5E2DE] py-3.5 hidden sm:block">
        <div className="container flex items-center justify-between text-[13px] sm:text-[14px] text-[#262626]">
          <div className="flex items-center gap-6">
            <span className="font-bold text-[#56732C] flex items-center gap-1.5 uppercase tracking-wider text-[12px]">
              <span className="w-2 h-2 bg-[#87BF34] inline-block rounded-none"></span>
              Líneas Activas:
            </span>
            <a href="#parque-solar" className="hover:text-[#56732C] transition-colors">Energía Solar 10 MW</a>
            <span className="text-[#B9ABA8]">·</span>
            <a href="#proyectos" className="hover:text-[#56732C] transition-colors">Capacitación en Programación</a>
            <span className="text-[#B9ABA8]">·</span>
            <a href="#proyectos" className="hover:text-[#56732C] transition-colors">Financiamiento de Proyectos</a>
            <span className="text-[#B9ABA8]">·</span>
            <a href="#proyectos" className="hover:text-[#56732C] transition-colors">Semilleros Científicos</a>
          </div>
          <div className="text-[#8A807B] text-[13px] font-medium hidden lg:block">
            Personería Jurídica desde Abril de 2019 · Envigado, Antioquia
          </div>
        </div>
      </div>

      {/* 3. CAPÍTULO HERO OSCURO (hero-card-dark: #262626 con overlay) */}
      <section className="relative bg-[#262626] text-[#FFFFFF] py-20 lg:py-28 overflow-hidden border-b border-[#333333]">
        {/* Background Image con overlay de gradiente oscuro */}
        <div className="absolute inset-0 z-0">
          <img 
            src={solarParkImage} 
            alt="Parque Solar de la Corporación Nicholas Negroponte" 
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#262626] via-[#262626]/85 to-[#262626]/60"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Tag on Dark badge */}
            <div className="inline-flex items-center gap-2 bg-[#333333] border border-[#B9ABA8]/30 px-3 py-1 rounded-[2px] mb-6">
              <span className="w-2.5 h-2.5 bg-[#87BF34] rounded-none"></span>
              <span className="text-[#B9ABA8] text-[12px] font-bold tracking-widest uppercase">
                Ciencia · Innovación · Transición Energética
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.15] text-[#FFFFFF] mb-6 tracking-tight">
              Investigación, Desarrollo y Soluciones Solares para Colombia
            </h1>

            <p className="text-[17px] sm:text-[19px] text-[#B9ABA8] leading-relaxed mb-8 max-w-2xl font-normal">
              Corporación para la Investigación, Innovación, Desarrollo y Divulgación Científica - Nicholas Negroponte. 
              Impulsamos la transición energética y el talento tecnológico con sello antioqueño.
            </p>

            {/* CTAs: button-primary + button-outline-on-dark */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#contacto" 
                className="inline-flex items-center justify-center h-11 px-6 bg-[#87BF34] text-[#262626] text-[16px] font-bold rounded-[2px] hover:bg-[#7DA641] active:bg-[#56732C] active:text-[#FFFFFF] transition-all duration-150"
              >
                Anímate. Contáctanos
              </a>
              <a 
                href="#parque-solar" 
                className="inline-flex items-center justify-center h-11 px-5 border border-[#B9ABA8] text-[#FFFFFF] text-[16px] font-bold rounded-[2px] hover:bg-[#333333] transition-all duration-150 gap-2"
              >
                Conoce el Parque Solar (10 MW)
                <ArrowRight className="w-4 h-4 text-[#87BF34]" />
              </a>
            </div>

            {/* Stats Callouts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-[#333333]/80">
              <div>
                <div className="text-[36px] font-bold text-[#87BF34] leading-tight tnum">
                  10 MW
                </div>
                <div className="text-[13px] text-[#B9ABA8] uppercase tracking-wider font-semibold mt-1">
                  Capacidad de Generación
                </div>
              </div>
              <div>
                <div className="text-[36px] font-bold text-[#FFFFFF] leading-tight tnum">
                  2019
                </div>
                <div className="text-[13px] text-[#B9ABA8] uppercase tracking-wider font-semibold mt-1">
                  Personería Jurídica
                </div>
              </div>
              <div>
                <div className="text-[36px] font-bold text-[#87BF34] leading-tight tnum">
                  100%
                </div>
                <div className="text-[13px] text-[#B9ABA8] uppercase tracking-wider font-semibold mt-1">
                  Inversión Privada
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN ¿QUIÉNES SOMOS? (Cuerpo Claro #FFFFFF con ritmo editorial) */}
      <section id="quienes-somos" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E2DE]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[#87BF34] rounded-none"></span>
                <span className="text-[13px] font-bold text-[#8A807B] uppercase tracking-widest">
                  Sobre Nosotros
                </span>
              </div>

              <h2 className="text-[32px] sm:text-[38px] font-bold text-[#262626] mb-6 leading-tight">
                ¿Quiénes somos?
              </h2>

              <div className="text-[17px] text-[#2E2C2A] leading-relaxed space-y-5">
                <p>
                  Somos la <strong className="font-bold text-[#262626]">Corporación para la Investigación, Innovación, Desarrollo y Divulgación Científica - Nicholas Negroponte</strong>, un sueño que echó raíces en <strong className="text-[#262626]">Envigado, Antioquia</strong>, y que se hizo realidad en <strong className="text-[#262626]">abril de 2019</strong>, cuando obtuvimos nuestra Personería Jurídica.
                </p>
                <p>
                  Somos antioqueños de pura cepa, orgullosos de esta tierra de montañas y de su gente trabajadora, con esa calidez que nos brota del alma. Nuestra esencia es impulsar la <strong className="text-[#262626]">investigación científica</strong>, la <strong className="text-[#262626]">innovación</strong> y el <strong className="text-[#262626]">desarrollo tecnológico</strong>, siempre buscando que el conocimiento llegue a todos y transforme vidas.
                </p>
              </div>

              {/* Callout feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#E5E2DE]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-[#F6F5F1] border border-[#87BF34] flex items-center justify-center rounded-[2px] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#56732C]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#262626]">Origen Envigado</h4>
                    <p className="text-[14px] text-[#8A807B]">Raíces antioqueñas con alcance y visión transformadora nacional.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-[#F6F5F1] border border-[#87BF34] flex items-center justify-center rounded-[2px] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#56732C]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#262626]">Personería Jurídica</h4>
                    <p className="text-[14px] text-[#8A807B]">Constitución legal formal otorgada en abril del año 2019.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#F6F5F1] border border-[#E5E2DE] p-8 rounded-[2px]">
                {/* Corner Square institucional de marca */}
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#87BF34]"></div>

                <div className="text-[13px] font-bold text-[#56732C] uppercase tracking-wider mb-2">
                  Nuestra Esencia
                </div>
                <h3 className="text-[22px] font-bold text-[#262626] mb-4 leading-snug">
                  Ciencia que transforma vidas y abre caminos de progreso
                </h3>
                <p className="text-[15px] text-[#2E2C2A] leading-relaxed mb-6">
                  Conectamos la ingeniería aplicada, la infraestructura solar a gran escala y la democratización del código computacional para acelerar el desarrollo del país.
                </p>

                <div className="space-y-3 border-t border-[#E5E2DE] pt-5">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#8A807B]">Sede Legal y Origen</span>
                    <span className="font-bold text-[#262626]">Envigado, Antioquia</span>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#8A807B]">Área Estratégica</span>
                    <span className="font-bold text-[#262626]">Energías Renovables & TI</span>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#8A807B]">Modelo de Financiamiento</span>
                    <span className="font-bold text-[#262626]">Inversión Privada Directa</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E2DE]">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-[15px] font-bold text-[#56732C] hover:text-[#7DA641] transition-colors"
                  >
                    Contáctanos directamente <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN ESTRELLA: PARQUE SOLAR JOSÉ MARÍA CÓRDOVA */}
      <section id="parque-solar" className="py-20 lg:py-24 bg-[#F6F5F1] border-b border-[#E5E2DE]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-[#87BF34] rounded-none"></span>
              <span className="text-[13px] font-bold text-[#8A807B] uppercase tracking-widest">
                Proyecto Estrella · Soluciones Solares
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-[#262626] leading-tight">
              Parque Solar José María Córdova
            </h2>
            <p className="text-[16px] text-[#8A807B] mt-2 font-medium">
              Estructuración técnica e inversión privada para la transición energética de Colombia.
            </p>
          </div>

          {/* Main Grid: Card con imagen + Detalles de Ingeniería */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Visual Card con Corner Square */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] overflow-hidden flex flex-col relative">
              {/* Corner Square */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 bg-[#87BF34] z-10"></div>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#262626]">
                <img 
                  src={solarParkImage} 
                  alt="Parque Solar José María Córdova" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                />
                <div className="absolute bottom-3 left-3 bg-[#262626]/90 text-[#FFFFFF] text-[12px] font-bold px-3 py-1 border border-[#333333] rounded-[2px]">
                  Cundinamarca, Colombia · Generación Fotovoltaica
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="prose text-[#2E2C2A] text-[16px] leading-relaxed space-y-4">
                  <p>
                    Nuestro proyecto estrella es el <strong className="font-bold text-[#262626]">Parque Solar José María Córdova</strong>, una iniciativa <strong className="font-bold text-[#262626]">100% nuestra</strong> que nos llena de alegría. Ubicado en el departamento de <strong className="font-bold text-[#262626]">Cundinamarca</strong>, este Parque, en su etapa operativa, generará <strong className="font-bold text-[#262626]">energías limpias</strong> con paneles solares.
                  </p>
                  <p>
                    Es un proyecto que llegará a la realidad gracias al esfuerzo de <strong className="font-bold text-[#262626]">antioqueños</strong> que, desde nuestras distintas capacidades, nos unimos para contribuir a la <strong className="font-bold text-[#262626]">transición energética</strong> del país.
                  </p>
                  <p>
                    Con una capacidad aproximada para generar <strong className="font-bold text-[#262626]">10 MW</strong> y financiado totalmente con <strong className="font-bold text-[#262626]">inversión privada</strong>, es una prueba de lo que podemos lograr cuando soñamos en grande y trabajamos juntos.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E2DE] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[14px] text-[#8A807B]">
                    Etapa: <strong className="text-[#262626]">Estructuración e Implementación</strong>
                  </span>
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-[#87BF34] text-[#262626] font-bold text-[14.4px] rounded-[2px] hover:bg-[#7DA641] transition-all"
                  >
                    Consultar este proyecto
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Ficha técnica y características regulatorias/operativas */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Card 1: Métricas Clave */}
              <div className="bg-[#FFFFFF] border border-[#E5E2DE] p-6 rounded-[2px] relative">
                <div className="absolute top-0 right-0 w-3 h-3 bg-[#87BF34]"></div>
                <h4 className="text-[14px] font-bold text-[#8A807B] uppercase tracking-wider mb-4">
                  Ficha Técnica Resumida
                </h4>
                <div className="space-y-4">
                  <div className="border-b border-[#E5E2DE] pb-3">
                    <span className="text-[13px] text-[#8A807B] block">Capacidad Instalada Estimada</span>
                    <span className="text-[28px] font-bold text-[#262626] tnum">~10 MW</span>
                  </div>
                  <div className="border-b border-[#E5E2DE] pb-3">
                    <span className="text-[13px] text-[#8A807B] block">Ubicación Estratégica</span>
                    <span className="text-[17px] font-bold text-[#262626]">Departamento de Cundinamarca</span>
                  </div>
                  <div className="border-b border-[#E5E2DE] pb-3">
                    <span className="text-[13px] text-[#8A807B] block">Origen del Capital</span>
                    <span className="text-[17px] font-bold text-[#262626]">100% Inversión Privada</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-[#8A807B] block">Impacto Ambiental</span>
                    <span className="text-[17px] font-bold text-[#56732C]">Generación Limpia Fotovoltaica</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Marco y Respaldo de Ingeniería */}
              <div className="bg-[#FFFFFF] border border-[#E5E2DE] p-6 rounded-[2px] relative flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-[#87BF34]" />
                  <h4 className="text-[16px] font-bold text-[#262626]">Aporte a la Transición Energética</h4>
                </div>
                <p className="text-[14px] text-[#2E2C2A] leading-relaxed mb-4">
                  El parque está concebido para robustecer la matriz energética limpia de Colombia, optimizando la radiación solar y sumando capacidades técnicas interdisciplinarias de ingeniería.
                </p>
                <div className="bg-[#F6F5F1] p-4 border border-[#E5E2DE] text-[13px] text-[#8A807B]">
                  <strong className="text-[#262626] block mb-1">Compromiso Corporativo:</strong>
                  Demostrar la viabilidad del capital privado articulado con rigor científico y responsabilidad socioambiental.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN NUESTROS PROYECTOS (Líneas de Capacitación, Finanzas e Innovación) */}
      <section id="proyectos" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E2DE]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[#87BF34] rounded-none"></span>
                <span className="text-[13px] font-bold text-[#8A807B] uppercase tracking-widest">
                  Capacidades y Programas
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#262626] leading-tight">
                Nuestros Proyectos
              </h2>
            </div>
            <p className="text-[15px] text-[#8A807B] max-w-md mt-4 md:mt-0 font-normal">
              Iniciativas de formación, estructuración financiera y proyección de las nuevas generaciones científicas.
            </p>
          </div>

          {/* Grid de 3 tarjetas de producto/proyecto (product-card) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Capacitación en Programación */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] overflow-hidden flex flex-col relative group hover:border-[#B9ABA8] transition-colors">
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#87BF34] z-10"></div>
              
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#262626]">
                <img 
                  src={codingEducationImage} 
                  alt="Capacitación en Programación" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[12px] font-bold text-[#56732C] uppercase tracking-wider mb-2">
                    Formación de Talento
                  </div>
                  <h3 className="text-[20px] font-bold text-[#262626] mb-3 leading-snug">
                    Capacitación en Programación
                  </h3>
                  <div className="text-[15px] text-[#2E2C2A] leading-relaxed space-y-3">
                    <p>
                      Creemos que el <strong className="font-bold text-[#262626]">conocimiento</strong> es la base de todo cambio, por eso capacitamos a <strong className="font-bold text-[#262626]">jóvenes y adultos</strong> en programación. Sabemos que este saber es clave para el <strong className="font-bold text-[#262626]">futuro</strong> y que, al dominarlo, más colombianos pueden ser parte de una <strong className="font-bold text-[#262626]">transformación científica</strong> que nos impulse como sociedad.
                    </p>
                    <p>
                      Desde <strong className="font-bold text-[#262626]">Antioquia</strong>, queremos abrir puertas y dar herramientas para que el <strong className="font-bold text-[#262626]">talento</strong> de nuestra gente florezca.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E2DE]">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#56732C] hover:text-[#7DA641] transition-colors"
                  >
                    Ver detalle e inscribirme <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Asesoría para Financiamiento de Proyectos */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] overflow-hidden flex flex-col relative group hover:border-[#B9ABA8] transition-colors">
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#87BF34] z-10"></div>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#262626]">
                <img 
                  src={projectAdvisoryImage} 
                  alt="Asesoría para Financiamiento de Proyectos" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[12px] font-bold text-[#56732C] uppercase tracking-wider mb-2">
                    Estructuración de Capital
                  </div>
                  <h3 className="text-[20px] font-bold text-[#262626] mb-3 leading-snug">
                    Asesoría para Financiamiento de Proyectos
                  </h3>
                  <div className="text-[15px] text-[#2E2C2A] leading-relaxed space-y-3">
                    <p>
                      Acompañamos a <strong className="font-bold text-[#262626]">emprendedores</strong> que sueñan con <strong className="font-bold text-[#262626]">proyectos de innovación, desarrollo tecnológico e ingeniería</strong>. Les ofrecemos <strong className="font-bold text-[#262626]">asesorías</strong> para que encuentren el <strong className="font-bold text-[#262626]">financiamiento</strong> que necesitan y vean sus ideas hacerse realidad.
                    </p>
                    <p>
                      Nos emociona ser ese <strong className="font-bold text-[#262626]">apoyo</strong> que, desde nuestra tierra, ayuda a que el <strong className="font-bold text-[#262626]">ingenio colombiano</strong> llegue lejos.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E2DE]">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#56732C] hover:text-[#7DA641] transition-colors"
                  >
                    Solicitar asesoría <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Participación de Niños y Jóvenes en Competencias */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] overflow-hidden flex flex-col relative group hover:border-[#B9ABA8] transition-colors">
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#87BF34] z-10"></div>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#262626]">
                <img 
                  src={youthScienceImage} 
                  alt="Participación de Niños y Jóvenes en Competencias" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
                <div className="absolute top-3 right-3 bg-[#262626]/85 text-[#87BF34] text-[11px] font-bold px-2.5 py-1 border border-[#333333] rounded-[2px]">
                  PRÓXIMAMENTE
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[12px] font-bold text-[#56732C] uppercase tracking-wider mb-2">
                    Semillero de Futuro
                  </div>
                  <h3 className="text-[20px] font-bold text-[#262626] mb-3 leading-snug">
                    Participación de Niños y Jóvenes en Competencias
                  </h3>
                  <div className="text-[15px] text-[#2E2C2A] leading-relaxed space-y-3">
                    <p>
                      Mirando al futuro, planeamos formar <strong className="font-bold text-[#262626]">equipos de niños y jóvenes</strong> para que participen en <strong className="font-bold text-[#262626]">competencias</strong> donde el <strong className="font-bold text-[#262626]">pensamiento científico</strong> sea el protagonista.
                    </p>
                    <p>
                      Confiamos en su <strong className="font-bold text-[#262626]">potencial</strong> y queremos que, con nuestro respaldo, sean ellos quienes lleven la <strong className="font-bold text-[#262626]">bandera de la ciencia</strong> y el <strong className="font-bold text-[#262626]">orgullo patrio</strong> a nuevos horizontes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E2DE]">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#56732C] hover:text-[#7DA641] transition-colors"
                  >
                    Sumarse a la iniciativa <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BANDA EDITORIAL / MANIFIESTO (cta-strip-dark: #262626 con texto blanco y acento verde) */}
      <section className="bg-[#262626] text-[#FFFFFF] py-16 lg:py-20 border-y border-[#333333] relative">
        <div className="container text-center max-w-4xl mx-auto">
          <div className="w-4 h-4 bg-[#87BF34] mx-auto mb-6"></div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-bold leading-snug text-[#FFFFFF] mb-6">
            Así, con el corazón en el PAIS-A y los pies firmes en nuestra Colombia, seguimos construyendo un camino de progreso para todos.
          </h2>
          <p className="text-[#B9ABA8] text-[16px] sm:text-[18px] max-w-2xl mx-auto mb-8">
            Corporación Nicholas Negroponte: articulando la ingeniería de transición energética con el empuje de nuestra tierra.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#87BF34] text-[#262626] text-[16px] font-bold rounded-[2px] hover:bg-[#7DA641] active:bg-[#56732C] active:text-[#FFFFFF] transition-all duration-150"
          >
            Anímate. Contáctanos
          </a>
        </div>
      </section>

      {/* 8. SECCIÓN CONTACTO (Formulario exacto: Correo Electrónico, Nombre, Empresa o Negocio, Asunto, Enviar) */}
      <section id="contacto" className="py-20 lg:py-24 bg-[#FFFFFF]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[#87BF34] rounded-none"></span>
                <span className="text-[13px] font-bold text-[#8A807B] uppercase tracking-widest">
                  Canal Directo
                </span>
              </div>
              <h2 className="text-[34px] sm:text-[42px] font-bold text-[#262626] mb-3">
                Anímate. Contáctanos
              </h2>
              <p className="text-[16px] text-[#8A807B]">
                Cuéntanos sobre tu iniciativa, propuesta energética o interés en nuestros programas científicos.
              </p>
            </div>

            <div className="bg-[#F6F5F1] border border-[#E5E2DE] p-8 sm:p-12 rounded-[2px] relative">
              {/* Corner Square */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#87BF34]"></div>

              {formSubmitted ? (
                <div className="bg-[#FFFFFF] border border-[#7DA641] p-8 rounded-[2px] text-center">
                  <div className="w-12 h-12 bg-[#87BF34]/20 border border-[#87BF34] rounded-[2px] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#56732C]" />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#262626] mb-2">¡Gracias por contactarnos!</h3>
                  <p className="text-[16px] text-[#2E2C2A] max-w-md mx-auto mb-6">
                    Hemos recibido la información de <strong>{formData.nombre}</strong>. Nos pondremos en comunicación contigo a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ nombre: "", email: "", empresa: "", asunto: "" });
                    }}
                    className="inline-flex items-center justify-center h-11 px-6 bg-[#262626] text-[#FFFFFF] text-[15px] font-bold rounded-[2px] hover:bg-[#333333]"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Campo: Nombre */}
                    <div>
                      <label htmlFor={nombreId} className="block text-[14px] font-bold text-[#262626] mb-2">
                        Nombre: <span className="text-[#87BF34]">*</span>
                      </label>
                      <input
                        id={nombreId}
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu nombre y apellido"
                        className="w-full h-11 px-4 bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] text-[15px] text-[#262626] focus:outline-none focus:border-2 focus:border-[#87BF34] transition-all"
                      />
                    </div>

                    {/* Campo: Correo Electrónico */}
                    <div>
                      <label htmlFor={emailId} className="block text-[14px] font-bold text-[#262626] mb-2">
                        Correo Electrónico: <span className="text-[#87BF34]">*</span>
                      </label>
                      <input
                        id={emailId}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu-correo@empresa.com"
                        className="w-full h-11 px-4 bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] text-[15px] text-[#262626] focus:outline-none focus:border-2 focus:border-[#87BF34] transition-all"
                      />
                    </div>
                  </div>

                  {/* Campo: Empresa o Negocio */}
                  <div>
                    <label htmlFor={empresaId} className="block text-[14px] font-bold text-[#262626] mb-2">
                      Empresa o Negocio:
                    </label>
                    <input
                      id={empresaId}
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Nombre de tu organización, emprendimiento o proyecto"
                      className="w-full h-11 px-4 bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] text-[15px] text-[#262626] focus:outline-none focus:border-2 focus:border-[#87BF34] transition-all"
                    />
                  </div>

                  {/* Campo: Asunto */}
                  <div>
                    <label htmlFor={asuntoId} className="block text-[14px] font-bold text-[#262626] mb-2">
                      Asunto: <span className="text-[#87BF34]">*</span>
                    </label>
                    <textarea
                      id={asuntoId}
                      rows={4}
                      required
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                      placeholder="Describe tu consulta sobre el Parque Solar, capacitación en programación o asesoría para financiamiento..."
                      className="w-full p-4 bg-[#FFFFFF] border border-[#E5E2DE] rounded-[2px] text-[15px] text-[#262626] focus:outline-none focus:border-2 focus:border-[#87BF34] transition-all resize-y"
                    ></textarea>
                  </div>

                  {/* Botón: Enviar */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 bg-[#87BF34] text-[#262626] text-[16px] font-bold rounded-[2px] hover:bg-[#7DA641] active:bg-[#56732C] active:text-[#FFFFFF] transition-all duration-150"
                    >
                      Enviar mensaje
                    </button>
                    <span className="block sm:inline-block sm:ml-4 text-[13px] text-[#8A807B] mt-2 sm:mt-0">
                      Respuesta en menos de 24 horas hábiles.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER CORPORATIVO (footer-section: #262626 con texto #B9ABA8) */}
      <footer className="bg-[#262626] text-[#B9ABA8] pt-16 pb-12 border-t border-[#333333]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#333333]">
            {/* Columna 1: Identidad Corporativa */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.png"
                  alt="Corporación Nicholas Negroponte"
                  className="w-7 h-7 object-contain"
                />
                <span className="text-[#FFFFFF] font-bold text-[17px] tracking-tight uppercase">
                  Corporación Nicholas Negroponte
                </span>
              </div>
              <p className="text-[14px] leading-relaxed text-[#B9ABA8] max-w-md">
                Corporación para la Investigación, Innovación, Desarrollo y Divulgación Científica - Nicholas Negroponte.
                Entidad sin ánimo de lucro constituida en Envigado, Antioquia, comprometida con el progreso energético y científico de Colombia.
              </p>
              <div className="text-[13px] text-[#B9ABA8]">
                <strong>Personería Jurídica:</strong> Otorgada en abril de 2019
              </div>
            </div>

            {/* Columna 2: Proyectos y Áreas */}
            <div>
              <h4 className="text-[#FFFFFF] text-[15px] font-bold uppercase tracking-wider mb-4">
                Proyectos
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                <li>
                  <a href="#parque-solar" className="hover:text-[#87BF34] transition-colors">
                    Parque Solar José María Córdova (10 MW)
                  </a>
                </li>
                <li>
                  <a href="#proyectos" className="hover:text-[#87BF34] transition-colors">
                    Capacitación en Programación
                  </a>
                </li>
                <li>
                  <a href="#proyectos" className="hover:text-[#87BF34] transition-colors">
                    Asesoría de Financiamiento
                  </a>
                </li>
                <li>
                  <a href="#proyectos" className="hover:text-[#87BF34] transition-colors">
                    Semillero de Ciencias y Jóvenes
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Ubicación y Contacto */}
            <div>
              <h4 className="text-[#FFFFFF] text-[15px] font-bold uppercase tracking-wider mb-4">
                Ubicación
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#87BF34] shrink-0 mt-0.5" />
                  <span>Envigado, Antioquia, Colombia</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sun className="w-4 h-4 text-[#87BF34] shrink-0 mt-0.5" />
                  <span>Cundinamarca (Parque Solar)</span>
                </li>
                <li className="pt-2">
                  <a 
                    href="#contacto" 
                    className="inline-flex items-center gap-1.5 text-[#87BF34] font-bold hover:underline"
                  >
                    Escríbenos directamente <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Información legal: transparencia para Google for Nonprofits */}
          <div className="mt-12 pt-8 border-t border-[#333333] text-[12px] leading-relaxed text-[#B9ABA8]">
            <h4 className="text-[#FFFFFF] text-[13px] font-bold uppercase tracking-wider mb-4">
              Información legal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-1">
                <p className="text-[#FFFFFF] text-[11px] font-bold uppercase tracking-wider">
                  Entidad
                </p>
                <p>
                  Corporación para la Investigación, Innovación, Desarrollo y Divulgación
                  Científica — Nicholas Negroponte.
                </p>
                <p>Entidad sin ánimo de lucro.</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#FFFFFF] text-[11px] font-bold uppercase tracking-wider">
                  Datos legales
                </p>
                <p>NIT: 901.275.658-4</p>
                <p>Personería jurídica: abril de 2019</p>
                <p>Envigado, Antioquia, Colombia</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#FFFFFF] text-[11px] font-bold uppercase tracking-wider">
                  Contacto
                </p>
                <p>
                  Desarrollador:{" "}
                  <a
                    href="mailto:riverosmejiamiguel@gmail.com"
                    className="hover:text-[#87BF34] transition-colors"
                  >
                    riverosmejiamiguel@gmail.com
                  </a>
                </p>
                <p>
                  Representante legal:{" "}
                  <a
                    href="mailto:caromejiaopro@gmail.com"
                    className="hover:text-[#87BF34] transition-colors"
                  >
                    caromejiaopro@gmail.com
                  </a>
                </p>
                <p>
                  Sitio oficial:{" "}
                  <a
                    href="https://corponegroponte.org"
                    className="hover:text-[#87BF34] transition-colors"
                  >
                    corponegroponte.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Declaración */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#8A807B] gap-4">
            <div>
              © {new Date().getFullYear()} Corporación Nicholas Negroponte. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-6">
              <span>
                Desarrollado por{" "}
                <a
                  href="https://github.com/riverosmejia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B9ABA8] hover:text-[#87BF34] transition-colors"
                >
                  Miguel Riveros
                </a>
              </span>
              <span className="hidden md:inline">·</span>
              <span className="text-[#B9ABA8]">Transición Energética & Ciencia</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
