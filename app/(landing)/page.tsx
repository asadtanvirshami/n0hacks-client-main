"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/hooks/language";

const WEBSITE_URL = "https://n0hacks.com";
const DEFAULT_LEAD_RECIPIENT_EMAIL = "muhd.sami987@gmail.com";

const footerParticles = Array.from({ length: 24 }, (_, index) => ({
  top: `${(index * 19) % 100}%`,
  left: `${(index * 37) % 100}%`,
}));

const pageContent = {
  en: {
    headerVisit: "Visit N0hacks",
    nav: {
      whoWeAre: "Who We Are",
      whatWeProvide: "What We Provide",
      pricing: "Pricing",
    },
    hero: {
      badge: "Web Audit Proposal",
      title: "Security clarity for your critical digital assets.",
      body: "Web Audit Scope includes Security, Performance, SEO, and Usability in one delivery.",
      viewPricing: "View Pricing",
      visitButton: "Visit N0hacks",
      formTitle: "Book FREE consultation",
      formBody: "Share your contact details and we will call or email you to schedule a meeting.",
      fieldName: "Full Name",
      fieldEmail: "Work Email",
      fieldPhone: "Phone / WhatsApp",
      fieldCompany: "Company",
      submit: "Send Request",
      submitSending: "Sending...",
      submitSuccess: "Request sent successfully. Our team will contact you shortly.",
      submitError: "Unable to send request right now. Please try again.",
      submitConfigError: "Email service is not configured yet. Add EmailJS service, template, and public key in env.",
      callNow: "Call Now",
      emailNow: "Email Us",
      formError: "Please enter your name and a valid email address.",
    },
    who: {
      badge: "Who We Are",
      title: "Offensive security specialists focused on real risk reduction.",
      body:
        "N0HACKS combines red teaming, security audits, and incident-driven expertise to identify exploitable paths before attackers do. We work directly with critical teams and deliver clear findings, priorities, and remediation guidance.",
      points: [
        "Operator-level delivery with practical outcomes.",
        "Clear reporting, realistic attack paths, and zero fluff.",
        "Built for high-risk teams where downtime is expensive.",
      ],
    },
    provide: {
      badge: "What We Provide",
      title: "Web Audit Scope",
      body: "This package is not only a security audit. Leads receive actionable findings across multiple high-impact areas.",
      cards: [
        {
          title: "Performance",
          body:
            "We analyze loading speed, server efficiency, and code optimization to improve response time and user experience.",
        },
        {
          title: "SEO",
          body: "We review your SEO structure to align with best practices and strengthen sustainable search visibility.",
        },
        {
          title: "Security",
          body: "We identify vulnerabilities and risks, then provide advanced protection guidance to reduce attack exposure.",
        },
        {
          title: "Usability & Accessibility",
          body: "We evaluate navigation, accessibility, and interface clarity so the site remains usable and compliant for all audiences.",
        },
      ],
    },
    pricing: {
      badge: "Pricing",
      title: "One straightforward package.",
      planLabel: "Web Audit Proposal",
      priceLabel: "Price",
      priceValue: "1500 Euro",
      services: [
        "Website Audit",
        "App Audit",
        "Audits of eCommerce platforms",
        "Cloud platform and container audits",
        "Audit of security baselines in operating systems and technologies",
        "Internal intrusion test",
        "Perimeter security review",
        "Hardening and API Security",
      ],
      scopeNote:
        "Scope source: shared proposal document and email brief. Final service execution order can be scheduled at kickoff.",
    },
    footer: {
      description:
        "Elite offensive security operators. Red teaming, intelligence, forensics and incident-driven defence for companies who cannot afford failure.",
      linkedIn: "LinkedIn",
      instagram: "Instagram",
      contactHeading: "Contact",
      contactBody:
        "Need rapid engagement or incident response? Our operators answer directly. No sales layer.",
      email: "info@n0hacks.com",
      phoneAndorra: "+376 665 320 - Andorra",
      phoneUae: "+971 50 697 5307 - UAE",
      phoneSpain: "+34 635 110 145 - Spain",
      rights: "All rights reserved.",
    },
  },
  es: {
    headerVisit: "Visitar N0hacks",
    nav: {
      whoWeAre: "Quienes Somos",
      whatWeProvide: "Que Proveemos",
      pricing: "Precio",
    },
    hero: {
      badge: "Propuesta de Auditoria Web",
      title: "Claridad de seguridad para tus activos digitales criticos.",
      body: "El alcance incluye Seguridad, Performance, SEO y Usabilidad en una sola entrega.",
      viewPricing: "Ver Precio",
      visitButton: "Visitar N0hacks",
      formTitle: "Reserva consulta GRATIS",
      formBody: "Comparte tus datos y te llamamos o enviamos email para coordinar una reunion.",
      fieldName: "Nombre Completo",
      fieldEmail: "Email de Trabajo",
      fieldPhone: "Telefono / WhatsApp",
      fieldCompany: "Empresa",
      submit: "Enviar Solicitud",
      submitSending: "Enviando...",
      submitSuccess: "Solicitud enviada correctamente. Nuestro equipo te contactara pronto.",
      submitError: "No se pudo enviar la solicitud ahora. Intenta de nuevo.",
      submitConfigError: "El servicio de email no esta configurado. Agrega service, template y public key de EmailJS en env.",
      callNow: "Llamar",
      emailNow: "Enviar Email",
      formError: "Ingresa tu nombre y un email valido.",
    },
    who: {
      badge: "Quienes Somos",
      title: "Especialistas en seguridad ofensiva enfocados en reducir riesgo real.",
      body:
        "N0HACKS combina red teaming, auditorias de seguridad y experiencia guiada por incidentes para identificar rutas explotables antes que los atacantes. Trabajamos directamente con equipos criticos y entregamos hallazgos claros, prioridades y guia de remediacion.",
      points: [
        "Ejecucion de nivel operador con resultados practicos.",
        "Reportes claros, rutas realistas de ataque y cero relleno.",
        "Pensado para equipos de alto riesgo donde la caida es costosa.",
      ],
    },
    provide: {
      badge: "Que Proveemos",
      title: "Alcance de Auditoria Web",
      body: "Este paquete no es solo una auditoria de seguridad. El cliente recibe hallazgos accionables en varias areas clave.",
      cards: [
        {
          title: "Performance",
          body:
            "Analizamos velocidad de carga, eficiencia del servidor y optimizacion de codigo para mejorar tiempos de respuesta y experiencia.",
        },
        {
          title: "SEO",
          body: "Revisamos la estructura SEO para cumplir buenas practicas y reforzar crecimiento sostenible en buscadores.",
        },
        {
          title: "Seguridad",
          body: "Identificamos vulnerabilidades y riesgos, y aplicamos medidas avanzadas para proteger plataforma y datos.",
        },
        {
          title: "Usabilidad y Accesibilidad",
          body: "Evaluamos navegacion, accesibilidad y claridad de interfaz para que el sitio sea usable y cumpla estandares.",
        },
      ],
    },
    pricing: {
      badge: "Precio",
      title: "Un paquete claro y directo.",
      planLabel: "Propuesta de Auditoria Web",
      priceLabel: "Precio",
      priceValue: "1500 Euro",
      services: [
        "Auditoria de Sitio Web",
        "Auditoria de App",
        "Auditorias de plataformas eCommerce",
        "Auditorias de plataformas cloud y contenedores",
        "Auditoria de lineas base de seguridad en sistemas operativos y tecnologias",
        "Prueba de intrusion interna",
        "Revision de seguridad perimetral",
        "Hardening y Seguridad de API",
      ],
      scopeNote:
        "Fuente del alcance: propuesta compartida y briefing por email. El orden final de ejecucion de servicios se define en kickoff.",
    },
    footer: {
      description:
        "Operadores elite de seguridad ofensiva. Red teaming, inteligencia, forensica y defensa basada en incidentes para empresas que no pueden permitirse fallar.",
      linkedIn: "LinkedIn",
      instagram: "Instagram",
      contactHeading: "Contacto",
      contactBody:
        "Necesitas una intervencion rapida o respuesta a incidentes? Nuestros operadores responden directamente. Sin capa comercial.",
      email: "info@n0hacks.com",
      phoneAndorra: "+376 665 320 - Andorra",
      phoneUae: "+971 50 697 5307 - UAE",
      phoneSpain: "+34 635 110 145 - Spain",
      rights: "Todos los derechos reservados.",
    },
  },
} as const;

