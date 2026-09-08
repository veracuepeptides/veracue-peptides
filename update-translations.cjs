const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages/en.json');
const esPath = path.join(__dirname, 'messages/es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const trustBadgesEn = {
  eyebrow: "The 99 Purity Standard",
  titleLine1: "ENGINEERED FOR",
  titleLine2: "ABSOLUTE PRECISION",
  subtitle: "USA-Manufactured. Third-Party Verified.",
  ctaText: "Discover Quality",
  description: "Every research peptide is synthesized in U.S. facilities under 503A and 503B manufacturing standards, independently verified through third-party analytical testing, and lyophilized under vacuum to preserve molecular stability from batch to bench.",
  cards: {
    purity: {
      title: "99.1%+ Verified Purity",
      description: "We never rely on manufacturer claims. Every batch is independently tested by accredited U.S. third-party laboratories to confirm minimum 99% purity before it reaches inventory.",
      tag: "USA Verified",
      microcopy: "503A · 503B Standards"
    },
    stability: {
      title: "Lyophilized Stability",
      description: "Each research compound is lyophilized (freeze-dried) under vacuum, preserving long-term molecular integrity and structural stability throughout transit and cold storage.",
      tag: "Vacuum Sealed",
      microcopy: "Batch-Tested for Stability"
    },
    dosing: {
      title: "Exact Milligram Dosing",
      description: "Precision is non-negotiable. We guarantee exact milligram content per vial under 505A-compliant quality systems, removing dosing guesswork from your research.",
      tag: "Precision Dosed",
      microcopy: "505A Quality Systems"
    }
  }
};

const trustBadgesEs = {
  eyebrow: "El Estándar 99 Purity",
  titleLine1: "DISEÑADO PARA UNA",
  titleLine2: "PRECISIÓN ABSOLUTA",
  subtitle: "Fabricado en EE. UU. Verificado por terceros.",
  ctaText: "Descubre la Calidad",
  description: "Cada péptido de investigación se sintetiza en instalaciones de EE. UU. bajo estándares de fabricación 503A y 503B, se verifica de forma independiente mediante pruebas analíticas de terceros y se liofiliza al vacío para preservar la estabilidad molecular desde el lote hasta el laboratorio.",
  cards: {
    purity: {
      title: "Pureza Verificada del 99.1%+",
      description: "Nunca confiamos en las afirmaciones del fabricante. Cada lote es probado de forma independiente por laboratorios acreditados de terceros en EE. UU. para confirmar una pureza mínima del 99% antes de llegar al inventario.",
      tag: "Verificado en EE. UU.",
      microcopy: "Estándares 503A · 503B"
    },
    stability: {
      title: "Estabilidad Liofilizada",
      description: "Cada compuesto de investigación se liofiliza (se seca por congelación) al vacío, preservando la integridad molecular a largo plazo y la estabilidad estructural durante el tránsito y el almacenamiento en frío.",
      tag: "Sellado al Vacío",
      microcopy: "Lote Probado para Estabilidad"
    },
    dosing: {
      title: "Dosificación Exacta en Miligramos",
      description: "La precisión no es negociable. Garantizamos el contenido exacto de miligramos por vial bajo sistemas de calidad compatibles con 505A, eliminando las conjeturas de dosificación de su investigación.",
      tag: "Dosificación Precisa",
      microcopy: "Sistemas de Calidad 505A"
    }
  }
};

enData.home.trustBadges = trustBadgesEn;
esData.home.trustBadges = trustBadgesEs;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));

console.log("Translations updated");
