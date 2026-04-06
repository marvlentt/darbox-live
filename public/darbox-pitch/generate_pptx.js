import pptxgen from "pptxgenjs";
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const makeShadow = () => ({
  type: "outer", blur: 8, offset: 2, angle: 135,
  color: "000000", opacity: 0.20
});

// Colors
const BG = "0D1117";
const ACCENT = "22C55E";
const TEXT = "FFFFFF";
const TEXT_SUB = "CCCCCC";

// --- SLIDE 1: Cover ---
const s1 = pres.addSlide();
s1.background = { color: BG };
// Decorative circle
s1.addShape(pres.shapes.OVAL, {
  x: 5.5, y: -2, w: 7, h: 7,
  fill: { color: "1A7A4A", transparency: 88 },
  line: { color: "1A7A4A", transparency: 85, width: 1 }
});
// Left accent bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.28, h: 5.625, fill: { color: ACCENT } });

s1.addText("Pitch PIE 2025 · Startup", {
  x: 0.55, y: 0.8, w: 3, h: 0.3,
  fontSize: 12, bold: true, color: ACCENT, align: "left"
});
s1.addText("La tranquillité d'esprit,\nlivrée dans une boîte.", {
  x: 0.55, y: 1.3, w: 8, h: 1.5,
  fontSize: 42, bold: true, color: TEXT, align: "left", lineSpacingMultiple: 1.05
});
s1.addText("Branchez. Protégez. Respirez. Le bouclier réseau préconfiguré.", {
  x: 0.55, y: 2.8, w: 6, h: 0.6,
  fontSize: 16, color: TEXT_SUB, align: "left"
});
// Founder card
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.55, y: 3.8, w: 4.5, h: 1.2, fill: { color: "161B22" }, shadow: makeShadow()
});
s1.addText("Fondateur : Merouan El Hattaki", {
  x: 0.65, y: 3.9, w: 4.3, h: 0.4, fontSize: 16, bold: true, color: TEXT, align: "left"
});
s1.addText("OFPPT ISMONTIC · Infrastructure Digitale\nZéro coût de sous-traitance (Frontend/Backend 100% interne)", {
  x: 0.65, y: 4.3, w: 4.3, h: 0.6, fontSize: 11, color: TEXT_SUB, align: "left"
});

// --- SLIDE 2: Problem ---
const s2 = pres.addSlide();
s2.background = { color: BG };
s2.addText("LE PROBLÈME", { x: 0.5, y: 0.5, w: 4, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s2.addText("Les Parents face au Far Web", { x: 0.5, y: 0.9, w: 5, h: 0.8, fontSize: 32, bold: true, color: TEXT });

s2.addText([
  { text: "Contenus dangereux : Malwares et sites inadaptés accessibles immédiatement.", options: { bullet: true, color: TEXT, fontSize: 14, paraSpaceAfter: 12 } },
  { text: "Aucun contrôle simple : Les apps se désinstallent en 30s.", options: { bullet: true, color: TEXT, fontSize: 14, paraSpaceAfter: 12 } },
  { text: "Nuits sans règles : Difficile d'éteindre le Wi-Fi sans pénaliser les parents.", options: { bullet: true, color: TEXT, fontSize: 14, paraSpaceAfter: 12 } }
], { x: 0.5, y: 2.0, w: 5, h: 2.5, valign: "top" });

// Persona right side
s2.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 1.0, w: 3.5, h: 3.5, fill: { color: "2A1111" } });
s2.addText("BUYER PERSONA", { x: 6.2, y: 1.2, w: 3.1, h: 0.3, fontSize: 10, bold: true, color: "FF6666" });
s2.addText("Khadija Bensaid", { x: 6.2, y: 1.6, w: 3.1, h: 0.5, fontSize: 24, bold: true, color: TEXT });
s2.addText("38 ans · Mère de 3 enfants · Tanger", { x: 6.2, y: 2.1, w: 3.1, h: 0.3, fontSize: 12, color: TEXT_SUB });
s2.addText("« Je veux protéger mes enfants le soir, mais je ne suis pas informaticienne. Les applications sont trop dures à paramétrer. »", { x: 6.2, y: 2.6, w: 3.1, h: 1.5, fontSize: 13, italic: true, color: TEXT });

