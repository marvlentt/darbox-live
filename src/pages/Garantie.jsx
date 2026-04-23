import React from 'react';
import { Link } from 'react-router-dom';

export default function Garantie() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F0E8] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-white/30">
            ← Retour à l'accueil
          </Link>
        </div>
        
        <h1 className="text-3xl font-black mb-2">Garantie & Retour</h1>
        <p className="text-sm opacity-60 italic mb-8">Dernière mise à jour : avril 2026</p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Garantie matérielle</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Chaque routeur DarBox est garanti 30 jours à compter de la date de livraison. Si votre boîtier présente un défaut matériel (ne démarre pas, LED anormale, pas de réseau Wi-Fi), nous l'échangeons gratuitement.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Procédure</h2>
        <ol className="text-sm leading-relaxed opacity-80 list-decimal pl-5 space-y-2">
          <li>Contactez-nous sur WhatsApp au +212 621 429 030 avec une description du problème et une photo si possible.</li>
          <li>Nous diagnostiquons à distance (sous 24h).</li>
          <li>Si l'échange est validé : on organise la récupération et le remplacement (Tanger uniquement) ou l'envoi postal.</li>
        </ol>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Ce qui n'est pas couvert</h2>
        <ul className="text-sm leading-relaxed opacity-80 list-disc pl-5 space-y-2">
          <li>Dommages causés par une mauvaise manipulation (chute, eau, surtension)</li>
          <li>Routeurs dont la configuration a été modifiée par l'utilisateur</li>
          <li>Demandes de retour après 30 jours</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Satisfaction</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Si pour une raison quelconque le produit ne correspond pas à vos attentes dans les 7 jours suivant la livraison, contactez-nous. Nous cherchons toujours une solution avant de fermer un dossier.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Contact</h2>
        <p className="text-sm leading-relaxed opacity-80">
          <a href="mailto:merouan@darbox.live" className="hover:opacity-100 underline">merouan@darbox.live</a> | +212 621 429 030
        </p>
      </div>
    </div>
  );
}
