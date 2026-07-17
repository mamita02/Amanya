import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin } from "lucide-react";
import contactBg from "../assets/contact-bg.jpg";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — AMANYA" },
      {
        name: "description",
        content:
          "Contactez AMANYA pour vos questions, partenariats ou commandes en gros. Notre équipe vous répond sous 24h.",
      },
    ],
  }),
});

const contactReasons = [
  "Assistance sur vos commandes",
  "Informations sur les produits",
  "Devenir vendeur sur la marketplace",
  "Demande de partenariat",
  "Accompagnement des grossistes",
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f2e6d7]">
      <Header />

      <section className="relative isolate min-h-[calc(100vh-8rem)] overflow-hidden">
        {/* <img
          src={contactBg}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        /> */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#701718]/95 via-[#A9131A]/80 to-[#D9101D]/40" />
        <div className="absolute inset-0 -z-10 bg-[#f2e6d7] " />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-center text-black">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#CE9A65]">
              Contact
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-[1.05] text-black sm:text-6xl">
                Une question ?
              <span className="block bg-gradient-to-r from-[#701718] via-[#A9131A] to-[#D9101D] bg-clip-text text-transparent">
                Une opportunité ?
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80">
            Que vous soyez acheteur, vendeur ou partenaire, nous sommes disponibles pour répondre à vos questions et vous accompagner dans votre développement.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { label: "E-mail", value: "contact@amanya-distribution.com" },
                { label: "Service commercial", value: "+221 33 820 09 36" },
                { label: "Siège social", value: "Sénégal Dakar, Ouest Foire" },
                { label: "Horaires", value: "Lun - Ven: 09:00 - 17:00" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#CE9A65]">
                    {info.label}
                  </div>
                  <div className="ml-auto text-sm font-medium text-black">{info.value}</div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci ! Votre message a bien été envoyé.");
            }}
            className="relative rounded-[2rem] border border-gray-200 bg-white p-8 shadow-md sm:p-10"
          >
            <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#CE9A65]/30 via-transparent to-[#D9101D]/20 opacity-50 [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)] [mask-composite:exclude] p-px" />

            <div className="relative grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { label: "Nom complet", type: "text", required: true, placeholder: "Nom complet" },
                  { label: "Email", type: "email", required: true, placeholder: "Adresse email" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[10px] font-bold uppercase tracking-[0.25em]  text-[#E4C987]">
                      {f.label}
                    </label>
                    <input
                      required={f.required}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#CE9A65] focus:ring-2 focus:ring-[#CE9A65]/40"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E4C987]">
                  Sujet
                </label>
                <input
                  type="text"
                  placeholder="Sujet"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#CE9A65] focus:ring-2 focus:ring-[#CE9A65]/40"
                />
              </div>

              {/* <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E4C987]">
                  Objet de votre demande
                </label>
                <select
                  required className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-black outline-none transition focus:border-[#CE9A65] focus:ring-2 focus:ring-[#CE9A65]/40">
                  <option className="bg-white text-black" value="">
                    Sélectionnez un objet
                  </option>
                  <option className="bg-white text-black" value="informations produit">
                    Demande d'informations
                  </option>
                  <option className="bg-white text-black" value="commande">
                    Commande
                  </option>
                  <option className="bg-white text-black" value="devenir grossiste">
                    Devenir grossiste
                  </option>
                  <option className="bg-white text-black" value="partenariat">
                    Partenariat
                  </option>
                </select>
              </div> */}

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E4C987]">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Décrivez votre demande ou votre projet..."
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#CE9A65] focus:ring-2 focus:ring-[#CE9A65]/40"
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#701718] via-[#A9131A] to-[#D9101D] px-10 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_10px_40px_-10px_rgba(112,23,24,0.6)] transition hover:shadow-[0_15px_50px_-10px_rgba(112,23,24,0.8)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Envoyer ma demande</span>
                <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-32">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">
              Pourquoi nous contacter ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-black/70">
              Notre équipe vous accompagne à chaque étape, que vous soyez client, vendeur ou partenaire.
            </p>
            <ul className="mt-8 space-y-4">
              {contactReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-black">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#CE9A65] text-[#fff]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm sm:text-base">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-md">
            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#CE9A65]/15 text-[#CE9A65]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#CE9A65]">
                  Notre localisation
                </p>
                <p className="text-sm font-medium text-black">Sénégal Dakar, Ouest Foire</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <iframe
                title="Carte AMANYA — Ouest Foire, Dakar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1838.5172345622636!2d-17.46959415956094!3d14.748729871360585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10d0021cd757b%3A0x35fb075f8128917!2sMCE!5e0!3m2!1sfr!2ssn!4v1784215958032!5m2!1sfr!2ssn"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
