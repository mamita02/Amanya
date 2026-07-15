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
    <div className="flex w-44 shrink-0 items-center justify-center rounded-2xl border border-border/40 bg-[#F5EDE5] px-6 py-4 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <img src={src} alt={name} draggable={false} className="max-h-14 max-w-full object-contain" loading="lazy" />
        <h3 className="mt-2 text-sm font-medium text-black" draggable={false}>{name}</h3>
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const track = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <div className="relative mt-12 overflow-hidden py-8">
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fefbe8] via-[#e6c08d] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fefbe8] via-[#e6c08d] to-transparent sm:w-24" /> */}

      <div className="partner-marquee-track px-4 sm:gap-14 sm:px-6">
        {track.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}
