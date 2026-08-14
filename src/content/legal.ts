/**
 * The Rosica legal documents.
 *
 * Transcribed verbatim from the Terms of Service and Privacy Policy supplied by
 * the business. The wording is the client's own and is legally operative — edit
 * it only when they send a revised document, and never paraphrase it to fit a
 * layout.
 *
 * The documents are published in English on both locale trees. They have not
 * been translated: an approximate Arabic rendering of a binding contract is
 * worse than an accurate English one, so the Arabic page frames the document in
 * Arabic and notes that the English text is the operative version. Drop a
 * professionally translated document in beside this one when there is one.
 */
import type { Localised } from "@/lib/i18n";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; lead: string; items: string[] };

export type LegalSection = {
  /** Anchor target, so the contents list can link into the document. */
  id: string;
  /** "Section 4" — absent on the documents that do not number their headings. */
  label?: string;
  heading: string;
  /** Opening paragraphs that carry no heading of their own in the source. */
  untitled?: boolean;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  /** Shown above the closing address block. */
  contact: {
    label?: string;
    heading: string;
    lead: string;
  };
  updated?: string;
  sections: LegalSection[];
};

/** The registered entity, as it appears at the foot of both documents. */
export const LEGAL_ENTITY = {
  name: "Rosica Natural Care L.L.C-FZ",
  tradingAs: "Trading as Rosica",
  email: "info@rosica.ae",
  address: [
    "Meydan Grandstand, 6th Floor",
    "Meydan Road, Nad Al Sheba",
    "Dubai, United Arab Emirates",
  ],
  license: "License Number: 2649888.01",
} as const;


