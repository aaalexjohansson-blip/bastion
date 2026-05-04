/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Droplet, 
  Settings, 
  ShieldCheck, 
  Mail,
  Phone,
  Download
} from "lucide-react";

const navItems = [
  { id: "capacity", label: "Vår förmåga" },
  { id: "why-bastion", label: "Varför Bastion" },
  { id: "vilka-vi-ar", label: "Vilka vi är" },
];

const activeNavLinkClass = "text-sm font-semibold text-[#B94A1E] border-b-2 border-[#B94A1E] px-4 py-2 transition-colors";
const inactiveNavLinkClass = "text-sm font-medium text-on-surface border-b-2 border-transparent hover:text-primary transition-colors px-4 py-2 hover:bg-graphite-100 rounded-[10px]";

const SectionHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4">
    <h2 className="text-xs font-bold text-[#B94A1E] tracking-[0.2em] uppercase">{label}</h2>
    <div className="h-px bg-[#B94A1E]/65 flex-grow" />
  </div>
);

const heroImage = new URL("./images/image-1.png", import.meta.url).href;
const whyBastionImage = new URL("./images/image-2.png", import.meta.url).href;
const vilkaViArImage = new URL("./images/image-3.jpg", import.meta.url).href;

const logoGroups = [
  {
    name: "Logo dark",
    label: "Mörk logotyp",
    previewSrc: "/logo-dark.svg",
    previewClass: "bg-white",
    imageClass: "max-h-14 w-full object-contain",
    downloads: [
      { filename: "logo-dark.svg", fileType: "SVG", href: "/logo-dark.svg" },
      { filename: "logo-dark.png", fileType: "PNG", href: "/logo-dark.png" },
    ],
  },
  {
    name: "Logo light",
    label: "Ljus logotyp",
    previewSrc: "/logo-light.svg",
    previewClass: "bg-graphite-900",
    imageClass: "max-h-14 w-full object-contain",
    downloads: [
      { filename: "logo-light.svg", fileType: "SVG", href: "/logo-light.svg" },
      { filename: "logo-light.png", fileType: "PNG", href: "/logo-light.png" },
    ],
  },
  {
    name: "Favicon",
    label: "Favicon",
    previewSrc: "/favicon.svg",
    previewClass: "bg-white",
    imageClass: "h-14 w-14",
    downloads: [
      { filename: "favicon.svg", fileType: "SVG", href: "/favicon.svg" },
    ],
  },
];

const imageAssets = [
  { filename: "image-1.png", fileType: "PNG", href: "/assets/design/image-1.png", label: "Hero image" },
  { filename: "image-2.png", fileType: "PNG", href: "/assets/design/image-2.png", label: "Capacity image" },
  { filename: "image-3.jpg", fileType: "JPG", href: "/assets/design/image-3.jpg", label: "About image" },
  { filename: "background-grid.png", fileType: "PNG", href: "/background-grid.png", label: "Bakgrundsrutnät" },
  { filename: "og-image.jpg", fileType: "JPG", href: "/og-image.jpg", label: "OG image" },
];

const colorCategories = [
  {
    title: "Primary colors",
    colors: [
      { name: "Petrol", hex: "#2F5D62" },
      { name: "Rust / orange accent", hex: "#B94A1E" },
    ],
  },
  {
    title: "Neutral colors",
    colors: [
      { name: "Main warm background", hex: "#F4F0EA" },
      { name: "Surface", hex: "#ECE6DD" },
      { name: "Subtle surface", hex: "#F4F0EA" },
      { name: "Neutral border", hex: "#DED6CC" },
      { name: "Divider", hex: "#DED6CC" },
    ],
  },
  {
    title: "Text colors",
    colors: [
      { name: "Primary text", hex: "#1F1C1A" },
      { name: "Secondary text", hex: "#6F6861" },
      { name: "Muted text", hex: "#CFC5BA" },
    ],
  },
  {
    title: "State colors",
    colors: [
      { name: "Petrol hover", hex: "#274D51" },
      { name: "Petrol active", hex: "#203F42" },
    ],
  },
];

