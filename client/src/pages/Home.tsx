import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [countdown, setCountdown] = useState({
    dias: '00',
    horas: '00',
    minutos: '00',
    segundos: '00',
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const motoclubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Autoplay music
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay bloqueado:', err));
      setIsPlaying(true);
    }

    const updateCountdown = () => {
      // Data do evento: 03 de outubro de 2025 às 19:00
      const eventDate = new Date(2026, 2, 10, 19, 0, 0).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({
          dias: String(dias).padStart(2, '0'),
          horas: String(horas).padStart(2, '0'),
          minutos: String(minutos).padStart(2, '0'),
          segundos: String(segundos).padStart(2, '0'),
        });
      } else {
        setCountdown({
          dias: '00',
          horas: '00',
          minutos: '00',
          segundos: '00',
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToMotoclube = () => {
    if (motoclubeRef.current) {
      motoclubeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Audio Element */}
      <audio ref={audioRef} src="/simple_man.mpeg" loop />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl opacity-10" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="mb-8 animate-pulse">
            <div className="flex items-center justify-center gap-6 mb-4">
              <img
                src="/images/simbolo do clube.jpg"
                alt="Símbolo Motoclube"
                className="h-24 object-contain"
              />
              <h1 className="text-7xl md:text-8xl font-bold text-accent drop-shadow-lg">
                CARLOS GOMES
              </h1>
              <img
                src="/images/simbolo do clube.jpg"
                alt="Símbolo Motoclube"
                className="h-24 object-contain"
              />
            </div>
            <p className="text-2xl md:text-3xl text-foreground mb-2 font-light">
              VP DO MOTOCLUBE SÃO GONÇALO
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto my-6" />
            <p className="text-xl md:text-2xl text-muted-foreground">
              ANIVERSÁRIO DE HONRA
            </p>
          </div>

          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <Button
              onClick={toggleAudio}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-bold"
            >
              {isPlaying ? '⏸️ PAUSAR MÚSICA' : '🎵 TOCAR MÚSICA'}
            </Button>
            <Button
              onClick={scrollToMotoclube}
              className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-lg font-bold"
              variant="outline"
            >
              📍 LOCALIZAÇÃO
            </Button>
          </div>
        </div>
      </header>

      {/* Countdown Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-accent mb-16">
            FALTAM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'DIAS', value: countdown.dias },
              { label: 'HORAS', value: countdown.horas },
              { label: 'MINUTOS', value: countdown.minutos },
              { label: 'SEGUNDOS', value: countdown.segundos },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-lg p-6 md:p-8 text-center hover:border-accent transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {item.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-20 bg-card border-t border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-accent mb-2">DATA</h3>
              <p className="text-lg text-foreground">10 DE MARÇO DE 2026</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-accent mb-2">HORÁRIO</h3>
              <p className="text-lg text-foreground">19:00 - MADRUGADA ADENTRO</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-accent mb-2">LOCAL</h3>
              <p className="text-lg text-foreground">MOTOCLUBE SÃO GONÇALO</p>
              <p className="text-sm text-muted-foreground mt-2">
                R. Profa. Maria Joaquina, 3592<br />
                Boa Vista, São Gonçalo - RJ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-accent mb-16">
            O HOMEM DO DIA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/meu pai 1.jpg"
                alt="Carlos Gomes"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/meu pai 2.jpg"
                alt="Carlos Gomes"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/meu pai 3.jpg"
                alt="Carlos Gomes"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/meu pai 4.jpg"
                alt="Carlos Gomes"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/meu pai 5.jpg"
                alt="Carlos Gomes"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Club Section */}
      <section ref={motoclubeRef} className="py-20 bg-background border-t border-border scroll-mt-20">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-accent mb-16">
            MOTOCLUBE SÃO GONÇALO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/foto da sede do moto clube.jpg"
                alt="Motoclube São Gonçalo"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="mb-8 flex justify-center md:justify-start">
                <img
                  src="/images/simbolo do clube.jpg"
                  alt="Símbolo do Clube"
                  className="h-32 object-contain"
                />
              </div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                O Motoclube São Gonçalo é um espaço de camaradagem, liberdade e pura adrenalina. 
                Aqui, a gente celebra a paixão pelas motos, a amizade entre os irmãos de clube 
                e o espírito indomável que nos une.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Carlos Gomes, como VP, é um pilar dessa comunidade, liderando com força, 
                respeito e dedicação. Essa noite é para honrar seu legado!
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-accent mb-3">📍 ENDEREÇO</h3>
                <p className="text-foreground font-semibold mb-2">Motoclube São Gonçalo</p>
                <p className="text-muted-foreground">
                  R. Profa. Maria Joaquina, 3592<br />
                  Boa Vista, São Gonçalo - RJ, 24400-001
                </p>
                <a
                  href="https://maps.google.com/?q=R.+Profa.+Maria+Joaquina,+3592,+Boa+Vista,+São+Gonçalo,+RJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-accent text-accent-foreground px-6 py-2 rounded font-bold hover:bg-accent/90 transition-colors"
                >
                  📍 ABRIR NO MAPA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20 bg-card border-t border-b border-border">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-accent mb-16">
            A GALERA DO CLUBE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/membros do clube 1.jpg"
                alt="Membros do Clube"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-accent/20 transition-shadow">
              <img
                src="/images/membros do clube 2.jpg"
                alt="Membros do Clube"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/10 via-background to-accent/10 border-t border-border">
        <div className="container text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-accent mb-6">
            PREPARE-SE PARA A FESTA!
          </h2>
          <p className="text-xl text-foreground mb-12 max-w-2xl mx-auto">
            Som no máximo, cerveja gelada, amigos, motos e muita adrenalina. 
            Essa noite será LENDÁRIA!
          </p>
          <Button
            onClick={() => {
              const whatsappUrl = `https://wa.me/?text=Vou%20estar%20na%20festa%20de%20aniversário%20do%20Carlos%20Gomes%20no%20Motoclube%20São%20Gonçalo%20em%2003%20de%20outubro!%20🏍️🎉`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-6 text-xl font-bold"
          >
            CONFIRMAR PRESENÇA 🤘
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border text-center">
        <p className="text-muted-foreground mb-2">
          CARLOS GOMES BIRTHDAY | 03 DE OUTUBRO | MOTOCLUBE SÃO GONÇALO
        </p>
        <p className="text-accent font-bold">
          🏍️ VAI SER LENDÁRIO! 🏍️
        </p>
      </footer>
    </div>
  );
}
