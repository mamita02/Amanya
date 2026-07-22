import forceNLogo from "../assets/partners/logo/FORCE-N.jpeg";
import GOFARLogo from "../assets/partners/logo/GOFAR HOLDING.jpeg";
import KebaLogo from "../assets/partners/logo/Keba Consulting.jpeg";
import SparckLogo from "../assets/partners/logo/Sparck Project.jpeg";

const partnerLogos = [
  { name: "FORCE-N", src: forceNLogo },
  { name: "GOFAR HOLDING", src: GOFARLogo },
  { name: "Keba Consulting", src: KebaLogo },
  { name: "Sparck Project", src: SparckLogo },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex w-48 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-[#B8873A]/40">
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src={src}
          alt={name}
          draggable={false}
          className="h-12 max-w-full rounded-lg object-contain"
          loading="lazy"
        />
        <h3 className="mt-2 text-xs font-medium text-white/80" draggable={false}>
          {name}
        </h3>
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const track = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <div className="relative mt-12 overflow-hidden py-4">
      {/* Masques de dégradé latéral sur fond sombre */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#111111] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#111111] to-transparent sm:w-20" />

      <div className="partner-marquee-track sm:gap-14">
        {track.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section id="partenaires" className="w-full bg-[#111111] py-20 ">
      <div className="text-center">
        <h2 className="mt-3 font-serif text-4xl font-medium text-white sm:text-5xl">
          Nos Partenaires
        </h2>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B8873A] mt-3">
          Ils Nous Font Confiance
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#B8873A] to-transparent" />
      </div>

      <PartnerLogoMarquee />
    </section>
  );
}