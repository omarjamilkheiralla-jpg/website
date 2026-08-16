import type { LegalDocument } from "./legal";

/**
 * The Return & Refund Policy and the Shipping Policy.
 *
 * Kept apart from legal.ts because that file is generated from the .docx the
 * business supplied — regenerating it would wipe anything added by hand. These
 * two are written here, from decisions the business made:
 *
 *   - 14 days from delivery to request a return
 *   - unopened and sealed only, on hygiene grounds, with faulty items exempt
 *   - the customer pays return postage unless the fault is ours
 *
 * Everything else follows the Terms of Service already published: same UAE and
 * Dubai governing law, same Shopify relationship, same registered entity.
 *
 * Deliberately NOT stated anywhere below: delivery charges, delivery times and
 * the courier. Those are shown at checkout, which is the only place they can be
 * right for every order — a figure printed here is a promise that goes stale
 * the first time a rate changes. Add them only when they are settled, and add
 * them to both this page and Shopify at the same time.
 *
 * Published in English on both locale trees, like the other legal documents.
 */

export const returnsDocument: LegalDocument = {
  metaTitle: "Return & Refund Policy",
  metaDescription:
    "How to return a Rosica order, the condition items must be in, and how refunds are issued.",
  title: "Return & Refund Policy",
  contact: {
    heading: "Contact Us",
    lead: "To request a return, or for any question about this policy, please contact us:",
  },
  sections: [
    {
      id: "overview",
      heading: "Overview",
      untitled: true,
      blocks: [
        {
          kind: "p",
          text: "This Return and Refund Policy applies to products purchased from the Rosica online store. It forms part of our Terms of Service and should be read alongside them.",
        },
        {
          kind: "p",
          text: "Nothing in this policy limits any right or remedy available to you under applicable consumer-protection law in the United Arab Emirates.",
        },
      ],
    },
    {
      id: "return-window",
      heading: "Return Window",
      blocks: [
        {
          kind: "p",
          text: "You may request a return within 14 days of the date your order is delivered.",
        },
        {
          kind: "p",
          text: "Requests made after that period may not be accepted, except where the product is faulty, damaged or incorrect, or where a longer period is required by applicable law.",
        },
      ],
    },
    {
      id: "condition",
      heading: "Condition of Returned Items",
      blocks: [
        {
          kind: "p",
          text: "Because our products are cosmetics applied to the hair and scalp, returns are accepted only where the product is unused, unopened and with its original seal intact.",
        },
        {
          kind: "p",
          text: "This is a hygiene and safety requirement. A cosmetic product that has been opened cannot be verified as unused and cannot be offered to another customer.",
        },
        {
          kind: "list",
          lead: "To be accepted, a returned item must be:",
          items: [
            "Unused and unopened, with the original seal unbroken;",
            "In its original packaging, undamaged and complete; and",
            "Accompanied by proof of purchase, such as your order number or confirmation email.",
          ],
        },
        {
          kind: "p",
          text: "This condition requirement does not apply where a product arrives faulty, damaged, incorrect or incomplete. Those are covered in the next section.",
        },
      ],
    },
    {
      id: "faulty",
      heading: "Faulty, Damaged or Incorrect Items",
      blocks: [
        {
          kind: "p",
          text: "If your order arrives damaged, defective, incomplete or is not what you ordered, please contact us within 14 days of delivery with your order number and photographs of the item and its packaging.",
        },
        {
          kind: "p",
          text: "Where we confirm a fault or an error on our part, you may choose a replacement or a full refund, including any delivery charge you paid. You will not be asked to pay return postage, and the item does not need to be unopened.",
        },
        {
          kind: "p",
          text: "Please keep the item and its packaging until the matter is resolved, as we may need to arrange collection or ask for further photographs.",
        },
      ],
    },
    {
      id: "how-to-return",
      heading: "How to Request a Return",
      blocks: [
        {
          kind: "list",
          lead: "To start a return:",
          items: [
            "Email info@rosica.ae within the return window;",
            "Include your order number, the item or items concerned, and the reason for the return; and",
            "Attach photographs if the item arrived damaged, defective or incorrect.",
          ],
        },
        {
          kind: "p",
          text: "We will confirm whether the return is accepted and provide return instructions. Please do not send an item back before receiving those instructions — an unannounced return cannot be identified against an order and may not be refundable.",
        },
      ],
    },
    {
      id: "return-costs",
      heading: "Return Shipping Costs",
      blocks: [
        {
          kind: "p",
          text: "Where you are returning an item because you have changed your mind, the cost of returning it to us is yours to bear, and the original delivery charge is not refunded.",
        },
        {
          kind: "p",
          text: "Where the item is faulty, damaged, incorrect or incomplete, Rosica covers the cost of return and refunds the original delivery charge in full.",
        },
        {
          kind: "p",
          text: "Until a returned item reaches us it remains your responsibility, so please obtain proof of postage and, where the value warrants it, use a tracked service.",
        },
      ],
    },
    {
      id: "refunds",
      heading: "Refunds",
      blocks: [
        {
          kind: "p",
          text: "Once a returned item reaches us it is inspected against the conditions above. We will tell you whether the refund has been approved.",
        },
        {
          kind: "p",
          text: "Approved refunds are issued to the original payment method. The time it then takes to appear on your statement is set by your bank or payment provider and is outside our control; it is commonly five to ten business days.",
        },
        {
          kind: "p",
          text: "Where a return does not meet the conditions above, we will contact you before taking any action and can return the item to you at your cost.",
        },
      ],
    },
    {
      id: "exchanges",
      heading: "Exchanges",
      blocks: [
        {
          kind: "p",
          text: "We do not operate a direct exchange process. If you would like a different product, please request a return in the usual way and place a new order.",
        },
        {
          kind: "p",
          text: "Where an item arrived faulty, damaged or incorrect, a replacement is sent at our cost and no new order is needed.",
        },
      ],
    },
    {
      id: "non-returnable",
      heading: "Items That Cannot Be Returned",
      blocks: [
        {
          kind: "list",
          lead: "The following cannot be returned, except where they are faulty, damaged or incorrect:",
          items: [
            "Products that have been opened, used, or whose seal is broken;",
            "Products returned without proof of purchase;",
            "Products returned after the 14-day window; or",
            "Products damaged after delivery through misuse, or through storage contrary to the directions on the pack.",
          ],
        },
      ],
    },
    {
      id: "cancelling",
      heading: "Cancelling an Order",
      blocks: [
        {
          kind: "p",
          text: "If you wish to cancel an order, contact us as soon as possible. Where the order has not yet been prepared for dispatch we will cancel it and refund it in full.",
        },
        {
          kind: "p",
          text: "Once an order has been dispatched it cannot be cancelled, and the return process above applies instead.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to This Policy",
      blocks: [
        {
          kind: "p",
          text: "We may update this policy to reflect changes in our business, our delivery arrangements or applicable law. The version published on this page at the time you place an order is the one that applies to that order.",
        },
      ],
    },
  ],
};

export const shippingDocument: LegalDocument = {
  metaTitle: "Shipping Policy",
  metaDescription:
    "Where Rosica delivers, how orders are processed, and what to do if an order arrives damaged or does not arrive.",
  title: "Shipping Policy",
  contact: {
    heading: "Contact Us",
    lead: "For any question about delivery of your order, please contact us:",
  },
  sections: [
    {
      id: "overview",
      heading: "Overview",
      untitled: true,
      blocks: [
        {
          kind: "p",
          text: "This Shipping Policy explains how orders placed through the Rosica online store are processed and delivered. It forms part of our Terms of Service and should be read alongside them.",
        },
      ],
    },
    {
      id: "where-we-deliver",
      heading: "Where We Deliver",
      blocks: [
        {
          kind: "p",
          text: "We currently deliver within the United Arab Emirates, to the locations made available during checkout.",
        },
        {
          kind: "p",
          text: "If your address cannot be selected at checkout, we do not deliver there at present. You are welcome to contact us and we will tell you whether that is likely to change.",
        },
      ],
    },
    {
      id: "charges",
      heading: "Delivery Charges and Timeframes",
      blocks: [
        {
          kind: "p",
          text: "Delivery charges and estimated delivery times are calculated at checkout, based on the contents of your order and the address you enter. They are shown to you in full before you pay.",
        },
        {
          kind: "p",
          text: "Any applicable taxes are also shown at checkout. All prices are in United Arab Emirates dirhams (AED).",
        },
        {
          kind: "p",
          text: "Delivery estimates are estimates. They are not guaranteed delivery dates unless we have expressly confirmed one to you in writing.",
        },
      ],
    },
    {
      id: "processing",
      heading: "Order Processing",
      blocks: [
        {
          kind: "p",
          text: "Orders are prepared for dispatch on business days. Orders placed on a weekend or a public holiday are processed on the next business day.",
        },
        {
          kind: "p",
          text: "An order is accepted when we confirm acceptance or dispatch it, subject to successful payment and product availability. An automated order acknowledgement on its own is not acceptance.",
        },
      ],
    },
    {
      id: "tracking",
      heading: "Tracking Your Order",
      blocks: [
        {
          kind: "p",
          text: "Where tracking is available for your delivery, we will send the details to the email address given at checkout once the order has been dispatched.",
        },
        {
          kind: "p",
          text: "If you have not received a dispatch confirmation and the estimated delivery window has passed, please contact us with your order number.",
        },
      ],
    },
    {
      id: "address",
      heading: "Delivery Addresses and Failed Attempts",
      blocks: [
        {
          kind: "p",
          text: "Please make sure the delivery address and contact details you enter at checkout are complete and correct. We cannot change a delivery address once an order has been dispatched.",
        },
        {
          kind: "p",
          text: "Where a delivery fails because the address was incorrect or incomplete, because nobody was available to receive it, or because the courier could not gain access, any cost of redelivery may be payable by you.",
        },
        {
          kind: "p",
          text: "Risk of loss or damage passes to you when the order is delivered to the address given at checkout, or otherwise received by you or by somebody you have authorised to receive it.",
        },
      ],
    },
    {
      id: "delays",
      heading: "Delays Outside Our Control",
      blocks: [
        {
          kind: "list",
          lead: "We are not responsible for delays caused by circumstances outside our reasonable control, including:",
          items: [
            "Incorrect or incomplete delivery information;",
            "Failed delivery attempts or the recipient being unavailable;",
            "Carrier disruption, severe weather or road closures;",
            "Government restrictions or public holidays; or",
            "Other force majeure events.",
          ],
        },
        {
          kind: "p",
          text: "Where we become aware of a delay affecting your order, we will let you know as soon as we reasonably can.",
        },
      ],
    },
    {
      id: "on-arrival",
      heading: "If Your Order Arrives Damaged or Incomplete",
      blocks: [
        {
          kind: "p",
          text: "Please inspect your order promptly on delivery. If it arrives damaged, defective, incomplete or incorrect, contact us within 14 days of delivery with your order number and photographs of the item and its packaging.",
        },
        {
          kind: "p",
          text: "We will arrange a replacement or a full refund at no cost to you. Our Return and Refund Policy sets out how this works.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to This Policy",
      blocks: [
        {
          kind: "p",
          text: "We may update this policy to reflect changes in our delivery arrangements, our carriers or applicable law. The version published on this page at the time you place an order is the one that applies to that order.",
        },
      ],
    },
  ],
};

/** Titles and descriptions for the two pages, per locale. */
export const policyTitles = {
  returns: {
    en: {
      title: returnsDocument.title,
      description: returnsDocument.metaDescription,
    },
    ar: {
      title: "سياسة الإرجاع والاسترداد",
      description:
        "كيفية إرجاع طلبك من روزيكا، والحالة التي يجب أن تكون عليها المنتجات، وكيفية إصدار المبالغ المستردة.",
    },
  },
  shipping: {
    en: {
      title: shippingDocument.title,
      description: shippingDocument.metaDescription,
    },
    ar: {
      title: "سياسة الشحن",
      description:
        "أين توصّل روزيكا، وكيف تُجهَّز الطلبات، وما العمل إذا وصل الطلب تالفًا أو لم يصل.",
    },
  },
} as const;