const typographySamples = [
  {
    name: "Inter",
    usage: "Main heading",
    sample: "Operativ kapacitet",
    className: "font-headline text-4xl md:text-6xl font-semibold leading-[1.05] tracking-normal",
  },
  {
    name: "Inter",
    usage: "Section heading",
    sample: "Varför Bastion behövs",
    className: "font-headline text-3xl md:text-5xl font-semibold leading-[1.08] tracking-normal",
  },
  {
    name: "Inter",
    usage: "Body text",
    sample: "Bastion organiserar och samordnar bolag med operativ fältkapacitet.",
    className: "text-base md:text-lg font-medium leading-relaxed text-on-surface-variant",
  },
  {
    name: "Inter",
    usage: "Small uppercase label",
    sample: "SAMORDNAD FÄLTKAPACITET",
    className: "text-xs font-bold tracking-[0.2em] uppercase text-accent",
  },
  {
    name: "Inter",
    usage: "Button text",
    sample: "KONTAKTA OSS",
    className: "text-sm font-bold tracking-widest uppercase text-on-surface",
  },
];

const hexToRgb = (hex: string) => {
  const normalizedHex = hex.replace("#", "");
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);

  return `rgb(${red}, ${green}, ${blue})`;
};

const HeroImageIllustration = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updatePosition = () => {
      animationFrame = 0;

      if (!imageRef.current || prefersReducedMotion.matches) {
        return;
      }

      const offset = Math.max(-40, Math.min(40, window.scrollY * 0.04));
      imageRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const handleScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="hidden lg:block absolute right-[-16vw] top-[calc(50%-56px)] z-0 w-[76vw] -translate-y-1/2 pointer-events-none select-none xl:right-[-12vw]">
      <div ref={imageRef} className="relative w-full will-change-transform">
        <img className="relative block w-full h-auto object-contain opacity-90" src={heroImage} alt="" aria-hidden="true" />
      </div>
    </div>
  );
};

