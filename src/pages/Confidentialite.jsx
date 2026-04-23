import React from 'react';
import { Link } from 'react-router-dom';

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F0E8] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-white/30">
            ← Retour à l'accueil
          </Link>
        </div>
        
        <h1 className="text-3xl font-black mb-2">Politique de Confidentialité</h1>
        <p className="text-sm opacity-60 italic mb-8">Dernière mise à jour : avril 2026</p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Ce que nous collectons</h2>
        <ul className="text-sm leading-relaxed opacity-80 list-disc pl-5 space-y-2">
          <li><strong>Adresse email :</strong> uniquement si vous vous abonnez à notre newsletter, via le formulaire de la page d'accueil.</li>
          <li><strong>Numéro de téléphone :</strong> uniquement si vous nous contactez via WhatsApp, dans le cadre d'une commande ou d'une demande de devis.</li>
        </ul>
        <p className="text-sm leading-relaxed opacity-80 mt-4">
          Nous ne collectons aucune donnée de navigation, aucun cookie de tracking, aucune donnée via les appareils connectés au routeur DarBox.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Ce que nous ne faisons pas</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Nous ne revendons pas, ne partageons pas, et n'exploitons pas commercialement vos données personnelles. Aucune donnée de navigation de vos enfants ne transite par nos serveurs.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Newsletter</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Si vous vous abonnez à notre newsletter, votre adresse email est utilisée uniquement pour vous envoyer des conseils de sécurité numérique et des informations sur DarBox. Vous pouvez vous désabonner à tout moment en répondant "STOP" à n'importe quel email reçu.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Contact</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Pour toute question relative à vos données :<br />
          <a href="mailto:merouan@darbox.live" className="underline hover:opacity-100">merouan@darbox.live</a>
        </p>
      </div>
    </div>
  );
}
