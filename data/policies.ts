import { company } from "./company";

export const faqItems = [
  {
    question: `What does ${company.name} sell?`,
    answer:
      "We offer a considered catalog of home and living textiles, kitchen tools and tableware, organization and office objects, travel pieces, decor, wellness goods, and personal accessories.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes. We offer free standard shipping on all orders over $75 within the contiguous United States. Orders under $75 have a flat rate of $9.99. Express shipping is available at checkout for $14.99.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping delivers in 3–5 business days. Express shipping delivers in 1–2 business days. You will receive a tracking number by email once your order ships.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be unused and in original packaging with tags attached. Visit our Returns page for instructions or email us for assistance.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. Once your order ships, you will receive an email with a tracking number and link. You can also visit our Track Order page and enter your order number and email address.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the United States only, including Alaska and Hawaii.",
  },
  {
    question: "How are products selected?",
    answer:
      "Each item is chosen for material quality, everyday function, and a calm design that fits a contemporary home — not for trend cycles.",
  },
  {
    question: "How do I use a coupon code?",
    answer:
      "Enter your coupon code in the 'Coupon code' field on the cart page and click Apply. Valid codes will update your order total immediately. Only one coupon code can be used per order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. Checkout on this site is a demonstration flow and does not process real payments.",
  },
  {
    question: "How can I get in touch?",
    answer: `Email us at ${company.email}.`,
  },
];

export const shippingPolicy = {
  title: "Shipping Policy",
  description: `How ${company.name} delivers orders.`,
  sections: [
    {
      title: "Processing Time",
      content:
        "Orders are processed within 1–2 business days. Orders placed on weekends or holidays ship the next business day.",
    },
    {
      title: "Shipping Methods & Rates",
      content: "",
      list: [
        "Standard Shipping (3–5 business days): $9.99 — FREE on orders over $75",
        "Express Shipping (1–2 business days): $14.99",
        "Alaska & Hawaii: Standard shipping rates apply; delivery may take 5–7 business days",
      ],
    },
    {
      title: "Order Tracking",
      content:
        "Once your order ships, you will receive a confirmation email with a tracking number. You can track your package from the email link or visit our Track Order page.",
    },
    {
      title: "Shipping Restrictions",
      content:
        "We currently ship to all 50 US states. We do not ship to PO boxes for express orders. Oversized items may require additional shipping time.",
    },
    {
      title: "Lost or Damaged Packages",
      content: `If your package arrives damaged or does not arrive within 10 business days of the estimated delivery date, please contact us at ${company.email}.`,
    },
  ],
};

export const returnPolicy = {
  title: "Return Policy",
  description: `Return unused items from ${company.name} within 30 days of delivery.`,
  sections: [
    {
      title: "30-Day Return Window",
      content:
        "You may return most items within 30 days of delivery for a full refund or exchange. Items must be unused and in their original packaging with all tags attached.",
    },
    {
      title: "How to Start a Return",
      content: "",
      list: [
        "Email us at " + company.email + " with your order number and reason for return",
        "We will send you a prepaid return label",
        "Pack items securely in original packaging and attach the label",
        "Drop off at any authorized shipping location",
        "Refund processed within 5–7 business days of receiving your return",
      ],
    },
    {
      title: "Non-Returnable Items",
      content: "",
      list: [
        "Items marked as final sale",
        "Used or altered products",
        "Items without original packaging or tags",
        "Gift cards",
      ],
    },
    {
      title: "Exchanges",
      content:
        "Need a different size or color? Email us and we will arrange an exchange at no additional shipping cost for the replacement item.",
    },
  ],
};

export const refundPolicy = {
  title: "Refund Policy",
  description: `Refund terms for ${company.name} orders.`,
  sections: [
    {
      title: "Refund Eligibility",
      content:
        "Refunds are available for items returned within 30 days of delivery in unused condition with original packaging and tags. Sale items are eligible for refund unless marked as final sale.",
    },
    {
      title: "Refund Processing Time",
      content:
        "Once we receive and inspect your return, refunds are processed within 5–7 business days. The refund will be credited to your original payment method. Please allow an additional 3–5 business days for your bank to reflect the credit.",
    },
    {
      title: "Partial Refunds",
      content: "",
      list: [
        "Items with obvious signs of use or wear may receive a partial refund",
        "Items returned without original packaging may incur a 15% restocking fee",
        "Shipping costs are non-refundable unless the return is due to our error",
      ],
    },
    {
      title: "Defective or Wrong Items",
      content:
        "If you receive a defective or incorrect item, contact us. We will provide a prepaid return label and issue a full refund including original shipping costs, or send a replacement at no charge.",
    },
    {
      title: "Contact Us",
      content: `Questions about refunds? Email ${company.email}.`,
    },
  ],
};

export const privacyPolicy = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses, and protects your information.`,
  sections: [
    {
      title: "Information We Collect",
      content:
        "When you visit our website, create an account, or place an order, we may collect your name, email address, shipping address, and payment information. We also collect browsing data through cookies to improve your shopping experience.",
    },
    {
      title: "How We Use Your Information",
      content: "",
      list: [
        "Process and fulfill your orders",
        "Send order confirmations and shipping updates",
        "Respond to customer requests",
        "Send marketing communications (with your consent)",
        "Improve our website and product offerings",
        "Prevent fraud and ensure security",
      ],
    },
    {
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We share data only with trusted service providers who help us operate our business — such as shipping carriers and payment processors — and only to the extent necessary to provide our services.",
    },
    {
      title: "Cookies",
      content:
        "We use cookies to remember your cart, wishlist, and preferences. You can disable cookies in your browser settings, though some site features may not function properly.",
    },
    {
      title: "Your Rights",
      content:
        "You may request access to, correction of, or deletion of your personal data at any time by contacting us at " +
        company.email +
        ". Washington residents have additional rights under applicable state privacy laws.",
    },
    {
      title: "Contact",
      content: `For privacy-related inquiries, contact us at ${company.email} or write to: ${company.name}, ${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}.`,
    },
  ],
};

export const termsPolicy = {
  title: "Terms & Conditions",
  description: `Please read these terms carefully before using the ${company.name} website.`,
  sections: [
    {
      title: "Acceptance of Terms",
      content: `By accessing and using the ${company.name} website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.`,
    },
    {
      title: "Products & Pricing",
      content:
        "We strive to display accurate product descriptions, images, and pricing. However, errors may occur. We reserve the right to correct any errors and to change or update information at any time without prior notice. Prices are in US dollars and subject to change.",
    },
    {
      title: "Orders & Payment",
      content:
        "Placing an order constitutes an offer to purchase. Checkout on this site is a demonstration flow and does not process real payments. We reserve the right to refuse or cancel any order.",
    },
    {
      title: "Intellectual Property",
      content: `All content on this website — including text, images, logos, and design — is the property of ${company.name} and protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.`,
    },
    {
      title: "Limitation of Liability",
      content: `${company.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product in question.`,
    },
    {
      title: "Governing Law",
      content:
        "These terms are governed by the laws of the State of Washington, United States. Any disputes shall be resolved in the courts of King County, Washington.",
    },
  ],
};