// --- SLIDE 3: Solution ---
const s3 = pres.addSlide();
s3.background = { color: BG };
s3.addText("LA SOLUTION", { x: 0.5, y: 0.5, w: 5, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s3.addText("3 Étapes. Zéro Compétence Requise.", { x: 0.5, y: 0.9, w: 8, h: 0.8, fontSize: 32, bold: true, color: TEXT });

s3.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.0, w: 3, h: 3, fill: { color: "FFFFFF" } });
s3.addText("[ MASSIF QR CODE POUR DEMO VERCEL ]", { x: 0.5, y: 2.0, w: 3, h: 3, fontSize: 16, bold: true, color: "000000", align: "center" });

s3.addText([
  { text: "Commandez : Recevez un routeur totalement préconfiguré.", options: { bullet: true, color: TEXT, fontSize: 16, paraSpaceAfter: 18 } },
  { text: "Branchez : Un câble derrière votre box internet. Il démarre seul.", options: { bullet: true, color: TEXT, fontSize: 16, paraSpaceAfter: 18 } },
  { text: "Protégez : Réseau 'Maison_Enfants' protégé 24/7.", options: { bullet: true, color: TEXT, fontSize: 16, paraSpaceAfter: 18 } }
], { x: 4.0, y: 2.0, w: 5.5, h: 3, valign: "top" });

// --- SLIDE 4: Offers ---
const s4 = pres.addSlide();
s4.background = { color: BG };
s4.addText("CATALOGUE DES OFFRES", { x: 0.5, y: 0.5, w: 4, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s4.addText("Matériel & Expertise", { x: 0.5, y: 0.9, w: 4, h: 0.8, fontSize: 32, bold: true, color: TEXT });
s4.addText("Un seul paiement. Zéro abonnement.\nConsultez les catalogues physiques pour les détails.", { x: 0.5, y: 1.8, w: 4, h: 1, fontSize: 14, color: TEXT_SUB });

// Offer 1
s4.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.0, w: 4.5, h: 1.8, fill: { color: "161B22" }, line: { color: ACCENT, width: 2 } });
s4.addText("Les Packs Routeur", { x: 5.2, y: 1.2, w: 3, h: 0.4, fontSize: 18, bold: true, color: TEXT });
s4.addText("Essentiel, Couvre-feu, Anti-Distraction...\nRouteur fourni & configuré", { x: 5.2, y: 1.6, w: 3, h: 0.8, fontSize: 12, color: TEXT_SUB });
s4.addText("dès 400 DH", { x: 7.5, y: 1.8, w: 1.8, h: 0.4, fontSize: 18, bold: true, color: ACCENT, align: "right" });

// Offer 2
s4.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 3.2, w: 4.5, h: 1.8, fill: { color: "161B22" } });
s4.addText("Service de Configuration", { x: 5.2, y: 3.4, w: 3, h: 0.4, fontSize: 18, bold: true, color: TEXT });
s4.addText("Vous possédez déjà un routeur ?\nNous le configurons (à distance/domicile)", { x: 5.2, y: 3.8, w: 3, h: 0.8, fontSize: 12, color: TEXT_SUB });
s4.addText("dès 150 DH", { x: 7.5, y: 4.0, w: 1.8, h: 0.4, fontSize: 18, bold: true, color: TEXT, align: "right" });

// --- SLIDE 5: Commitments ---
const s5 = pres.addSlide();
s5.background = { color: BG };
s5.addText("CHARTE D'ENGAGEMENTS", { x: 0.5, y: 0.5, w: 9, h: 0.3, fontSize: 12, bold: true, color: ACCENT, align: "center" });
s5.addText("Nos Promesses Fondamentales", { x: 0.5, y: 0.9, w: 9, h: 0.8, fontSize: 32, bold: true, color: TEXT, align: "center" });