const WhyBastionImage = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updatePosition = () => {
      animationFrame = 0;

      if (!imageRef.current || prefersReducedMotion.matches) {
        return;
      }

      imageRef.current.style.transform = "scale(1.16)";
    };

    const handleScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      className="relative block h-full w-full object-contain will-change-transform scale-110 md:scale-[1.16]"
      src={whyBastionImage}
      alt=""
      aria-hidden="true"
    />
  );
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const commitTimeoutRef = useRef<number | null>(null);
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    let frameId: number | null = null;

    const getSections = () =>
      navItems
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

    const commitActiveSection = (sectionId: string | null) => {
      if (pendingSectionRef.current === sectionId) {
        return;
      }

      pendingSectionRef.current = sectionId;

      if (commitTimeoutRef.current !== null) {
        window.clearTimeout(commitTimeoutRef.current);
      }

      commitTimeoutRef.current = window.setTimeout(() => {
        setActiveSection((currentSection) =>
          currentSection === pendingSectionRef.current ? currentSection : pendingSectionRef.current,
        );
        commitTimeoutRef.current = null;
      }, 125);
    };

    const updateActiveSection = () => {
      const sections = getSections();

      if (!sections.length) {
        return;
      }

      const activationLine = window.scrollY + 112 - 24;
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        commitActiveSection(sections[sections.length - 1].id);
        return;
      }

      const firstSectionTop = sections[0].getBoundingClientRect().top + window.scrollY;

      if (activationLine < firstSectionTop) {
        commitActiveSection(null);
        return;
      }

      const currentSection = sections.reduce<HTMLElement | null>((current, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return sectionTop <= activationLine ? section : current;
      }, null);

      commitActiveSection(currentSection?.id ?? null);
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (commitTimeoutRef.current !== null) {
        window.clearTimeout(commitTimeoutRef.current);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 border-b border-outline-variant backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 md:h-20 grid grid-cols-[auto_1fr_auto] items-center">
        <a className="flex items-center min-w-0" href="/">
          <img className="h-[18px] md:h-[22px] w-auto max-w-[170px]" src="/logo-dark.svg" alt="Bastion" />
        </a>
        <div className="hidden md:flex items-center justify-center gap-4 text-center">
          {navItems.map(({ id, label }) => (
            <a
              className={activeSection === id ? activeNavLinkClass : inactiveNavLinkClass}
              href={isHomePage ? `#${id}` : `/#${id}`}
              key={id}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="hidden md:inline-flex bg-[#2F5D62] text-white px-6 py-2.5 rounded-[10px] font-semibold text-sm whitespace-nowrap hover:bg-[#274D51] active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2 active:scale-95 transition-all" href="mailto:sofia@bastiongroup.se">
          Kontakta oss
        </a>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="hero" className="anchor-section w-full relative overflow-hidden bg-transparent pt-10 pb-8 md:pt-20 md:pb-10">
    <HeroImageIllustration />
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 relative z-20 flex flex-col items-start text-left">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-medium text-[10px] md:text-xs tracking-wider text-primary bg-primary-container px-3 md:px-4 py-1.5 rounded-[10px] mb-5 md:mb-6 border border-outline-variant"
      >
        SAMORDNAD FÄLTKAPACITET
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-headline text-4xl md:text-6xl lg:text-7xl font-semibold text-on-surface mb-5 md:mb-6 leading-[1.08] md:leading-[1.05] max-w-3xl tracking-tight"
      >
        För samhällskritisk <span className="desktop-break" />infrastruktur
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl space-y-4 md:space-y-5"
      >
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium opacity-90">
          Bastion samlar lokalt förankrade specialistbolag med kompetens att reparera, återställa och driva kritisk infrastruktur; i både löpande verksamhet och vid större händelser.
        </p>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium opacity-90">
          Runt om i landet finns en stark men fragmenterad förmåga. Mindre aktörer arbetar nära systemen varje dag, men har begränsade möjligheter att verka i större uppdrag och sammanhang.
        </p>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium opacity-90">
          Bastion samlar och strukturerar denna förmåga. Det gör resurserna mer tillgängliga, möjliga att samordna och enklare att mobilisera när behoven ökar, samtidigt som det öppnar för fler och större uppdrag och stärker tillgången till resurser när de behövs.
        </p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid w-full grid-cols-1 gap-3 self-start pt-1 md:pt-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-4"
        >
          <a className="hidden sm:flex bg-[#2F5D62] text-white px-8 lg:px-10 py-4 rounded-[10px] font-bold text-sm tracking-widest hover:bg-[#274D51] active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2 active:scale-95 transition-all items-center justify-center gap-2 shadow-sm shadow-black/10" href="#capacity">
            Läs mer
          </a>
          <a className="w-full sm:w-auto bg-[#2F5D62] sm:bg-white border border-[#2F5D62] sm:border-outline-variant text-white sm:text-on-surface px-8 lg:px-10 py-4 rounded-[10px] font-bold text-sm tracking-widest text-center hover:bg-[#274D51] sm:hover:bg-graphite-100 active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2 active:scale-95 transition-all" href="#contact">
            Kontakt
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const CapacityCard = ({ icon: Icon, iconFill, title, description }: { icon: any, iconFill: string, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group relative min-h-[220px] md:min-h-[260px] bg-white border border-outline-variant px-6 md:px-8 pt-6 md:pt-8 pb-7 md:pb-10 rounded-[10px] hover:border-graphite-200 transition-all overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <div className="w-24 h-24 dot-pattern-dense" />
    </div>
    <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-7 md:mb-10 text-on-surface shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <Icon color="#1F1C1A" size={24} strokeWidth={2.5} fill={iconFill} fillOpacity={0.8} />
    </div>
    <h3 className="font-headline text-2xl font-semibold text-on-surface mb-3 leading-[1.1] tracking-tight">{title}</h3>
    <p className="text-sm leading-relaxed text-graphite-700 font-medium">{description}</p>
  </motion.div>
);

const CapacitySection = () => (
  <section id="capacity" className="anchor-section max-w-[1280px] mx-auto px-5 md:px-8 py-10 md:py-12">
    <div className="mb-7 md:mb-8">
      <div className="mb-4">
        <SectionHeader label="VÅR FÖRMÅGA" />
      </div>
      <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
        Bolagen inom Bastion verkar där det gör skillnad; lokalt, i fält, nära systemen.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CapacityCard 
        icon={Zap} 
        iconFill="#E7CFC4"
        title="Energisystem" 
        description="Ser till att elen fungerar och kommer tillbaka när den försvinner." 
      />
      <CapacityCard 
        icon={Droplet} 
        iconFill="#D6E3E3"
        title="Vattenförsörjning" 
        description="Säkrar vattenförsörjning, återställer ledningsnät och får systemen att fungera igen." 
      />
      <CapacityCard 
        icon={Settings} 
        iconFill="#E3DFDA"
        title="Tekniska system" 
        description="Återställer teknisk funktion i fastigheter och industri." 
      />
      <CapacityCard 
        icon={ShieldCheck} 
        iconFill="#E2D6C8"
        title="Drift och underhåll" 
        description="Håller kritiska anläggningar i gång, varje dag och över tid." 
      />
    </div>
  </section>
);

const WhyBastionSection = () => (
  <section id="why-bastion" className="anchor-section max-w-[1280px] mx-auto px-5 md:px-8 py-10 md:py-14">
    <SectionHeader label="SAMHÄLLSKRITISK INFRASTRUKTUR" />
    <div className="mt-[50px] grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-16 items-start">
      <div>
        <h2 className="font-headline text-3xl md:text-5xl font-semibold text-on-surface leading-[1.08] tracking-normal">
          Därför behövs Bastion
        </h2>
        
        <div className="space-y-4 mt-7 md:mt-8">
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl font-medium opacity-90 leading-relaxed">
            I vardagen märks infrastrukturen knappt, den fungerar.
            <br />
            När den sätts under press krävs snabb mobilisering och uthållighet.
          </p>
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl font-medium opacity-90 leading-relaxed">
            Idag är resurserna spridda över många mindre aktörer. Trots hög kompetens är de svåra att samla och använda i större skala.
          </p>
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl font-medium opacity-90 leading-relaxed">
            Bastion skapar en gemensam struktur som gör lokal förmåga användbar i ett större sammanhang. Det ger bättre tillgänglighet, högre tempo och ökad uthållighet när det verkligen gäller.
          </p>
        </div>
      </div>
      
      <div className="relative aspect-square w-full pointer-events-none select-none">
        <WhyBastionImage />
      </div>
    </div>
  </section>
);

const VilkaViArSection = () => (
  <section id="vilka-vi-ar" className="anchor-section max-w-[1280px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-8 md:pb-10">
    <div className="rounded-[10px] bg-[#2B2623] p-6 md:p-20 border border-outline-variant shadow-sm shadow-graphite-900/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full rounded-[10px] border border-outline-variant bg-gradient-to-b from-white to-graphite-100 overflow-hidden">
            <img className="h-full w-full object-cover brightness-90 contrast-95" src={vilkaViArImage} alt="" aria-hidden="true" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4 md:space-y-5">
          <h2 className="text-xs font-bold text-[#D36A3C] tracking-[0.2em] uppercase">OM BASTION</h2>
          <h3 className="font-headline text-3xl md:text-6xl font-semibold text-white tracking-normal leading-[1.08] md:leading-[1.05]">
            Vilka vi är
          </h3>
          <p className="text-sm text-[#E5DED6] max-w-2xl font-medium opacity-90 leading-relaxed">
            Bastion är initierat av personer med bakgrund inom industri, fastigheter, säkerhet och beredskap.
          </p>
          <p className="text-sm text-[#E5DED6] max-w-2xl font-medium opacity-90 leading-relaxed">
            Vi har lång erfarenhet av att arbeta nära både kritiska verksamheter och entreprenörsdrivna bolag där genomförande, ansvar och samarbete avgör utfallet.
          </p>
          <p className="text-sm text-[#E5DED6] max-w-2xl font-medium opacity-90 leading-relaxed">
            Vi bygger vidare på starka, självständiga bolag med lokal närvaro och stärker deras möjligheter att verka tillsammans i större sammanhang.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribeStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Unable to subscribe");
      }

      setEmail("");
      setSubscribeStatus("success");
    } catch {
      setSubscribeStatus("error");
    }
  };

  return (
    <section id="contact" className="anchor-section max-w-[1280px] mx-auto px-5 md:px-8 pt-8 md:pt-10 pb-12 md:pb-20">
      <div className="rounded-[10px] bg-gradient-to-b from-white to-graphite-100 p-6 md:p-20 border border-outline-variant shadow-sm shadow-graphite-900/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            <div className="space-y-5 md:space-y-6">
              <h2 className="text-xs font-bold text-[#B94A1E] tracking-[0.2em] uppercase">KONTAKT</h2>
              <h2 className="font-headline text-3xl md:text-6xl font-semibold text-on-surface tracking-normal leading-[1.08] md:leading-[1.05]">
                Dialog
              </h2>
              <p className="text-base md:text-lg text-on-surface-variant max-w-2xl font-medium opacity-90 leading-relaxed">
                Vill du veta mer om Bastion eller diskutera samarbete, hör av dig.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              <div className="flex items-center gap-4 min-w-0 text-on-surface group">
                <div className="w-11 h-11 shrink-0 rounded-full bg-surface flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-on-surface">
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <a className="min-w-0 break-words font-bold hover:text-primary transition-colors" href="mailto:sofia@bastiongroup.se">
                  sofia@bastiongroup.se
                </a>
              </div>
              <div className="flex items-center gap-4 min-w-0 text-on-surface group">
                <div className="w-11 h-11 shrink-0 rounded-full bg-surface flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-on-surface">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <a className="font-bold hover:text-primary transition-colors" href="tel:+46737087808">
                  073-708 78 08
                </a>
              </div>
            </div>
            
            <div className="pt-6">
              <motion.a 
                href="mailto:sofia@bastiongroup.se"
                whileTap={{ scale: 0.95 }}
                className="inline-flex w-full sm:w-auto justify-center bg-[#2F5D62] text-white px-8 md:px-12 py-4 md:py-5 rounded-[10px] font-bold text-sm tracking-widest hover:bg-[#274D51] active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2 transition-all shadow-sm shadow-black/10"
              >
                KONTAKTA OSS
              </motion.a>
            </div>
          </div>
          
          <div className="lg:col-span-5 h-full">
            <div className="bg-white/85 backdrop-blur-md p-6 md:p-10 rounded-[10px] border border-outline-variant shadow-sm shadow-graphite-900/5 h-full flex flex-col justify-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface mb-4 opacity-60">HÅLL DIG UPPDATERAD</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-8 leading-relaxed">
                Anmäl dig för att ta del av uppdateringar om Bastions arbete och utveckling.
              </p>
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <input 
                  aria-label="Din mailadress"
                  className="w-full bg-white border border-outline-variant rounded-[10px] px-4 md:px-5 py-4 text-sm focus:ring-2 focus:ring-graphite-200 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/50 font-medium" 
                  disabled={subscribeStatus === "loading"}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubscribeStatus("idle");
                  }}
                  placeholder="Din mailadress" 
                  type="email" 
                  value={email}
                />
                <button 
                  className="w-full bg-[#2F5D62] text-white px-5 md:px-8 py-4 rounded-[10px] text-[10px] font-black tracking-[0.2em] hover:bg-[#274D51] active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2 transition-all uppercase disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={subscribeStatus === "loading"}
                  type="submit"
                >
                  {subscribeStatus === "loading" ? "SKICKAR" : "PRENUMERERA"}
                </button>
                {subscribeStatus === "success" && (
                  <p className="text-sm font-medium text-on-surface-variant" role="status">
                    Tack! Vi hör av oss.
                  </p>
                )}
                {subscribeStatus === "error" && (
                  <p className="text-sm font-medium text-on-surface-variant" role="alert">
                    Något gick fel. Försök igen.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gradient-to-b from-graphite-800 to-graphite-900 w-full py-12 md:py-16 border-t border-graphite-700 mt-12 md:mt-20">
    <div className="max-w-[1280px] mx-auto px-5 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
        <div>
          <img className="h-7 w-auto" src="/logo-light.svg" alt="Bastion" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 md:justify-items-end">
          <a className="text-[10px] font-black uppercase tracking-[0.2em] text-on-primary/70 hover:text-on-primary transition-colors" href="/legal#integritet">Integritetspolicy</a>
          <a className="text-[10px] font-black uppercase tracking-[0.2em] text-on-primary/70 hover:text-on-primary transition-colors" href="/legal#villkor">Användarvillkor</a>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-primary/60 md:col-span-2 border-t border-on-primary/10 pt-8">
          © 2026 Bastion. För samhällskritisk infrastruktur.
        </div>
      </div>
    </div>
  </footer>
);

const LegalSection = ({ children, id }: { children: ReactNode, id: string }) => (
  <section id={id} className="anchor-section bg-white border border-outline-variant rounded-[10px] p-6 md:p-12 shadow-sm shadow-graphite-900/5">
    {children}
  </section>
);

const LegalPage = () => (
  <main className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20">
    <div className="max-w-[960px] mx-auto px-5 md:px-8">
      <nav className="mb-10 flex flex-wrap gap-4" aria-label="Juridisk navigation">
        <a className="text-sm font-semibold text-primary border border-outline-variant rounded-[10px] px-4 py-2 hover:bg-graphite-100 transition-colors" href="#integritet">Integritetspolicy</a>
        <a className="text-sm font-semibold text-primary border border-outline-variant rounded-[10px] px-4 py-2 hover:bg-graphite-100 transition-colors" href="#villkor">Användarvillkor</a>
      </nav>

      <div className="space-y-12">
        <LegalSection id="integritet">
          <h1 className="font-headline text-3xl md:text-6xl font-semibold text-on-surface tracking-normal leading-[1.08] md:leading-[1.05] mb-8 md:mb-10">Integritetspolicy</h1>

          <div className="space-y-8 text-on-surface-variant font-medium leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">1. Allmänt</h3>
              <p>Bastion värnar om din personliga integritet. Denna policy beskriver hur vi samlar in och använder personuppgifter i samband med användning av vår webbplats.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">2. Vilka uppgifter vi samlar in</h3>
              <p>Vi samlar endast in personuppgifter som du själv lämnar till oss, exempelvis:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>E-postadress via formulär för kontakt eller uppdateringar</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">3. Syfte med behandlingen</h3>
              <p>Vi behandlar dina uppgifter för att:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Kunna kontakta dig vid förfrågningar</li>
                <li>Skicka relevant information om Bastions verksamhet</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">4. Lagring av uppgifter</h3>
              <p>Vi sparar dina uppgifter endast så länge det är nödvändigt för ändamålet eller tills du begär att bli borttagen.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">5. Tredjepartstjänster</h3>
              <p>Vi kan använda tredjepartstjänster för drift av webbplatsen och utskick av e-post. Dessa behandlar endast uppgifter enligt våra instruktioner.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">6. Dina rättigheter</h3>
              <p>Du har rätt att:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Begära tillgång till dina uppgifter</li>
                <li>Begära rättelse eller radering</li>
                <li>Invända mot behandling</li>
              </ul>
              <p className="mt-4">Kontakta oss via e-post om du vill utöva dina rättigheter.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">7. Kontakt</h3>
              <p>sofia@bastiongroup.se</p>
            </div>
          </div>
        </LegalSection>

        <LegalSection id="villkor">
          <h2 className="font-headline text-3xl md:text-6xl font-semibold text-on-surface tracking-normal leading-[1.08] md:leading-[1.05] mb-8 md:mb-10">Användarvillkor</h2>

          <div className="space-y-8 text-on-surface-variant font-medium leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">1. Allmänt</h3>
              <p>Genom att använda denna webbplats godkänner du dessa villkor.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">2. Innehåll</h3>
              <p>Allt innehåll på webbplatsen tillhandahålls i informationssyfte. Bastion strävar efter att informationen är korrekt men lämnar inga garantier för fullständighet eller aktualitet.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">3. Ansvar</h3>
              <p>Bastion ansvarar inte för:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Skador som uppstår genom användning av webbplatsen</li>
                <li>Eventuella tekniska avbrott eller fel</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">4. Immateriella rättigheter</h3>
              <p>Innehåll, design och material på webbplatsen tillhör Bastion och får inte användas utan tillstånd.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">5. Ändringar</h3>
              <p>Vi förbehåller oss rätten att uppdatera dessa villkor utan föregående meddelande.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">6. Tillämplig lag</h3>
              <p>Dessa villkor regleras av svensk lag.</p>
            </div>
          </div>
        </LegalSection>
      </div>
    </div>
  </main>
);

const DesignSection = ({ children, title }: { children: ReactNode, title: string }) => (
  <section className="bg-white border border-outline-variant rounded-[10px] p-5 md:p-7 shadow-sm shadow-graphite-900/5">
    <h2 className="font-headline text-2xl font-semibold text-on-surface tracking-normal mb-5">{title}</h2>
    {children}
  </section>
);

const DownloadButton = ({ href, label }: { href: string, label?: string }) => (
  <a
    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#2F5D62] px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#274D51] active:bg-[#203F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203F42] focus-visible:ring-offset-2"
    download
    href={href}
  >
    <Download size={15} strokeWidth={2.5} />
    {label ?? "Ladda ner"}
  </a>
);

const DesignPage = () => (
  <main className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20">
    <div className="max-w-[1120px] mx-auto px-5 md:px-8">
      <div className="mb-10 md:mb-14 max-w-3xl">
        <h1 className="font-headline text-4xl md:text-6xl font-semibold text-on-surface tracking-normal leading-[1.05] mb-5">
          Designresurser
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
          Här finns Bastions logotyper, färger och typografi samlade för nedladdning och användning.
        </p>
      </div>

      <div className="space-y-8 md:space-y-10">
        <DesignSection title="Logotyper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {logoGroups.map(({ name, label, previewSrc, previewClass, imageClass, downloads }) => (
              <article className="border border-outline-variant rounded-[10px] overflow-hidden bg-white" key={name}>
                <div className={`h-32 flex items-center justify-center p-6 ${previewClass}`}>
                  <img className={imageClass} src={previewSrc} alt={label} />
                </div>
                <div className="p-4 border-t border-outline-variant">
                  <p className="font-semibold text-on-surface mb-3">{name}</p>
                  <div className="flex flex-wrap gap-2">
                    {downloads.map(({ filename, fileType, href }) => (
                      <span key={filename}>
                        <DownloadButton href={href} label={fileType} />
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </DesignSection>

        <DesignSection title="Bildfiler">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageAssets.map(({ filename, fileType, href, label }) => (
              <article className="border border-outline-variant rounded-[10px] overflow-hidden bg-graphite-100" key={filename}>
                <div className="h-36 bg-white">
                  <img className="h-full w-full object-cover" src={href} alt={label} />
                </div>
                <div className="p-4 bg-white border-t border-outline-variant">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <p className="font-semibold text-on-surface">{filename}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">{fileType}</p>
                  </div>
                  <DownloadButton href={href} />
                </div>
              </article>
            ))}
          </div>
        </DesignSection>

        <DesignSection title="Färger">
          <div className="space-y-6">
            {colorCategories.map(({ title, colors }) => (
              <div key={title}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">{title}</h3>
                <div className="divide-y divide-outline-variant border border-outline-variant rounded-[10px] overflow-hidden">
                  {colors.map(({ name, hex }) => (
                    <div className="grid grid-cols-[48px_1fr] md:grid-cols-[56px_1fr_120px_160px] gap-3 items-center bg-white p-3" key={`${title}-${name}`}>
                      <div
                        aria-label={`${name} ${hex}`}
                        className="h-9 w-9 rounded-[8px] border border-outline-variant shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                      <p className="font-semibold text-on-surface">{name}</p>
                      <p className="font-mono text-sm text-on-surface-variant">{hex}</p>
                      <p className="font-mono text-sm text-on-surface-variant">{hexToRgb(hex)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DesignSection>

        <DesignSection title="Typografi">
          <div className="mb-6 rounded-[10px] border border-outline-variant bg-graphite-100 p-4 text-sm font-medium leading-relaxed text-on-surface-variant">
            Webbplatsen använder Inter via Google Fonts. Det finns inga lokala fontfiler i projektet, så inga fontnedladdningar visas här. Hämta fonten från den officiella källan:
            {" "}
            <a className="font-semibold text-primary underline underline-offset-4" href="https://fonts.google.com/specimen/Inter" rel="noreferrer" target="_blank">
              Google Fonts
            </a>.
          </div>
          <div className="space-y-4">
            {typographySamples.map(({ name, usage, sample, className }) => (
              <article className="border border-outline-variant rounded-[10px] bg-white p-4 md:p-6" key={usage}>
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-semibold text-on-surface">{name}</p>
                  <p className="text-sm font-medium text-on-surface-variant">{usage}</p>
                </div>
                <p className={className}>{sample}</p>
              </article>
            ))}
          </div>
        </DesignSection>
      </div>
    </div>
  </main>
);

export default function App() {
  const isLegalPage = window.location.pathname === "/legal";
  const isDesignPage = window.location.pathname === "/design";

  return (
    <div className="min-h-screen bg-background text-on-background antialiased selection:bg-accent/20">
      <div className="fixed inset-0 dot-pattern opacity-40 pointer-events-none z-0" />
      <Navbar />
      {isDesignPage ? (
        <DesignPage />
      ) : isLegalPage ? (
        <LegalPage />
        ) : (
        <main className="relative z-10 pt-20">
          <Hero />
          <CapacitySection />
          <WhyBastionSection />
          <VilkaViArSection />
          <CTASection />
        </main>
      )}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