export default function Page() {
  const { language } = useLanguage();
  const copy = pageContent[language];
  const leadRecipientEmail = process.env.NEXT_PUBLIC_LEAD_RECIPIENT_EMAIL || DEFAULT_LEAD_RECIPIENT_EMAIL;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navItems = [
    { id: "who-we-are", label: copy.nav.whoWeAre },
    { id: "what-we-provide", label: copy.nav.whatWeProvide },
    { id: "pricing", label: copy.nav.pricing },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerOffset = window.innerWidth < 1024 ? 96 : 88;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - headerOffset,
      behavior: "smooth",
    });
  };

  const updateLeadForm = (field: keyof typeof leadForm, value: string) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
    if (formStatus.type) {
      setFormStatus({ type: null, message: "" });
    }
  };

  const handleConsultationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = leadForm.name.trim();
    const trimmedEmail = leadForm.email.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName || !isEmailValid) {
      setFormError(copy.hero.formError);
      setFormStatus({ type: null, message: "" });
      return;
    }

    setFormError("");
    setFormStatus({ type: null, message: "" });

    const requestType = language === "es" ? "Consulta GRATIS" : "FREE consultation";

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus({ type: "error", message: copy.hero.submitConfigError });
      return;
    }

    try {
      setIsSubmitting(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: leadRecipientEmail,
          from_name: trimmedName,
          from_email: trimmedEmail,
          phone: leadForm.phone.trim() || "-",
          company: leadForm.company.trim() || "-",
          language: language === "es" ? "Spanish" : "English",
          request_type: requestType,
          message:
            language === "es"
              ? "Cliente solicita contacto para agendar reunion por llamada o email."
              : "Lead requested contact to schedule a meeting by call or email.",
        },
        { publicKey },
      );

      setFormStatus({ type: "success", message: copy.hero.submitSuccess });
      setLeadForm({ name: "", email: "", phone: "", company: "" });
    } catch {
      setFormStatus({ type: "error", message: copy.hero.submitError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-3 sm:h-20 sm:px-6 lg:px-8">
          <a
            href="#pricing"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("pricing");
            }}
            className="flex items-center gap-3"
          >
            <Image src="/images/logo.svg" alt="N0HACKS" width={36} height={36} />
            <span className="hidden font-[family-name:var(--font-orbitron)] text-sm tracking-[0.3em] text-emerald-300 sm:inline">
              N0HACKS
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-emerald-100/80 transition-colors hover:text-emerald-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
            <LanguageSwitcher />
            <a
              href={WEBSITE_URL}
              className="rounded-xl border border-emerald-300/70 bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-emerald-300 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="sm:hidden">{language === "es" ? "Visitar" : "Visit"}</span>
              <span className="hidden sm:inline">{copy.headerVisit}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="relative h-10 w-10 rounded-lg border border-emerald-400/30 bg-black/60 text-emerald-200"
            >
              <span
                className={`absolute left-2.5 top-3 h-0.5 w-5 bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-2.5 top-[18px] h-0.5 w-5 bg-current transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-2.5 top-[23px] h-0.5 w-5 bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-emerald-500/0 transition-all duration-300 lg:hidden ${
            mobileMenuOpen ? "max-h-96 border-emerald-500/20" : "max-h-0"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-xl border border-emerald-400/25 bg-black/40 px-3 py-2 text-left text-sm font-medium text-emerald-100/85 transition hover:border-emerald-300/70 hover:text-emerald-200"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WEBSITE_URL}
              className="mt-1 inline-flex w-full items-center justify-center rounded-xl border border-emerald-300/70 bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              {copy.headerVisit}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <section
          id="who-we-are"
          className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#03120b] via-[#02100a] to-black px-6 py-10 sm:px-10 sm:py-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">{copy.who.badge}</p>
          <h2 className="mt-3 max-w-4xl font-[family-name:var(--font-orbitron)] text-2xl text-emerald-100 sm:text-3xl">
            {copy.who.title}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-emerald-100/75 sm:text-base">{copy.who.body}</p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {copy.who.points.map((point) => (
              <div key={point} className="rounded-xl border border-emerald-400/20 bg-black/30 px-4 py-3 text-sm text-emerald-100/85">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section id="what-we-provide" className="mt-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">{copy.provide.badge}</p>
            <h2 className="mt-3 font-[family-name:var(--font-orbitron)] text-2xl text-emerald-100 sm:text-3xl">{copy.provide.title}</h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-emerald-100/75 sm:text-base">{copy.provide.body}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {copy.provide.cards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-emerald-400/20 bg-[#04160e]/70 p-6 shadow-[0_0_24px_rgba(16,185,129,0.18)]"
              >
                <h3 className="text-lg font-semibold text-emerald-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-emerald-100/75">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-16 scroll-mt-28">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#031109] via-[#010b06] to-black px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">{copy.pricing.badge}</p>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-orbitron)] text-3xl leading-tight text-emerald-100 sm:text-5xl">
              {copy.hero.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-emerald-100/80 sm:text-base">{copy.hero.body}</p>

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
              <article className="rounded-3xl border border-emerald-300/30 bg-gradient-to-b from-[#062014] to-[#010a05] p-8 shadow-[0_0_50px_rgba(16,185,129,0.22)] sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">{copy.pricing.planLabel}</p>
                </div>

                <div className="rounded-2xl border border-emerald-300/30 bg-black/30 px-5 py-4 text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/80">{copy.pricing.priceLabel}</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-200">{copy.pricing.priceValue}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.pricing.services.map((service) => (
                  <div key={service} className="flex items-start gap-3 rounded-xl border border-emerald-400/15 bg-black/30 px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                    <p className="text-sm text-emerald-100/90">{service}</p>
                  </div>
                ))}
              </div>
              </article>

              <article className="rounded-2xl border border-emerald-400/35 bg-black/60 p-5 shadow-[0_0_30px_rgba(16,185,129,0.2)] sm:p-6">
                <h2 className="text-lg font-semibold text-emerald-100">{copy.hero.formTitle}</h2>
                <p className="mt-2 text-sm text-emerald-100/75">{copy.hero.formBody}</p>

                <form onSubmit={handleConsultationSubmit} className="mt-5 space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                      {copy.hero.fieldName}
                    </span>
                    <input
                      type="text"
                      value={leadForm.name}
                      onChange={(event) => updateLeadForm("name", event.target.value)}
                      className="w-full rounded-xl border border-emerald-400/25 bg-black/70 px-4 py-2.5 text-sm text-emerald-50 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/25"
                      placeholder={copy.hero.fieldName}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                      {copy.hero.fieldEmail}
                    </span>
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(event) => updateLeadForm("email", event.target.value)}
                      className="w-full rounded-xl border border-emerald-400/25 bg-black/70 px-4 py-2.5 text-sm text-emerald-50 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/25"
                      placeholder={copy.hero.fieldEmail}
                    />
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                        {copy.hero.fieldPhone}
                      </span>
                      <input
                        type="text"
                        value={leadForm.phone}
                        onChange={(event) => updateLeadForm("phone", event.target.value)}
                        className="w-full rounded-xl border border-emerald-400/25 bg-black/70 px-4 py-2.5 text-sm text-emerald-50 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/25"
                        placeholder={copy.hero.fieldPhone}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                        {copy.hero.fieldCompany}
                      </span>
                      <input
                        type="text"
                        value={leadForm.company}
                        onChange={(event) => updateLeadForm("company", event.target.value)}
                        className="w-full rounded-xl border border-emerald-400/25 bg-black/70 px-4 py-2.5 text-sm text-emerald-50 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/25"
                        placeholder={copy.hero.fieldCompany}
                      />
                    </label>
                  </div>

                  {formError ? <p className="text-sm font-medium text-rose-300">{formError}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? copy.hero.submitSending : copy.hero.submit}
                  </button>

                  {formStatus.type ? (
                    <p className={`text-sm ${formStatus.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                      {formStatus.message}
                    </p>
                  ) : null}
                </form>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="tel:+376665320"
                    className="rounded-xl border border-emerald-300/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200 transition hover:border-emerald-300/70"
                  >
                    {copy.hero.callNow}
                  </a>
                  <a
                    href={`mailto:${leadRecipientEmail}`}
                    className="rounded-xl border border-emerald-300/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200 transition hover:border-emerald-300/70"
                  >
                    {copy.hero.emailNow}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer className="relative left-1/2 right-1/2 mt-20 w-screen -translate-x-1/2 overflow-hidden border-y border-emerald-500/20 bg-[#020b08] py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle_at_center,#22c55e1c,transparent_70%)]" />
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
            {footerParticles.map((particle, index) => (
              <span
                key={index}
                className="absolute h-[4px] w-[4px] rounded-full bg-emerald-400/55"
                style={{ top: particle.top, left: particle.left }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold tracking-[0.25em] bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                  N0HACKS
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-emerald-100/70">{copy.footer.description}</p>

                <div className="flex gap-3 pt-4">
                  <a
                    href="https://www.linkedin.com/company/n0hacks"
                    className="rounded-2xl border border-emerald-400/35 bg-black/35 px-4 py-2 text-sm uppercase tracking-[0.12em] text-emerald-300 transition hover:border-emerald-300/70 hover:text-emerald-200"
                  >
                    {copy.footer.linkedIn}
                  </a>
                  <a
                    href="https://www.instagram.com/n0hacks"
                    className="rounded-2xl border border-emerald-400/35 bg-black/35 px-4 py-2 text-sm uppercase tracking-[0.12em] text-emerald-300 transition hover:border-emerald-300/70 hover:text-emerald-200"
                  >
                    {copy.footer.instagram}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/85">{copy.footer.contactHeading}</p>
                <p className="max-w-sm text-sm leading-relaxed text-emerald-100/70">{copy.footer.contactBody}</p>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-emerald-300">{copy.footer.email}</p>
                  <p className="font-semibold text-emerald-300">{copy.footer.phoneAndorra}</p>
                  <p className="font-semibold text-emerald-300">{copy.footer.phoneUae}</p>
                  <p className="font-semibold text-emerald-300">{copy.footer.phoneSpain}</p>
                </div>
              </div>
            </div>

            <p className="mt-20 text-center text-xs text-emerald-100/40 tracking-wide">
              (c) {new Date().getFullYear()} N0HACKS {copy.footer.rights}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
