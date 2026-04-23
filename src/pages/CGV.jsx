import React from 'react';
import { Link } from 'react-router-dom';

export default function CGV() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F0E8] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-white/30">
            ← Retour à l'accueil
          </Link>
        </div>
        
        <h1 className="text-3xl font-black mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm opacity-60 italic mb-8">Dernière mise à jour : avril 2026</p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Vendeur</h2>
        <div className="text-sm leading-relaxed opacity-80 space-y-1">
          <p>DarBox — Merouan El Hattaki</p>
          <p>Tanger, Maroc</p>
          <p>Contact : merouan@darbox.live | +212 621 429 030</p>
        </div>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Produits</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Les produits DarBox sont des routeurs Wi-Fi préconfigurés vendus comme solution de contrôle parental. Chaque boîtier est testé et configuré individuellement avant expédition.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Commandes</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Les commandes sont passées via WhatsApp au +212 621 429 030. Aucune commande n'est validée avant confirmation écrite du vendeur et réception du paiement.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Prix</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Tous les prix sont affichés en dirhams marocains (DH), TTC. Aucun abonnement mensuel. Le paiement est unique, à la commande.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Livraison</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Livraison à Tanger et environs (rayon 30 km) : 0–25 DH selon distance.<br />
          Expédition nationale via Amana ou Barid Al-Maghrib sur demande.<br />
          Délai moyen : 2–5 jours ouvrables après confirmation de commande.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Paiement</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Virement bancaire, paiement en espèces à la livraison (Tanger uniquement), ou via CIH/CashPlus sur demande. Aucun paiement par carte en ligne.
        </p>

        <h2 className="text-lg font-semibold text-[#1A7A4A] mt-8 mb-2">Droit applicable</h2>
        <p className="text-sm leading-relaxed opacity-80">
          Ces conditions sont régies par le droit marocain. Pour tout litige, les parties chercheront une résolution amiable avant tout recours judiciaire.
        </p>
      </div>
    </div>
  );
}
