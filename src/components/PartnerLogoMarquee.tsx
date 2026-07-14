import burpSuiteLogo from "../assets/partners/logo/Burp Suite.png";
import hashcatLogo from "../assets/partners/logo/Hashcat.png";
import metasploitLogo from "../assets/partners/logo/metasploit.png";
import nmapLogo from "../assets/partners/logo/nmap.png";
import nessusLogo from "../assets/partners/logo/Nessus.png";

const partnerLogos = [
  { name: "Nmap", src: nmapLogo },
  { name: "Nessus", src: nessusLogo },
  { name: "Metasploit", src: metasploitLogo },
  { name: "Burp Suite", src: burpSuiteLogo },
  { name: "Hashcat", src: hashcatLogo },
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
  const track = [...partnerLogos, ...partnerLogos];

  return (
    <div className="relative mt-12 overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--gold-soft)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--gold-soft)] to-transparent sm:w-24" />

      <div className="partner-marquee-track gap-10 px-4 sm:gap-14 sm:px-6">
        {track.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}