const c_x = [0.5, 3.83, 7.16];
const titles = ["Blocage Natif DNS", "True Plug & Play", "Support de Proximité"];
const desc = [
  "Neutralisation des sites adultes, jeux d'argent et malwares au niveau du réseau.",
  "Installation simplifiée à l'extrême. Aucun paramétrage logiciel requis par le parent.",
  "Assistance réactive sur WhatsApp, garantie 30 jours, et intervention locale à Tanger."
];
for(let i=0; i<3; i++) {
  s5.addShape(pres.shapes.RECTANGLE, { x: c_x[i], y: 2.2, w: 2.33, h: 2.5, fill: { color: "161B22" }, shadow: makeShadow() });
  s5.addText(titles[i], { x: c_x[i], y: 2.4, w: 2.33, h: 0.4, fontSize: 16, bold: true, color: TEXT, align: "center" });
  s5.addText(desc[i], { x: c_x[i]+0.1, y: 2.9, w: 2.13, h: 1.5, fontSize: 12, color: TEXT_SUB, align: "center" });
}

// --- SLIDE 6: BMC ---
const s6 = pres.addSlide();
s6.background = { color: BG };
s6.addText("BUSINESS MODEL CANVAS", { x: 0.5, y: 0.5, w: 9, h: 0.3, fontSize: 12, bold: true, color: ACCENT, align: "center" });
s6.addText("Aperçu Stratégique", { x: 0.5, y: 0.9, w: 9, h: 0.8, fontSize: 32, bold: true, color: TEXT, align: "center" });

const bmcTitles = ["Partenaires Clés", "Proposition de Valeur", "Canaux"];
const bmcDesc = [
  "• Grossistes hardware\n• Livreurs locaux (Tanger)\n• Associations de parents",
  "• Tranquillité garantie\n• Zéro compétence requise\n• Paiement unique",
  "• E-commerce web\n• Campagnes Meta Ads\n• Newsletter gratuite"
];
for(let i=0; i<3; i++) {
  s6.addShape(pres.shapes.RECTANGLE, { x: c_x[i], y: 2.2, w: 2.33, h: 0.1, fill: { color: ACCENT } });
  s6.addShape(pres.shapes.RECTANGLE, { x: c_x[i], y: 2.3, w: 2.33, h: 2.5, fill: { color: "161B22" } });
  s6.addText(bmcTitles[i], { x: c_x[i], y: 2.5, w: 2.33, h: 0.4, fontSize: 14, bold: true, color: ACCENT, align: "center" });
  s6.addText(bmcDesc[i], { x: c_x[i]+0.2, y: 3.1, w: 1.93, h: 1.5, fontSize: 12, color: TEXT, align: "left" });
}

