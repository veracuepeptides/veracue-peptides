// Shared between BlogIndexClient.tsx (client component, renders the FAQ accordion) and
// page.tsx (server component, builds the FAQPage JSON-LD). Lives in its own plain module
// because Next's App Router doesn't reliably expose non-component named exports across
// the client/server boundary.
export const BLOG_FAQS = [
  {
    question: 'Is the content on this blog medical advice?',
    answer: "No. Everything here is written for laboratory research and educational purposes, and none of it should be used as medical, dosing, or treatment guidance for humans or animals.",
  },
  {
    question: 'How often is new content published?',
    answer: "New guides and research notes go up as our team completes them, tied to new products, new testing data, or questions we're seeing from researchers. There's no fixed schedule.",
  },
  {
    question: 'Can I request a topic for a future article?',
    answer: "Yes. Email support@veracuepeptides.com with what you'd like covered, and if it fits our research scope, we'll consider it for an upcoming article.",
  },
  {
    question: 'Are the reconstitution guides here specific to Veracue products?',
    answer: "The math and methods apply generally to lyophilized research peptides, but always cross-check vial size and concentration against the specific product page and COA for what you're actually reconstituting.",
  },
  {
    question: 'Who writes the articles on this blog?',
    answer: "Our research team writes from our own testing data and cited primary literature, not from secondhand or unverified sources.",
  },
  {
    question: 'Can I cite these articles in my own research documentation?',
    answer: "You're welcome to reference them, but for anything going into a formal citation or publication, go back to the primary literature we cite rather than citing our summary directly.",
  },
]
