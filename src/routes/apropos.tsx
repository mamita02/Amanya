import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from "@tanstack/react-router";
import {ArrowRight, Target, Eye, Handshake, Star, Rocket, Globe } from "lucide-react";
import StoreImg from '../assets/store_ecom.jpg';
import mounia from "../assets/Mounia.jpeg";
import HeroImg from '../assets/Logo.png'

export const Route = createFileRoute('/apropos')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />

      <main className="bg-[#FAF8F4]">


        <section className="relative bg-black h-[500px] flex items-center overflow-hidden">

          {/* Image arrière-plan */}

          <img
            src={HeroImg}
            alt="AMANYA"
            className="absolute inset-0 w-full h-full object-contain"/>


          {/* Overlay sombre */}

          <div className="absolute inset-0 bg-black/70" />

          {/* Contenu */}

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">

            <h1 className="mt-8 text-5xl lg:text-8xl font-semibold text-white">
              À propos d'AMANYA
            </h1>

          </div>

        </section>


        <section className="py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* Image */}

              <div className="relative order-2 lg:order-1">
                <img src={StoreImg} alt="Equipe AMANYA" className="rounded-[32px] object-cover shadow-lg w-full h-[500px]"/>
              </div>

              {/* Texte */}

              <div className="order-1 lg:order-2">

                <h1 className="font-serif mt-6 text-4xl xl:text-5xl leading-tight font-medium text-[#161616]">
                  Plus qu'une <span className="text-[#B8873A]">
                    {" "}marketplace
                  </span>,
                  <br />
                  un partenaire de croissance.
                </h1>

                <p className="font-serif mt-8 text-base sm:text-lg text-gray-500">
                  AMANYA est une plateforme de distribution et de marketplace
                  conçue pour connecter fournisseurs, grossistes,
                  commerçants et consommateurs autour d'un même
                  écosystème.
                </p>

                <p className="font-serif mt-5 text-base sm:text-lg text-gray-500">
                  Notre ambition est de rendre les produits de qualité
                  accessibles au plus grand nombre tout en offrant
                  aux entreprises une solution moderne pour vendre,
                  développer leur visibilité et faire grandir leur activité.
                </p>

                <p className="font-serif mt-5 text-base sm:text-lg text-gray-500">
                  Nous croyons qu'un commerce performant repose
                  avant tout sur la confiance, la transparence
                  et des relations durables entre tous les acteurs.
                </p>

                <div className="flex flex-wrap gap-5 mt-10">

                  <Link to="/marketplace"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#B8873A] px-7 py-4 text-white font-medium hover:bg-[#A5782F] transition" >
                    Explorer la marketplace

                    <ArrowRight size={18} />

                  </Link>

                  <Link to="/contact"
                    className="rounded-xl border border-[#B8873A] px-7 py-4 font-medium text-[#B8873A] hover:bg-[#B8873A] hover:text-white transition" >
                    Nous contacter
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}

        <section className="pb-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="rounded-[28px] bg-white p-10 shadow-sm border border-gray-100 hover:shadow-xl transition">
                
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#B8873A]/10 flex items-center justify-center">
                    <Target  className="text-[#B8873A]" size={30} />

                  </div>
                  <h2 className="font-serif text-3xl font-medium text-[#161616]">
                    Notre mission
                  </h2>
                </div>

                <p className="mt-6 text-gray-600">
                  Faciliter le commerce en mettant à disposition
                  une plateforme unique où chacun peut acheter,
                  vendre et développer son activité en toute confiance.
                </p>

                <p className="mt-5 text-gray-600">
                  Nous accompagnons aussi bien les particuliers
                  que les professionnels avec des solutions adaptées
                  au commerce de détail, au commerce de gros
                  et à la distribution.
                </p>

            </div>

              {/* Vision */}
              <div className="rounded-[28px] bg-black p-10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#B8873A]/20 flex items-center justify-center">
                    <Eye  className="text-[#B8873A]"  size={30} />
                  </div>

                  <h2 className="font-serif text-3xl font-medium text-white">
                    Notre vision
                  </h2>
                </div>

                <p className="font-serif mt-6 text-white/80">
                  Construire la plateforme de référence
                  en Afrique de l'Ouest pour la distribution
                  moderne, en réunissant innovation digitale,
                  qualité de service et réseau de partenaires fiables.
                </p>

                <p className="font-serif mt-5 text-white/80">
                  Nous voulons permettre à chaque entreprise,
                  quelle que soit sa taille,
                  d'accéder aux mêmes opportunités
                  de croissance.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* ================= NOS VALEURS ================= */}

        <section className="py-24 bg-white">

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mx-auto text-center">

              <span className="inline-flex rounded-full bg-[#B8873A]/10 px-5 py-2 text-xs tracking-[0.30em] uppercase font-semibold text-[#B8873A]">
                Nos valeurs
              </span>

              <h2 className="font-serif mt-6 text-4xl lg:text-5xl font-medium text-[#161616]">
                Les fondements de notre engagement
              </h2>

              <p className="font-serif mt-6 text-lg text-gray-600">
                Chaque décision que nous prenons repose sur des valeurs fortes afin
                d'offrir une expérience fiable, moderne et durable à tous les acteurs
                de notre plateforme.
              </p>

            </div>


            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

              {/* Carte */}

              <div className="group rounded-[28px] border border-gray-100 bg-[#FAF8F4] p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300">

                <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B8873A] text-white flex items-center justify-center text-3xl">
                  <Handshake />
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#161616]">
                  Confiance
                </h3>
                </div>

                <p className="font-serif mt-4 text-gray-600">
                  Des vendeurs vérifiés, des transactions sécurisées
                  et des relations construites sur la transparence.
                </p>

              </div>


              <div className="group rounded-[28px] border border-gray-100 bg-[#FAF8F4] p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300">

                <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B8873A] text-white flex items-center justify-center text-3xl">
                  <Star />
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#161616]">
                  Qualité
                </h3>
                </div>

                <p className="mt-4 text-gray-600">
                  Des produits sélectionnés auprès de fournisseurs fiables
                  répondant à des exigences élevées.
                </p>

              </div>


              <div className="group rounded-[28px] border border-gray-100 bg-[#FAF8F4] p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300">

                <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B8873A] text-white flex items-center justify-center text-3xl">
                  <Rocket />
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#161616]">
                  Innovation
                </h3>
                </div>

                <p className="mt-4 text-gray-600">
                  Une plateforme moderne qui simplifie
                  l'achat, la vente et la distribution.
                </p>

              </div>

              <div className="group rounded-[28px] border border-gray-100 bg-[#FAF8F4] p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300">

                <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B8873A] text-white flex items-center justify-center text-3xl">
                  <Globe />
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#161616]">
                  Accessibilité
                </h3>
                </div>

                <p className="mt-4 text-gray-600">
                  Une plateforme ouverte aux particuliers,
                  commerçants, revendeurs, grossistes
                  et partenaires.
                </p>

              </div>

            </div>
          </div>

        </section>

        {/* ================= LE MOT DE LA FONDATRICE ================= */}

        <section className="bg-white">
          <div className="mx-auto">
            
            <div className="p-8 sm:p-12 lg:px-16 lg:py-24 border-t-4 border-[#B8873A]">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <img src={mounia} alt="Mounia — AMANYA" loading="lazy" className="h-auto w-full object-cover shadow-2xl" style={{
                        borderRadius: "62% 38% 56% 44% / 54% 49% 51% 46%",
                      }}
                    />
                  </div>
                </div>

                {/* Contenu texte */}
                <div className="lg:col-span-7">
                  <span className="inline-flex rounded-full bg-[#B8873A]/10 px-5 py-2 text-xs tracking-[0.30em] uppercase font-semibold text-[#B8873A]">
                    Vision & Leadership
                  </span>

                  <h2 className="font-serif mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium text-[#161616]">
                    Le mot de la fondatrice
                  </h2>

                  <blockquote className="font-serif mt-6 italic text-gray-700 border-l-2 border-[#B8873A] pl-5 text-base sm:text-lg leading-relaxed">
                    « Notre ambition n'est pas seulement de faciliter des transactions, mais de bâtir des ponts solides pour que chaque commerçant, fournisseur et entrepreneur d'Afrique de l'Ouest puisse réaliser son plein potentiel. »
                  </blockquote>

                  <p className="font-serif mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                    En créant <strong className="text-[#161616] font-medium">AMANYA</strong> dans la continuité de notre agence MCE (Management Communication Event), nous avons voulu répondre à un besoin fondamental : structurer un maillon de distribution fiable, transparent et directement accessible à tous.
                  </p>

                  <p className="font-serif mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                    Que vous soyez grossiste, revendeur ou partenaire, nous mettons notre écosystème à votre service pour simplifier vos opérations et propulser votre croissance.
                  </p>

                  {/* Signature */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4">
                    <div>
                      <p className="font-serif text-2xl font-medium text-[#161616]">
                        Mounia
                      </p>
                      <p className="text-xs tracking-[0.25em] uppercase text-[#B8873A] font-semibold mt-1">
                        Fondatrice & Directrice Générale
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="w-full">
          <div className="mx-auto">

            <div className="bg-[#B8873A]/10 px-8 py-16 lg:px-20 lg:py-20 text-center overflow-hidden relative">

              <div className="relative z-10">

                <h2 className="font-serif text-4xl lg:text-5xl font-medium text-[#161616] leading-tight">
                  Prêt à développer
                  votre activité ?
                </h2>

                <p className="font-serif mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                  Que vous soyez client, vendeur, fournisseur
                  ou partenaire, AMANYA vous accompagne
                  dans une nouvelle façon de faire du commerce.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-5">
                  <Link
                    to="/marketplace"
                    className="rounded-xl bg-[#B8873A] px-8 py-4 text-white font-medium hover:bg-[#A5782F] transition">
                    Découvrir la marketplace
                  </Link>

                  <Link to="/contact"
                    className="rounded-xl border border-[#B8873A] px-8 py-4 text-[#161616] font-medium hover:bg-[#B8873A] hover:text-white transition">
                    Devenir partenaire
                  </Link>

                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