// --- SLIDE 7: Go To Market ---
const s7 = pres.addSlide();
s7.background = { color: BG };
s7.addText("GO-TO-MARKET", { x: 0.5, y: 0.5, w: 4, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s7.addText("Acquisition & Rétention", { x: 0.5, y: 0.9, w: 4, h: 0.8, fontSize: 32, bold: true, color: TEXT });
s7.addText("Un écosystème conçu pour éduquer avant de vendre.", { x: 0.5, y: 1.8, w: 4, h: 1, fontSize: 14, color: TEXT_SUB });

const rectOpts = { fill: { color: "161B22" }, w: 4.5, h: 1.2 };
s7.addShape(pres.shapes.RECTANGLE, { ...rectOpts, x: 5.0, y: 1.0, line: { color: ACCENT, width: 1 } });
s7.addText("1. Stratégie de Pénétration (400 DH)", { x: 5.2, y: 1.1, w: 4.1, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s7.addText("Entrée accessible pour instaurer la confiance, suivi d'un upsell vers les Packs supérieurs.", { x: 5.2, y: 1.4, w: 4.1, h: 0.7, fontSize: 11, color: TEXT });

s7.addShape(pres.shapes.RECTANGLE, { ...rectOpts, x: 5.0, y: 2.5 });
s7.addText("2. Newsletter DarBox", { x: 5.2, y: 2.6, w: 4.1, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s7.addText("Guide gratuit distribué sur WhatsApp pour fidéliser les parents.", { x: 5.2, y: 2.9, w: 4.1, h: 0.7, fontSize: 11, color: TEXT });

s7.addShape(pres.shapes.RECTANGLE, { ...rectOpts, x: 5.0, y: 4.0 });
s7.addText("3. Bouche-à-Oreille", { x: 5.2, y: 4.1, w: 4.1, h: 0.3, fontSize: 12, bold: true, color: ACCENT });
s7.addText("Khadija en parle à sa voisine. Effet de réseau via les écoles.", { x: 5.2, y: 4.4, w: 4.1, h: 0.7, fontSize: 11, color: TEXT });

// --- SLIDE 8: Financials ---
const s8 = pres.addSlide();
s8.background = { color: BG };
s8.addText("ÉTUDE FINANCIÈRE", { x: 0.5, y: 0.5, w: 9, h: 0.3, fontSize: 12, bold: true, color: ACCENT, align: "center" });
s8.addText("Rentable dès la 1ère semaine", { x: 0.5, y: 0.9, w: 9, h: 0.8, fontSize: 32, bold: true, color: TEXT, align: "center" });

const finKpis = [
  { val: "250 DH", label: "Charges Fixes / Mois", sub: "Internet, Téléphone, Transport", hl: false },
  { val: "235 DH", label: "Marge Brute Moyenne", sub: "Modèle Hardware (mix)", hl: false },
  { val: "1.1 vente", label: "Point Mort", sub: "Seuil de rentabilité: 6 jours", hl: true },
  { val: "87 %", label: "Marge Bonus (Service)", sub: "Service de configuration sans matériel", hl: true }
];

finKpis.forEach((k, i) => {
  const x = 2.0 + (i % 2) * 3.2;
  const y = 2.0 + Math.floor(i / 2) * 1.6;
  const bg = k.hl ? "0C2B1B" : "161B22";
  const valC = k.hl ? ACCENT : TEXT;
  
  s8.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 1.4, fill: { color: bg }, shadow: makeShadow() });
  s8.addText(k.label, { x, y: y+0.1, w: 3.0, h: 0.3, fontSize: 11, bold: true, color: TEXT_SUB, align: "center" });
  s8.addText(k.val, { x, y: y+0.4, w: 3.0, h: 0.6, fontSize: 28, bold: true, color: valC, align: "center" });
  s8.addText(k.sub, { x, y: y+1.0, w: 3.0, h: 0.3, fontSize: 9, color: TEXT_SUB, align: "center" });
});

// --- SLIDE 9: Conclusion ---
const s9 = pres.addSlide();
s9.background = { color: BG };
s9.addText("DarBox", { x: 0.5, y: 1.5, w: 9, h: 1.0, fontSize: 64, bold: true, color: TEXT, align: "center" });
s9.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 2.6, w: 1, h: 0.05, fill: { color: ACCENT } });

s9.addText("Prochaines étapes : Validation en PFE et début de stage en déploiement logiciel.", { x: 1.0, y: 3.0, w: 8, h: 0.5, fontSize: 14, color: TEXT_SUB, align: "center" });
s9.addText("« Chaque routeur DarBox vendu est un enfant de plus protégé à Tanger. »", { x: 1.0, y: 3.8, w: 8, h: 1.0, fontSize: 20, italic: true, bold: true, color: TEXT, align: "center" });
s9.addText("Merci. Place aux questions.", { x: 1.0, y: 4.8, w: 8, h: 0.5, fontSize: 12, bold: true, color: ACCENT, align: "center" });


pres.writeFile({ fileName: "DarBox_Pitch.pptx" }).then(fileName => {
    console.log(`created file: ${fileName}`);
});
