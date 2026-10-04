import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// KPV (Lys-Pro-Val). Research-use-only copy: molecular identity, transporter and receptor context at assay level,
// analytical documentation. Facts come from docs/product-contents-1/veracue-kpv-product-page.json;
// disease-model and inflammation framing, references, regulatory discussion and usage content are intentionally left out.

const NAME = 'KPV'
const SLUG = 'kpv'

const SKU_CODE = 'KPV'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_KPV_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificates page', href: '/certificates' }]

const SEO_TITLE = 'KPV Research Peptide (Lys-Pro-Val)'
const SEO_DESCRIPTION =
  "KPV is the tiny Lys-Pro-Val tripeptide from alpha-MSH (CAS 67727-97-3). See how to confirm it by mass and COA. One 10 mg vial size, research use only."
const DESCRIPTION =
  "KPV is the three-residue peptide Lys-Pro-Val, the C-terminal end of alpha-MSH (residues 11 to 13). Its free-acid reference form is C16H30N4O4 with an average mass of 342.44 g/mol and CAS 67727-97-3. Because it is so small, KPV is easy to confuse with its parent alpha-MSH and the related tripeptide KdPT, so identity should be checked against the sequence and mass. A 10 mg vial is offered for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is KPV?'),
    p('KPV is a synthetic tripeptide made of lysine, proline and valine (Lys-Pro-Val). The same three residues form the C-terminal end of α-melanocyte-stimulating hormone, so the literature also calls it α-MSH (11-13). Its free-acid reference form has the formula C16H30N4O4 and CAS number 67727-97-3. Veracue supplies KPV for laboratory research only.'),
    p('Interest in the fragment goes back to 1980s work on α-MSH, when researchers asked how much of the hormone’s activity a short tail could carry. Since then KPV has been studied mainly in cell culture and rodent systems, including work on the PepT1 peptide transporter.'),
    h4('KPV at a Glance'),
    kvTable([
      ['Product name', 'KPV'],
      ['Alternate names', 'Lys-Pro-Val; H-Lys-Pro-Val-OH; α-MSH (11-13); KPV tripeptide'],
      ['Sequence', 'Lys-Pro-Val (K-P-V)'],
      ['Length', '3 amino acids (tripeptide)'],
      ['Reference chemical form', 'Free acid, all L-amino acids (as indexed in PubChem)'],
      ['Molecular formula (free acid)', 'C16H30N4O4'],
      ['Average molecular weight (free acid)', '342.44 g/mol'],
      ['Monoisotopic mass (free acid)', '342.2267 Da'],
      ['CAS Registry Number (free acid)', '67727-97-3'],
      ['PubChem CID', '125672'],
      ['Parent peptide', 'C-terminal residues 11 to 13 of α-MSH'],
      ['Vial size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and identifiers are from the PubChem record and describe the free acid as a reference structure. That is not a statement about the form Veracue supplies. Salt or counterion form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What KPV Is Not'),
    ul([
      'Not the same molecule as α-MSH, which is a 13-residue hormone.',
      'Not the same as KdPT (Lys-D-Pro-Thr), GHK-Cu or BPC-157, which are different peptides.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the KPV sequence look like?'),
    p('KPV is short enough that every residue matters. Lysine contributes two basic amino groups. Proline adds a ring that restricts backbone flexibility, and valine closes the chain with a small hydrophobic side group. None of the three residues is aromatic, a detail that shapes how KPV behaves in HPLC analysis.'),
    p('Inside native α-MSH, this sequence sits at an amidated C-terminus. The standalone reference compound indexed in PubChem is the free acid. Because published studies do not always use the same form, check the terminal chemistry before comparing results.'),
    h5('Is KPV the same as α-MSH?'),
    p('No. α-MSH is a 13-residue hormone, and KPV is only its final three residues. KPV lacks the His-Phe-Arg-Trp core that melanocortin receptor binding depends on. Findings for the full hormone describe the full hormone, so keep parent and fragment separate.'),

    h4('KPV, α-MSH and KdPT Compared'),
    table(
      ['Attribute', 'KPV', 'α-MSH', 'KdPT'],
      [
        ['Sequence', 'Lys-Pro-Val', 'Ac-Ser-Tyr-Ser-Met-Glu-His-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2', 'Lys-D-Pro-Thr'],
        ['Length', '3 residues', '13 residues', '3 residues'],
        ['Average MW', '342.44 g/mol (free acid)', 'About 1664.9 g/mol', '344.41 g/mol'],
        ['Relationship', 'C-terminal residues 11 to 13 of α-MSH', 'Parent hormone, derived from POMC', 'KPV-related derivative; sequence matches IL-1β (193 to 195) with a D-proline'],
        ['Analytical note', 'Near-isobaric with GHK and KdPT; shares its formula with sequence isomers', 'Large enough that intact mass is highly specific', 'Differs from KPV by a Val to Thr swap and a D-residue'],
      ],
    ),
    p('The table describes identity only and does not rank the peptides.'),

    h4('Chemical Forms of KPV'),
    table(
      ['Form', 'Formula', 'Average MW (g/mol)', 'Monoisotopic mass (Da)', 'Expected [M+H]+ (m/z)'],
      [
        ['H-Lys-Pro-Val-OH (free acid)', 'C16H30N4O4', '342.44', '342.2267', '343.234'],
        ['H-Lys-Pro-Val-NH2 (C-terminal amide)', 'C16H31N5O3', '341.46', '341.2427', '342.250'],
        ['Ac-Lys-Pro-Val-NH2 (acetylated amide)', 'C18H33N5O4', '383.49', '383.2533', '384.261'],
        ['KPV acetate (salt)', 'Peptide plus acetate counterion(s)', 'Depends on counterion stoichiometry', 'Peptide ion as for the free base', 'As for the free base'],
      ],
    ),
    p('Values are calculated from molecular formulas using standard atomic weights. The free-acid values agree with the reference figures for CAS 67727-97-3.'),

    h4('Research Context'),
    h5('How does KPV enter cells?'),
    p('In published work, KPV was reported to be taken up through PepT1, a di- and tripeptide transporter, in human intestinal epithelial and T-cell lines. That link makes it a useful probe for peptide-transport questions in cell culture.'),
    h5('Does KPV act through melanocortin receptors?'),
    p('The evidence suggests not primarily. Some groups reported effects that were at least partly independent of the MC1R melanocortin receptor, and another proposed interference with IL-1β signaling instead. The transporter, receptor and IL-1β ideas come from different systems and have not been reconciled, so the mechanism remains open.'),
    h5('What do researchers study with KPV?'),
    p('Common areas are di- and tripeptide transport through PepT1, structure and function questions about which parts of α-MSH carry which activities, and delivery-system design using carriers such as nanoparticles and hydrogels. Analog work with stereoisomers and the related tripeptide KdPT adds structure-activity comparisons.'),
    h5('What can and cannot this page tell me?'),
    p('The KPV studies cited in the literature are cell-culture and animal experiments. Each shows that KPV changed a specific measured marker under specific conditions in a specific system. This page gives molecular reference information and general research context. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization of KPV'),
    p('Two methods do most of the work, and each answers a different question.'),
    p('Reversed-phase HPLC (RP-HPLC) separates the components of a sample. It reports purity as a percentage of total peak area at a stated detection wavelength. For KPV, detection relies on peptide-bond absorbance in the low-UV range, because the molecule has no aromatic side chains. HPLC shows how much of the detected material elutes as the main peak. By itself, it cannot prove that the main peak is KPV.'),
    p('Mass spectrometry (ESI-MS or LC-MS) measures molecular mass. A result matching the expected mass supports identity, provided the report says whether it shows the neutral mass or a protonated ion. For the free acid, [M+H]+ is expected near m/z 343.23. Mass alone cannot tell KPV apart from sequence isomers such as Lys-Val-Pro, or from D-residue variants, because they share its exact formula.'),
    p('Orthogonal checks close those gaps. Tandem MS (MS/MS) fragmentation supports residue order. Co-elution with a characterized reference standard supports retention identity, and chiral analysis addresses stereochemistry. Not every COA will include all of these. Knowing which questions a document leaves open is part of reading it well.'),
    table(
      ['Method', 'What it can establish', 'What it cannot establish on its own'],
      [
        ['RP-HPLC (UV)', 'Chromatographic purity as area %; impurity profile; batch-to-batch consistency', 'Molecular identity; counterion or water content; stereochemistry'],
        ['ESI-MS / LC-MS (intact mass)', 'Mass consistent with KPV in the stated form', 'Residue order (isomers share the mass); D- vs L-configuration; purity'],
        ['MS/MS fragmentation', 'Residue sequence from fragment ions', 'Quantitative purity; stereochemistry'],
        ['Chiral analysis', 'D/L configuration of residues', 'Sequence or overall purity'],
        ['Net peptide content (for example amino acid analysis)', 'Fraction of the weighed powder that is peptide', 'Identity of the peptide or its impurities'],
      ],
    ),

    h4('How to Read a KPV Certificate of Analysis'),
    p('A certificate of analysis describes one manufacturing lot. It is not a general statement about KPV and should not be carried over to a different lot. For a molecule this small, with this many look-alikes, the details on the certificate matter more than the headline purity figure.'),
    table(
      ['COA element', 'Why it matters for KPV'],
      [
        ['Exact product identity and sequence', 'Confirms the document covers Lys-Pro-Val, not a blend or an analog such as KdPT'],
        ['Chemical form and counterion', 'Free acid, amide, acetylated amide and salt forms differ in mass and composition'],
        ['Lot number matching the vial', 'Ties every result to the physical material in hand'],
        ['Testing laboratory and test date', 'Shows who performed the work and how current it is'],
        ['HPLC result with chromatogram', 'Lets a reader see peak shape, retention and impurities, not only a percentage'],
        ['Mass result, stating neutral or [M+H]+', 'Prevents a roughly 1 Da reporting ambiguity from hiding a form mismatch'],
        ['Stated tolerance and method', 'Shows how tightly the observed mass was compared with theory'],
        ['Traceability back to the report', 'Allows the document to be checked independently of the listing'],
      ],
    ),
    p('Every field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificates page explains how to request lot documentation, including through the contact page.', { links: CERT }),

    h4('Common KPV Verification Problems'),
    h5('Is the name enough to confirm identity?'),
    p('No. “KPV” appears on single-peptide listings, inside multi-peptide blend names, and as a frequent misspelling (“KVP”). Similar abbreviations such as KPT and KdPT describe different peptides. Confirm the full Lys-Pro-Val sequence on the lot’s documentation, check whether the material is a single compound or a blend, and confirm the chemical form.'),
    h5('Can mass spectrometry tell KPV from its isomers?'),
    p('Not from intact mass. Lys-Val-Pro and Pro-Val-Lys contain the same three residues and share the formula C16H30N4O4. MS/MS fragmentation reveals residue order, and co-elution with a characterized reference standard offers a second, independent line of support.'),
    h5('Why does stereochemistry matter?'),
    p('Swapping an L-residue for a D-residue does not change mass, and the KPV literature includes D-amino acid analogs. If configuration matters to your work, ask whether it was tested or simply assumed from the synthesis inputs. Chiral analysis addresses it directly. Standard RP-HPLC and MS may not.'),
    h5('Free acid, amide or acetylated: how do I tell?'),
    p('Match the form to the study you are comparing against. The monoisotopic masses separate them: 342.23 Da for the free acid, 341.24 Da for the amide and 383.25 Da for Ac-KPV-NH2. A COA should state the form explicitly rather than leave it to inference.'),
    h5('Why do salt form and net peptide content matter?'),
    p('Purified peptides are commonly isolated as salts, and KPV’s two amine groups can each carry a counterion. Weighed powder includes counterion and residual water as well as peptide. Look for a named counterion and, ideally, a net peptide content figure, or comparisons between lots rest on an unstated assumption.'),
    h5('Is a high HPLC purity proof that the vial is KPV?'),
    p('No. A sample can be chromatographically clean and still be the wrong molecule. HPLC describes how much of the detected material is the main component, and mass spectrometry describes whether that component has the expected mass. Ask for both, and for the chromatogram itself, including the detection wavelength and where the main peak elutes relative to the solvent front.'),
    h5('Which peptides sit close to KPV in mass?'),
    p('GHK (340.38 g/mol) and KdPT (344.41 g/mol) sit within a few daltons of KPV (342.44 g/mol), and some listings round KPV to about 340 Da. The amide’s protonated ion (m/z 342.25) also lands almost exactly on the free acid’s neutral mass (342.23). Compare observed and theoretical values using the same convention, and check whether the report gives neutral or [M+H]+ mass and average or monoisotopic values.'),
    h5('How should I keep a reproducible record?'),
    p('File the COA against the lot number on the vial. Note the chemical form, counterion, storage conditions on receipt and any in-house identity checks. That record lets a result be repeated, or explained when it is not.'),

    h4('Looking for KPV lot documentation?'),
    p('Lot details, including chemical form, purity method and testing laboratory, are reported on each lot’s documentation. Ask the Veracue team for the paperwork that matches your vial, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('KPV is supplied for laboratory research, scientific investigation and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is KPV peptide?',
    answer: 'KPV is a synthetic tripeptide, Lys-Pro-Val, identical to the last three residues of α-MSH. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the KPV peptide sequence?',
    answer: 'The sequence is lysine, proline, valine, written Lys-Pro-Val or K-P-V. The reference compound is H-Lys-Pro-Val-OH, with all three residues in the L-configuration.',
  },
  {
    question: 'What is the molecular weight of KPV?',
    answer: 'The free acid (C16H30N4O4) has an average molecular weight of 342.44 g/mol and a monoisotopic mass of 342.2267 Da. Other forms, such as the C-terminal amide or acetate salt, differ, so confirm the form first.',
  },
  {
    question: 'What is the CAS number for KPV?',
    answer: 'The free acid reference form has CAS number 67727-97-3 and PubChem CID 125672.',
  },
  {
    question: 'Is KPV the same as α-MSH?',
    answer: 'No. α-MSH is a 13-residue hormone, and KPV is only its final three residues. KPV lacks the His-Phe-Arg-Trp core linked to melanocortin receptor binding.',
  },
  {
    question: 'What is KPV studied for in research?',
    answer: 'Mainly PepT1-mediated peptide transport in cell lines, structure and function questions about α-MSH fragments, and delivery-system design. Findings apply only to the system in which they were measured.',
  },
  {
    question: 'Does KPV act through melanocortin receptors?',
    answer: 'The evidence suggests not primarily. One study reported effects at least partly independent of MC1R, another proposed interference with IL-1β signaling, and PepT1 uptake has also been reported. The mechanism remains unresolved.',
  },
  {
    question: 'How is KPV identity confirmed?',
    answer: 'Usually by mass spectrometry, supported where needed by MS/MS fragmentation for residue order, comparison with a reference standard, and chiral analysis for stereochemistry.',
  },
  {
    question: 'Can mass spectrometry alone confirm KPV?',
    answer: 'Not completely. Lys-Val-Pro, Pro-Val-Lys and D-residue variants have the same mass as KPV, so intact mass supports identity but does not prove sequence order or configuration.',
  },
  {
    question: 'What is the difference between KPV free base and KPV acetate?',
    answer: 'The free base is the peptide alone. The acetate is a salt in which acetate counterions accompany the peptide, so a given weight of powder contains less peptide. A COA should name the form.',
  },
  {
    question: 'What should a KPV Certificate of Analysis include?',
    answer: 'Sequence and chemical form, lot number, testing laboratory and date, an HPLC result with chromatogram, and a mass result with its reporting convention and tolerance. Lot documentation can be requested through the contact page.',
  },
  {
    question: 'Does Veracue provide usage instructions for KPV?',
    answer: 'No. KPV is offered for laboratory research use only, and Veracue does not provide dosing, administration, oral-use or formulation guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['immune-modulation'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'KPV',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