export const termsDocument: LegalDocument = {
  metaTitle: "Terms of Service",
  metaDescription:
    "The terms and conditions that apply when you access or use the Rosica website, online store and services.",
  title: "Terms of Service",
  contact: {
    label: "Section 25",
    heading: "Contact Information",
    lead: "Questions about these Terms of Service may be sent to:",
  },
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        { kind: "p", text: "Welcome to Rosica. The terms “we”, “us” and “our” refer to Rosica Natural Care L.L.C-FZ, trading as Rosica." },
        { kind: "p", text: "Rosica operates this website and its online store, including all related information, content, features, tools, products and services, collectively referred to as the “Services”. Our online store is powered by Shopify, which provides the ecommerce platform through which we offer products for purchase." },
        { kind: "p", text: "These terms and conditions, together with any policies referenced in them, collectively referred to as the “Terms of Service” or “Terms”, describe your rights and responsibilities when you access or use the Services." },
        { kind: "p", text: "Please read these Terms of Service carefully. They contain important information regarding your legal rights and obligations, including warranty disclaimers and limitations of liability." },
        { kind: "p", text: "By visiting, interacting with or using the Services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms of Service or our Privacy Policy, you should not access or use the Services." },
      ],
    },
    {
      id: "section-1",
      label: "Section 1",
      heading: "Access and Account",
      blocks: [
        { kind: "p", text: "By agreeing to these Terms of Service, you represent that you are at least 18 years old or have reached the age of legal majority in your country of residence." },
        { kind: "p", text: "Where permitted by applicable law, you consent to any minor dependents using the Services through devices that you own, purchase or manage." },
        { kind: "p", text: "To access or use certain parts of the Services, including browsing our online store or purchasing products, you may be asked to provide information such as your name, email address, telephone number, billing information, payment details and delivery address." },
        { kind: "p", text: "You represent and warrant that all information you provide is accurate, current and complete, and that you have all rights and authorizations necessary to provide that information." },
        { kind: "p", text: "You are responsible for maintaining the confidentiality and security of your account credentials and for all activities conducted through your account. You must not transfer, sell, assign or license your account to another person." },
        { kind: "p", text: "We reserve the right to suspend, restrict or terminate access to an account if we reasonably believe that it has been used unlawfully, fraudulently or in violation of these Terms." },
      ],
    },
    {
      id: "section-2",
      label: "Section 2",
      heading: "Our Products",
      blocks: [
        { kind: "p", text: "We make reasonable efforts to describe and display our products accurately. However, colors, finishes, packaging and product appearance may vary slightly from the way they appear on your screen because of differences in devices, displays, settings, lighting and photography." },
        { kind: "p", text: "We do not guarantee that your device’s display of any color or product image will be completely accurate." },
        { kind: "p", text: "Product packaging, labels, ingredients, descriptions, specifications and availability may be updated or changed when reasonably necessary, including to reflect regulatory, manufacturing or design requirements." },
        { kind: "p", text: "All product descriptions are subject to change without notice. We reserve the right to discontinue a product or limit the quantities available to any person, geographic region or jurisdiction, subject to applicable law." },
        { kind: "p", text: "Cosmetic products may affect individuals differently. Product descriptions and information made available through the Services are provided for general informational purposes and are not intended to constitute medical advice, diagnosis or treatment." },
        { kind: "p", text: "You should review the product label and directions before use. Where appropriate, conduct a patch test and discontinue use if irritation or an adverse reaction occurs. Seek advice from a qualified healthcare professional if you have a medical condition, allergy or concern regarding the suitability of a product." },
      ],
    },
    {
      id: "section-3",
      label: "Section 3",
      heading: "Orders",
      blocks: [
        { kind: "p", text: "When you submit an order, you are making an offer to purchase the products included in that order." },
        { kind: "p", text: "Your receipt of an automated order acknowledgement does not necessarily mean that your order has been accepted. An order is accepted when we confirm acceptance or dispatch the products, subject to successful payment processing and product availability." },
        {
          kind: "list",
          lead: "We reserve the right to accept, reject, limit or cancel an order for legitimate reasons, including:",
          items: [
            "Product unavailability;",
            "Incorrect product or pricing information;",
            "Suspected fraud or unauthorized activity;",
            "Payment failure;",
            "Delivery restrictions;",
            "Suspected commercial resale;",
            "Breach of these Terms; or",
            "Requirements imposed by applicable law.",
          ],
        },
        { kind: "p", text: "If we reject or cancel an order after payment has been received, we will refund the relevant amount using the original payment method, subject to payment-provider processing times." },
        { kind: "p", text: "Please review your order carefully before submission. We may not be able to accommodate changes or cancellation requests after an order has been accepted or prepared for dispatch." },
        { kind: "p", text: "If we need to contact you regarding an order, we may use the email address, billing address, delivery address or telephone number supplied during checkout." },
        { kind: "p", text: "Returns, refunds and exchanges are governed by our Return and Refund Policy." },
        { kind: "p", text: "You represent that purchases made through the Services are intended for your personal or household use and not for unauthorized commercial resale or export." },
      ],
    },
    {
      id: "section-4",
      label: "Section 4",
      heading: "Prices, Payment and Billing",
      blocks: [
        { kind: "p", text: "All prices are displayed in United Arab Emirates dirhams, abbreviated as AED, unless otherwise stated." },
        { kind: "p", text: "Any applicable taxes, delivery charges or other fees will be displayed before you complete your order." },
        { kind: "p", text: "Prices, discounts, promotional offers and product availability may change without notice. The price charged will be the price displayed at checkout when the order is submitted, except where an obvious pricing or technical error has occurred." },
        { kind: "p", text: "Promotions may be subject to separate terms and conditions. If there is a conflict between promotional terms and these Terms, the promotional terms will apply to that promotion." },
        { kind: "p", text: "You agree to provide accurate, current and complete purchase, billing and payment information." },
        { kind: "p", text: "You agree to promptly update your account and contact information when necessary so that we can process your transactions and communicate with you." },
        {
          kind: "list",
          lead: "You represent and warrant that:",
          items: [
            "The payment information you provide is accurate and complete;",
            "You are authorized to use the selected payment method;",
            "Charges incurred through the payment method will be honored; and",
            "You will pay all amounts shown at checkout, including applicable delivery charges and taxes.",
          ],
        },
        { kind: "p", text: "Payments may be processed by third-party payment providers. We do not directly store complete payment-card information when payment processing is handled by such providers." },
      ],
    },
    {
      id: "section-5",
      label: "Section 5",
      heading: "Shipping and Delivery",
      blocks: [
        { kind: "p", text: "We currently offer delivery within the United Arab Emirates to locations made available during checkout." },
        { kind: "p", text: "Delivery timeframes displayed through the Services are estimates and may be affected by circumstances outside our reasonable control." },
        { kind: "p", text: "We will make reasonable efforts to deliver orders within the stated timeframe. However, delivery dates are not guaranteed unless expressly confirmed otherwise." },
        {
          kind: "list",
          lead: "We are not responsible for delays caused by:",
          items: [
            "Incorrect or incomplete delivery information supplied by the customer;",
            "Failed delivery attempts;",
            "The recipient being unavailable;",
            "Carrier disruptions;",
            "Severe weather;",
            "Road closures;",
            "Government restrictions;",
            "Public holidays;",
            "Force majeure events; or",
            "Other circumstances outside our reasonable control.",
          ],
        },
        { kind: "p", text: "You are responsible for ensuring that the delivery address and contact details supplied at checkout are complete and accurate." },
        { kind: "p", text: "Risk of loss or damage passes to you when the order is delivered to the delivery address supplied during checkout or otherwise received by you or a person authorized by you." },
        { kind: "p", text: "Please inspect your order promptly following delivery and contact us within the period specified in our Return and Refund Policy if it arrives damaged, defective, incomplete or incorrect." },
        { kind: "p", text: "Further delivery information is available in our Shipping Policy." },
      ],
    },
    {
      id: "section-6",
      label: "Section 6",
      heading: "Intellectual Property",
      blocks: [
        { kind: "p", text: "The Services and their content, including trademarks, trade names, logos, slogans, text, product descriptions, photographs, illustrations, graphics, videos, audio, page layouts, software and design elements, are owned by or licensed to Rosica, Shopify or their respective rights holders." },
        { kind: "p", text: "These materials are protected by applicable UAE and international trademark, copyright and other intellectual-property laws." },
        { kind: "p", text: "You may access and use the Services only for lawful, personal and non-commercial purposes." },
        {
          kind: "list",
          lead: "Unless we have provided prior written permission, you must not:",
          items: [
            "Copy, reproduce or republish material from the Services;",
            "Modify or create derivative works;",
            "Distribute, sell, license or commercially exploit content;",
            "Publicly display or perform content;",
            "Download or systematically store content;",
            "Remove copyright, trademark or ownership notices; or",
            "Use Rosica’s branding in a manner that may cause confusion or imply endorsement.",
          ],
        },
        { kind: "p", text: "Nothing in these Terms grants you any license or ownership rights in Rosica’s or any third party’s intellectual property, except for the limited right to access and use the Services in accordance with these Terms." },
        { kind: "p", text: "The Rosica name, logo, product names, designs and slogan are trademarks or other protected brand assets of Rosica or its licensors. They must not be used without prior written permission." },
        { kind: "p", text: "Shopify’s names, logos, product names and service marks are owned by Shopify or its affiliates." },
        { kind: "p", text: "All rights not expressly granted are reserved." },
      ],
    },
    {
      id: "section-7",
      label: "Section 7",
      heading: "Optional and Third-Party Tools",
      blocks: [
        { kind: "p", text: "The Services may provide access to tools, applications, payment services, analytics, social-media features or other functionality operated by third parties." },
        { kind: "p", text: "We may not monitor or control such tools and provide access to them on an “as is” and “as available” basis, subject to applicable law." },
        { kind: "p", text: "Your use of third-party tools may be governed by separate terms, conditions and privacy policies issued by those third parties." },
        { kind: "p", text: "You are responsible for reviewing and accepting those terms before using the relevant tool." },
        { kind: "p", text: "To the extent permitted by applicable law, Rosica is not responsible for losses arising solely from third-party tools that it does not own, operate or control." },
        { kind: "p", text: "We may add new tools, resources or functionality to the Services. Unless separate terms are provided, such additions will form part of the Services and will be governed by these Terms." },
      ],
    },
    {
      id: "section-8",
      label: "Section 8",
      heading: "Third-Party Links",
      blocks: [
        { kind: "p", text: "The Services may contain links to websites, content or services operated by third parties." },
        { kind: "p", text: "We are not responsible for reviewing, verifying or guaranteeing the accuracy, availability, security or practices of third-party websites." },
        { kind: "p", text: "Following a third-party link is at your discretion. You should review the third party’s terms, privacy policy and other applicable policies before using its services or completing a transaction." },
        { kind: "p", text: "To the extent permitted by applicable law, we are not responsible for loss or damage arising from your use of a third-party website, product or service that we do not own, operate or control." },
        { kind: "p", text: "Questions or complaints about third-party products or services should be directed to the relevant third party." },
      ],
    },
    {
      id: "section-9",
      label: "Section 9",
      heading: "Relationship with Shopify",
      blocks: [
        { kind: "p", text: "Rosica's online store is powered by Shopify, which provides the ecommerce platform that enables us to offer our products for purchase online." },
        { kind: "p", text: "However, purchases made from this store are transactions directly between you and Rosica." },
        { kind: "p", text: "Shopify is not the seller of Rosica products and is not responsible for fulfilling orders, providing Rosica products, managing returns or resolving product-related concerns." },
        { kind: "p", text: "To the fullest extent permitted by applicable law, Shopify and its affiliates are not liable for injury, damage or loss arising solely from products purchased directly from Rosica." },
        { kind: "p", text: "Nothing in this section excludes any right or remedy that cannot legally be excluded under applicable law." },
      ],
    },
    {
      id: "section-10",
      label: "Section 10",
      heading: "Privacy",
      blocks: [
        { kind: "p", text: "Personal information collected through the Services is processed in accordance with our Privacy Policy." },
        { kind: "p", text: "Certain personal information may also be processed by Shopify in accordance with Shopify’s Privacy Policy." },
        { kind: "p", text: "Because the Services are hosted by Shopify, Shopify may collect and process information concerning your access to and use of the Services to provide, secure and improve its platform." },
        { kind: "p", text: "Information provided through the Services may be transmitted to and processed by Shopify, payment processors, delivery providers, technology providers and other service providers that assist us in operating the store." },
        { kind: "p", text: "Some service providers may process information in jurisdictions outside the country in which you reside, subject to appropriate legal and contractual safeguards where required." },
        { kind: "p", text: "Please review our Privacy Policy for further information about how personal information is collected, used, disclosed, stored and protected." },
      ],
    },
    {
      id: "section-11",
      label: "Section 11",
      heading: "Feedback, Reviews and Submissions",
      blocks: [
        { kind: "p", text: "If you submit, upload, post, email or otherwise provide ideas, suggestions, reviews, photographs, feedback, proposals or other content, collectively referred to as “Feedback”, you grant Rosica a non-exclusive, worldwide, royalty-free, transferable and sublicensable licence to use, reproduce, adapt, publish, translate, distribute and display that Feedback for purposes connected with operating, improving and promoting the Services." },
        { kind: "p", text: "This license does not transfer ownership of your Feedback to Rosica." },
        {
          kind: "list",
          lead: "You represent and warrant that:",
          items: [
            "You own the Feedback or have all necessary rights to submit it;",
            "The Feedback is accurate and not misleading;",
            "You have disclosed any compensation or incentive received in connection with it;",
            "The Feedback does not infringe another person’s rights; and",
            "The Feedback complies with applicable law and these Terms.",
          ],
        },
        { kind: "p", text: "We may, but are not obligated to, monitor, edit or remove Feedback that we reasonably consider unlawful, misleading, defamatory, abusive, obscene, infringing, fraudulent or otherwise inappropriate." },
        {
          kind: "list",
          lead: "You must not:",
          items: [
            "Submit a false review;",
            "Use a false identity or email address;",
            "Impersonate another person;",
            "Submit malicious code;",
            "Infringe intellectual-property, privacy or other rights; or",
            "Misrepresent the source or nature of Feedback.",
          ],
        },
        { kind: "p", text: "You remain responsible for Feedback you submit." },
      ],
    },
    {
      id: "section-12",
      label: "Section 12",
      heading: "Errors, Inaccuracies and Omissions",
      blocks: [
        { kind: "p", text: "Information made available through the Services may occasionally contain typographical errors, inaccuracies or omissions relating to product descriptions, pricing, promotions, delivery charges, availability or delivery estimates." },
        { kind: "p", text: "We reserve the right to correct errors, update information or cancel an affected order where information is materially inaccurate." },
        { kind: "p", text: "Where an order is cancelled because of an error after payment has been received, we will refund the relevant amount through the original payment method." },
        { kind: "p", text: "Nothing in this section limits any mandatory consumer rights available under applicable law." },
      ],
    },
    {
      id: "section-13",
      label: "Section 13",
      heading: "Prohibited Uses",
      blocks: [
        { kind: "p", text: "You may use the Services only for lawful purposes." },
        {
          kind: "list",
          lead: "You must not access or use the Services directly or indirectly:",
          items: [
            "For an unlawful, fraudulent or malicious purpose;",
            "In violation of any applicable law or regulation;",
            "To infringe Rosica’s or another person’s intellectual-property rights;",
            "To harass, abuse, threaten, defame, discriminate against or harm another person;",
            "To submit false, deceptive or misleading information;",
            "To upload or transmit viruses, malware or other harmful code;",
            "To send spam, phishing messages or unauthorized promotional material;",
            "To impersonate another person or entity;",
            "To interfere with the security, operation or integrity of the Services;",
            "To bypass access restrictions or security measures;",
            "To collect or track another person’s personal information unlawfully;",
            "To scrape, extract, copy or systematically collect content or data without authorization;",
            "To reproduce, duplicate, sell, resell or exploit any part of the Services without permission;",
            "To use the Services for unauthorized commercial resale; or",
            "To engage in conduct that restricts another person’s lawful use or enjoyment of the Services.",
          ],
        },
        { kind: "p", text: "We reserve the right to restrict, suspend or terminate access where we reasonably believe these Terms have been violated." },
      ],
    },
    {
      id: "section-14",
      label: "Section 14",
      heading: "Automated Agents",
      blocks: [
        { kind: "p", text: "This section applies where software, automated systems or services access or interact with the Services autonomously or semi-autonomously. Such systems are referred to as “Agents”." },
        {
          kind: "list",
          lead: "An Agent must not access or interact with the Services in a manner that:",
          items: [
            "Conceals its automated nature;",
            "Circumvents security restrictions;",
            "Bypasses CAPTCHA or similar measures;",
            "Misrepresents itself as a human;",
            "Scrapes or extracts data without authorisation;",
            "Causes excessive technical load;",
            "Disrupts operation of the Services; or",
            "Violates applicable law or these Terms.",
          ],
        },
        { kind: "p", text: "Where technically applicable, an Agent must identify itself accurately in its user-agent information and comply with any instructions, restrictions or access controls that apply to automated access." },
        { kind: "p", text: "We may limit or prevent automated access at our discretion where necessary to protect the Services, customers or Rosica." },
      ],
    },
    {
      id: "section-15",
      label: "Section 15",
      heading: "Termination",
      blocks: [
        { kind: "p", text: "These Terms remain effective unless terminated by you or Rosica." },
        { kind: "p", text: "You may stop using the Services at any time." },
        {
          kind: "list",
          lead: "We may suspend or terminate your access where reasonably necessary, including where:",
          items: [
            "You breach these Terms;",
            "Fraudulent or unlawful conduct is suspected;",
            "Required by law or a competent authority;",
            "Necessary to protect customers, Rosica, Shopify or third parties; or",
            "The Services or relevant features are discontinued.",
          ],
        },
        { kind: "p", text: "Termination does not affect obligations or liabilities that arose before termination." },
        { kind: "p", text: "Provisions concerning intellectual property, privacy, feedback, limitation of liability, indemnification, governing law and other provisions intended by their nature to survive will continue after termination." },
      ],
    },
    {
      id: "section-16",
      label: "Section 16",
      heading: "Disclaimer of Warranties",
      blocks: [
        { kind: "p", text: "Information available through the Services is provided for general informational purposes." },
        { kind: "p", text: "We make reasonable efforts to keep information accurate and current, but do not guarantee that all content will be complete, error-free or continuously available." },
        { kind: "p", text: "Except for warranties, guarantees or rights that cannot be excluded under applicable law, the Services are provided on an “as is” and “as available” basis." },
        { kind: "p", text: "To the fullest extent permitted by applicable law, we disclaim implied warranties of merchantability, satisfactory quality, fitness for a particular purpose, durability, title and non-infringement." },
        { kind: "p", text: "We do not guarantee that access to the Services will always be uninterrupted, timely, secure or error-free." },
        { kind: "p", text: "Nothing in these Terms excludes or limits any statutory warranty, consumer right or remedy that cannot lawfully be excluded or limited." },
      ],
    },
    {
      id: "section-17",
      label: "Section 17",
      heading: "Limitation of Liability",
      blocks: [
        { kind: "p", text: "Nothing in these Terms excludes or limits liability where exclusion or limitation is prohibited by applicable law." },
        { kind: "p", text: "Subject to that qualification, Rosica will not be liable for indirect, incidental, special, punitive or consequential losses arising from use of the Services or products purchased through them, including loss of profits, revenue, savings, opportunity, goodwill or data, where such loss was not reasonably foreseeable." },
        { kind: "p", text: "To the fullest extent permitted by applicable law, Rosica’s total liability arising from a particular order will not exceed the amount paid by you for the product or order giving rise to the claim." },
        {
          kind: "list",
          lead: "This limitation does not apply to liability for:",
          items: [
            "Fraud or fraudulent misrepresentation;",
            "Death or personal injury caused by negligence where liability cannot be excluded;",
            "Wilful misconduct;",
            "Breach of mandatory consumer rights; or",
            "Any other liability that cannot lawfully be excluded or limited.",
          ],
        },
      ],
    },
    {
      id: "section-18",
      label: "Section 18",
      heading: "Indemnification",
      blocks: [
        {
          kind: "list",
          lead: "To the extent permitted by applicable law, you agree to indemnify and hold harmless Rosica, its affiliates, officers, directors, employees, agents, contractors, licensors and service providers from third-party claims, liabilities, losses and reasonable legal costs arising directly from:",
          items: [
            "Your material breach of these Terms;",
            "Your unlawful use of the Services;",
            "Your infringement of another person’s rights; or",
            "Content or Feedback submitted by you in violation of these Terms.",
          ],
        },
        { kind: "p", text: "We will notify you of a relevant claim where reasonably practicable." },
        { kind: "p", text: "We may assume control of the defense and settlement of a claim, provided that we will not agree to a settlement imposing a non-monetary obligation on you without your reasonable consent." },
      ],
    },
    {
      id: "section-19",
      label: "Section 19",
      heading: "Severability",
      blocks: [
        { kind: "p", text: "If any provision of these Terms is determined to be unlawful, invalid or unenforceable, that provision will be enforced to the maximum extent permitted by law." },
        { kind: "p", text: "The unenforceable portion will be treated as severed, and the validity and enforceability of the remaining provisions will not be affected." },
      ],
    },
    {
      id: "section-20",
      label: "Section 20",
      heading: "Waiver and Entire Agreement",
      blocks: [
        { kind: "p", text: "A failure or delay by Rosica to exercise or enforce a right under these Terms does not constitute a waiver of that right." },
        { kind: "p", text: "These Terms, together with the policies and notices incorporated by reference, constitute the entire agreement between you and Rosica concerning use of the Services." },
        { kind: "p", text: "They supersede prior communications and agreements relating to the same subject matter, except where otherwise required by applicable law." },
      ],
    },
    {
      id: "section-21",
      label: "Section 21",
      heading: "Assignment",
      blocks: [
        { kind: "p", text: "You must not assign, transfer or delegate your rights or obligations under these Terms without our prior written consent." },
        { kind: "p", text: "We may assign or transfer our rights and obligations where reasonably necessary in connection with a corporate reorganisation, merger, acquisition, sale of assets or transfer of the business, provided that doing so does not unlawfully reduce your rights." },
      ],
    },
    {
      id: "section-22",
      label: "Section 22",
      heading: "Governing Law and Jurisdiction",
      blocks: [
        { kind: "p", text: "These Terms of Service and any separate agreements through which we provide the Services are governed by and construed in accordance with the laws of the United Arab Emirates and the applicable laws of the Emirate of Dubai." },
        { kind: "p", text: "Subject to any mandatory consumer-protection rights or dispute-resolution procedures available under applicable law, the courts of Dubai shall have jurisdiction over disputes arising from or relating to these Terms or the Services." },
        { kind: "p", text: "Nothing in this section limits a consumer’s right to submit a complaint to a competent consumer-protection authority or exercise another mandatory remedy available under applicable law." },
      ],
    },
    {
      id: "section-23",
      label: "Section 23",
      heading: "Headings",
      blocks: [
        { kind: "p", text: "Headings are included for convenience only and do not limit or affect the interpretation of these Terms." },
      ],
    },
    {
      id: "section-24",
      label: "Section 24",
      heading: "Changes to These Terms",
      blocks: [
        { kind: "p", text: "You may review the current version of these Terms at any time on this page." },
        {
          kind: "list",
          lead: "We may update or replace these Terms to reflect changes in:",
          items: [
            "Applicable law;",
            "Our business or products;",
            "The Services;",
            "Payment or delivery arrangements;",
            "Security requirements; or",
            "Shopify platform functionality.",
          ],
        },
        { kind: "p", text: "Where required by applicable law, we will provide notice of material changes." },
        { kind: "p", text: "Updated Terms become effective on the date stated in the notice or, where no date is stated, when published." },
        { kind: "p", text: "Your continued use of the Services after an update constitutes acceptance of the revised Terms, except where further consent is required by applicable law." },
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Rosica collects, uses, discloses and protects the personal information you share with us.",
  title: "Privacy Policy",
  updated: "Last updated: August 13, 2026",
  contact: {
    heading: "Contact Us",
    lead:
      "If you have questions about this Privacy Policy or Rosica's privacy practices, or if you would like to exercise a privacy right available to you, please contact us:",
  },
  sections: [
    {
      id: "introduction",
      heading: "Introduction",
      untitled: true,
      blocks: [
        { kind: "p", text: "Rosica Natural Care L.L.C-FZ, trading as Rosica (“Rosica”, “we”, “us” or “our”), operates this website and its online store, including related information, content, features, tools, products and services (collectively, the “Services”). Our online store is powered by Shopify, which provides the ecommerce platform through which we offer our products for purchase." },
        { kind: "p", text: "This Privacy Policy describes how we collect, use, process and disclose your personal information when you visit or use our website, make a purchase or other transaction through our online store, or otherwise communicate with us." },
        { kind: "p", text: "We process personal information in accordance with applicable data protection and privacy laws, including applicable laws of the United Arab Emirates." },
        { kind: "p", text: "If there is a conflict between our Terms of Service and this Privacy Policy concerning the collection, processing or disclosure of personal information, this Privacy Policy will apply." },
        { kind: "p", text: "Please read this Privacy Policy carefully. By accessing or using the Services, you acknowledge that you have read and understood how we collect, use and disclose personal information as described in this Privacy Policy." },
      ],
    },
    {
      id: "personal-information-we-collect-or-process",
      heading: "Personal Information We Collect or Process",
      blocks: [
        { kind: "p", text: "When we use the term “personal information”, we mean information that identifies you or can reasonably be linked to you. Personal information does not include information that has been collected anonymously or de-identified so that it cannot reasonably identify or be linked to you." },
        {
          kind: "list",
          lead: "Depending on how you interact with the Services and as permitted or required by applicable law, we may collect or process the following categories of personal information:",
          items: [
            "Contact details, including your name, billing address, shipping address, telephone number and email address.",
            "Financial and payment information, including payment method, transaction details, payment confirmation and other information necessary to process your payment. Complete payment-card information may be collected and processed directly by Shopify and/or our third-party payment providers rather than stored by Rosica.",
            "Account information, where applicable, including your account details, preferences and settings.",
            "Transaction information, including products you view, place in your cart, purchase, return, exchange or cancel, as well as information relating to your previous transactions.",
            "Communications with us, including information you provide when contacting us, submitting an inquiry or requesting customer support.",
            "Device information, including information about your device, browser, network connection, IP address and other technical identifiers.",
            "Usage information, including information about how and when you access, interact with or navigate the Services.",
          ],
        },
      ],
    },
    {
      id: "personal-information-sources",
      heading: "Personal Information Sources",
      blocks: [
        {
          kind: "list",
          lead: "We may collect personal information from the following sources:",
          items: [
            "Directly from you, including when you create an account, place an order, use the Services, contact us or otherwise provide personal information to us.",
            "Automatically through the Services, including information collected from your device when you visit our website or online store and through cookies and similar technologies.",
            "From our service providers, including providers that supply technology, payment processing, ecommerce, analytics, fulfillment, shipping or other services on our behalf.",
            "From our business partners or other third parties, where permitted by applicable law.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-personal-information",
      heading: "How We Use Your Personal Information",
      blocks: [
        {
          kind: "list",
          lead: "Depending on how you interact with us and the Services, we may use your personal information for the following purposes:",
          items: [
          ],
        },
        { kind: "subheading", text: "Providing and Improving the Services" },
        { kind: "p", text: "We may use personal information to provide and operate the Services, process payments, fulfill orders, arrange shipping and delivery, facilitate returns and exchanges, manage customer accounts where applicable, remember preferences, provide customer support and improve your shopping experience." },
        { kind: "p", text: "We may also use information to understand how customers interact with our website and online store and to improve our products, Services and customer experience." },
        { kind: "subheading", text: "Marketing and Advertising" },
        { kind: "p", text: "Where permitted by applicable law and, where required, with your consent, we may use personal information to send marketing and promotional communications, including by email, and to provide or measure advertising relating to Rosica and our products." },
        { kind: "p", text: "You may opt out of marketing communications at any time by using the unsubscribe option provided in our communications or by contacting us." },
        { kind: "subheading", text: "Security and Fraud Prevention" },
        { kind: "p", text: "We may use personal information to authenticate accounts where applicable, provide a secure shopping and payment experience, detect and investigate suspected fraudulent, illegal, unsafe or malicious activity, protect our customers and business, and maintain the security and integrity of the Services." },
        { kind: "p", text: "If you create an account, you are responsible for maintaining the confidentiality of your account credentials and should not share your password or access information with others." },
        { kind: "subheading", text: "Communicating With You" },
        { kind: "p", text: "We may use personal information to respond to inquiries, provide customer support, communicate with you about orders, payments, deliveries, returns or other transactions, and maintain our business relationship with you." },
        { kind: "subheading", text: "Legal and Regulatory Purposes" },
        { kind: "p", text: "We may use personal information where reasonably necessary to comply with applicable laws and regulations, respond to lawful requests from government authorities or law enforcement agencies, establish or defend legal claims, enforce our terms and policies, or investigate suspected violations." },
      ],
    },
    {
      id: "how-we-disclose-personal-information",
      heading: "How We Disclose Personal Information",
      blocks: [
        { kind: "p", text: "In certain circumstances, we may disclose personal information to third parties where reasonably necessary for legitimate business purposes and subject to applicable law." },
        {
          kind: "list",
          lead: "This may include:",
          items: [
            "Shopify and service providers that assist us with ecommerce services, website technology, IT management, payment processing, data analytics, customer support, cloud storage, order fulfillment, shipping and delivery.",
            "Payment providers and financial institutions where necessary to process transactions, refunds or payment-related matters.",
            "Delivery and logistics providers where necessary to deliver products and manage shipments.",
            "Business and marketing partners, where applicable, to provide marketing, analytics or advertising services in accordance with applicable law and your choices.",
            "Third parties at your direction or with your consent, including where information must be shared to fulfill an order or provide a service you have requested.",
            "Our affiliates or companies within our corporate group, if applicable.",
            "Government authorities, regulators, courts or other parties where disclosure is required by applicable law or reasonably necessary to protect our rights, customers, Services or other persons.",
            "Parties involved in a business transaction, such as a merger, acquisition, restructuring, financing or sale of all or part of our business, subject to applicable legal requirements.",
          ],
        },
        { kind: "p", text: "Third-party service providers may process personal information in accordance with their own applicable privacy notices and contractual obligations." },
      ],
    },
    {
      id: "relationship-with-shopify",
      heading: "Relationship With Shopify",
      blocks: [
        { kind: "p", text: "Rosica's online store is powered by Shopify, which provides the ecommerce platform that enables us to offer our products for purchase online." },
        { kind: "p", text: "Shopify collects and processes certain personal information concerning your access to and use of our online store in order to provide, secure and improve its platform and services." },
        { kind: "p", text: "Information submitted through our online store may be transmitted to and processed by Shopify and service providers used to operate the ecommerce platform. These providers may be located in countries other than the country in which you reside." },
        { kind: "p", text: "Shopify may also process certain information obtained through your interactions with our online store in connection with features and services provided by Shopify. Where Shopify independently determines how such information is processed, Shopify is responsible for that processing in accordance with its applicable privacy policies." },
        { kind: "p", text: "You may review Shopify's Consumer Privacy Policy and privacy information through Shopify's official privacy resources." },
      ],
    },
    {
      id: "cookies-and-similar-technologies",
      heading: "Cookies and Similar Technologies",
      blocks: [
        { kind: "p", text: "Our website and online store may use cookies and similar technologies to operate and secure the Services, remember preferences, understand how visitors interact with the Services, improve functionality and performance, and, where applicable, support analytics, marketing and advertising." },
        { kind: "p", text: "Some cookies may be placed by third-party service providers, including Shopify and analytics or technology providers." },
        { kind: "p", text: "Where required by applicable law, we will obtain appropriate consent before using non-essential cookies or similar technologies." },
        { kind: "p", text: "You may be able to manage cookies through your browser settings and, where available, through cookie or privacy controls provided on our website or online store. Disabling certain cookies may affect the functionality or performance of some parts of the Services." },
      ],
    },
    {
      id: "third-party-websites-and-links",
      heading: "Third-Party Websites and Links",
      blocks: [
        { kind: "p", text: "The Services may contain links to websites, social-media platforms or other online services operated by third parties." },
        { kind: "p", text: "If you follow a link to a website or platform that is not operated or controlled by Rosica, you should review that third party's privacy policy, security practices and applicable terms." },
        { kind: "p", text: "Rosica is not responsible for the privacy, security, accuracy or practices of third-party websites or services that we do not own or control." },
        { kind: "p", text: "Information you voluntarily make publicly available through third-party platforms, including social-media platforms, may be visible to other users and may be processed according to the policies of those platforms." },
        { kind: "p", text: "The inclusion of a third-party link does not necessarily constitute an endorsement by Rosica of that third party or its services." },
      ],
    },
    {
      id: "children-s-data",
      heading: "Children's Data",
      blocks: [
        { kind: "p", text: "The Services are not intended for children, and we do not knowingly collect personal information from children contrary to applicable law." },
        { kind: "p", text: "If you are a parent or guardian and believe that a child has provided personal information to us, please contact us at info@rosica.ae so that we can take appropriate action." },
      ],
    },
    {
      id: "security-of-your-information",
      heading: "Security of Your Information",
      blocks: [
        { kind: "p", text: "We take reasonable administrative, technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, alteration or disclosure." },
        { kind: "p", text: "However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security." },
        { kind: "p", text: "We recommend that you do not send highly sensitive or confidential information through unsecured communication channels." },
      ],
    },
    {
      id: "retention-of-your-information",
      heading: "Retention of Your Information",
      blocks: [
        { kind: "p", text: "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including to provide the Services, fulfill orders, maintain appropriate business and transaction records, comply with legal and regulatory obligations, resolve disputes and enforce our agreements and policies." },
        { kind: "p", text: "The applicable retention period may vary depending on the type of information, the purpose for which it was collected and applicable legal requirements." },
        { kind: "p", text: "When personal information is no longer reasonably required, we may delete, anonymize or otherwise securely dispose of it in accordance with applicable law." },
      ],
    },
    {
      id: "your-rights-and-choices",
      heading: "Your Rights and Choices",
      blocks: [
        { kind: "p", text: "Depending on applicable law and your circumstances, you may have certain rights relating to your personal information." },
        {
          kind: "list",
          lead: "These may include:",
          items: [
            "Right to Access — You may have the right to request information about personal information we hold about you and obtain access to that information.",
            "Right to Correction — You may have the right to request correction of inaccurate or incomplete personal information.",
            "Right to Deletion — You may have the right to request deletion of certain personal information, subject to applicable legal requirements and exceptions.",
            "Right to Portability — Where applicable, you may have the right to receive certain personal information in an appropriate format or request its transfer to another party.",
            "Right to Withdraw Consent — Where processing is based on your consent, you may have the right to withdraw that consent, subject to applicable law.",
            "Marketing Preferences — You may opt out of promotional emails at any time by using the unsubscribe option contained in those communications. We may still send non-promotional communications relating to your orders, account, transactions or customer-service requests.",
          ],
        },
        { kind: "p", text: "To exercise a privacy right available to you, please contact us using the contact information provided below." },
        { kind: "p", text: "We may need to verify your identity before processing certain requests, where permitted or required by applicable law." },
        { kind: "p", text: "We will respond to valid requests within the timeframes required by applicable law." },
      ],
    },
    {
      id: "complaints",
      heading: "Complaints",
      blocks: [
        { kind: "p", text: "If you have a concern or complaint regarding how Rosica collects, uses or processes your personal information, please contact us using the details provided below." },
        { kind: "p", text: "We will review your concern and respond as appropriate." },
        { kind: "p", text: "Where applicable, you may also have the right to submit a complaint to a competent data-protection or regulatory authority." },
      ],
    },
    {
      id: "international-transfers",
      heading: "International Transfers",
      blocks: [
        { kind: "p", text: "Your personal information may be transferred to, stored or processed in countries outside the United Arab Emirates, including countries where Shopify and our other service providers operate." },
        { kind: "p", text: "Where required by applicable law, we take appropriate steps to ensure that international transfers of personal information are subject to appropriate safeguards." },
        { kind: "p", text: "The privacy and data-protection laws of countries in which information is processed may differ from those of the United Arab Emirates." },
      ],
    },
    {
      id: "changes-to-this-privacy-policy",
      heading: "Changes to This Privacy Policy",
      blocks: [
        { kind: "p", text: "We may update this Privacy Policy from time to time to reflect changes to our Services, business practices, technologies, service providers or applicable legal and regulatory requirements." },
        { kind: "p", text: "When we update this Privacy Policy, we will publish the revised version and update the “Last updated” date at the top of this page." },
        { kind: "p", text: "Where required by applicable law, we will provide additional notice of material changes." },
      ],
    },
  ],
};

/**
 * The page furniture around the documents. Unlike the documents themselves this
 * is ordinary site copy, so it is translated.
 */
export type LegalChrome = {
  eyebrow: string;
  contentsHeading: string;
  /** Sits under the title on the Arabic pages only. */
  languageNote?: string;
};

export const legalChrome: Localised<LegalChrome> = {
  en: {
    eyebrow: "LEGAL",
    contentsHeading: "Contents",
  },
  ar: {
    eyebrow: "الشؤون القانونية",
    contentsHeading: "المحتويات",
    languageNote:
      "النص القانوني معتمد باللغة الإنجليزية، وهو النسخة السارية. لأي استفسار بالعربية يسعدنا مراسلتنا على info@rosica.ae.",
  },
};

/** Arabic titles for the two documents, used for the page heading and metadata. */
export const legalTitles = {
  terms: {
    en: { title: "Terms of Service", description: termsDocument.metaDescription },
    ar: {
      title: "شروط الخدمة",
      description: "الشروط والأحكام التي تسري عند استخدامك موقع روزيكا ومتجرها الإلكتروني وخدماتها.",
    },
  },
  privacy: {
    en: { title: "Privacy Policy", description: privacyDocument.metaDescription },
    ar: {
      title: "سياسة الخصوصية",
      description: "كيف تجمع روزيكا معلوماتك الشخصية وتستخدمها وتحميها.",
    },
  },
} as const;
