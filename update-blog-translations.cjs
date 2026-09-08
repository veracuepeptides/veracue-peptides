const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages/en.json');
const esPath = path.join(__dirname, 'messages/es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData.blog = {
  hero: {
    title: "The U.S. Authority in Advanced Peptide Research & Scientific Insights",
    description: "Explore peer-reviewed peptide research, advanced laboratory protocols, reconstitution guides, and analytical testing standards curated for American scientific professionals. Trusted educational resources for 99%+ pure research compounds—strictly for in-vitro laboratory use only.",
    exploreLatestLong: "Explore Latest Articles",
    exploreLatestShort: "Explore Articles"
  },
  compliance: {
    title: "Compliance",
    description: "All products offered by 99PurityPeptides are strictly intended for in-vitro laboratory research and analytical applications only. Products are not approved for human consumption, therapeutic use, or medical application."
  },
  latestArticle: "Latest Article",
  readArticle: "Read article",
  noArticlesFound: "No articles found",
  noArticlesDesc: "We couldn't find any articles in the \"{category}\" category.",
  viewAllArticles: "View all articles",
  loadMore: "Load More Posts",
  shareArticle: "Share article",
  linkCopied: "Link copied to clipboard!"
};

esData.blog = {
  hero: {
    title: "La Autoridad de EE. UU. en Investigación Avanzada de Péptidos y Conocimientos Científicos",
    description: "Explore investigaciones de péptidos revisadas por pares, protocolos de laboratorio avanzados, guías de reconstitución y estándares de pruebas analíticas seleccionados para profesionales científicos estadounidenses. Recursos educativos confiables para compuestos de investigación con pureza del 99%+ —estrictamente para uso en laboratorio in vitro.",
    exploreLatestLong: "Explorar Últimos Artículos",
    exploreLatestShort: "Explorar Artículos"
  },
  compliance: {
    title: "Cumplimiento",
    description: "Todos los productos ofrecidos por 99PurityPeptides están destinados estrictamente a la investigación de laboratorio in vitro y aplicaciones analíticas. Los productos no están aprobados para el consumo humano, uso terapéutico o aplicación médica."
  },
  latestArticle: "Último Artículo",
  readArticle: "Leer artículo",
  noArticlesFound: "No se encontraron artículos",
  noArticlesDesc: "No pudimos encontrar ningún artículo en la categoría \"{category}\".",
  viewAllArticles: "Ver todos los artículos",
  loadMore: "Cargar Más Publicaciones",
  shareArticle: "Compartir artículo",
  linkCopied: "¡Enlace copiado al portapapeles!"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));

console.log("Blog translations updated");
