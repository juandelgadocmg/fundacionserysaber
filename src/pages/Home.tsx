import { useEffect } from 'react';
import Hero from '../components/Hero';
import IdentidadSection from '../components/IdentidadSection';
import EjesSection from '../components/EjesSection';
import PoblacionesSection from '../components/PoblacionesSection';
import ProgramasDestacados from '../components/ProgramasDestacados';
import ComoParticipar from '../components/ComoParticipar';
import VoluntariadoTeaser from '../components/VoluntariadoTeaser';
import { useReveal } from '../lib/useReveal';

export default function Home() {
  useReveal();

  useEffect(() => {
    document.title = 'Fundación Ser & Saber | Transformación con propósito';
  }, []);

  return (
    <>
      <Hero />
      <IdentidadSection />
      <EjesSection />
      <PoblacionesSection />
      <ProgramasDestacados />
      <VoluntariadoTeaser />
      <ComoParticipar />
    </>
  );
}
