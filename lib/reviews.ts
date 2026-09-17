import { ProductReview, RatingBreakdown } from "@/types";

const FIRST_NAMES = [
  "Helena", "James", "Elena", "Michael", "Priya", "David", "Sofia", "Robert",
  "Jonah", "Chris", "Lauren", "Daniel", "Rachel", "Mark", "Ingrid", "Brian",
  "Nicole", "Kevin", "Marta", "Jason", "Michelle", "Ryan", "Laura", "Eric",
  "Clara", "Matt", "Kimberly", "Andrew", "Lisa", "Thomas",
];

const LAST_INITIALS = "ABCDEFGHJKLMNPRSTW";

const REVIEW_PHOTOS = Array.from({ length: 8 }, (_, i) => `/reviews/review-${i + 1}.jpg`);

function productReviews(name: string) {
  const n = name.toLowerCase();
  return {
    titles5: [
      `The ${n} is exactly as described`,
      "Worth keeping on the counter",
      "Settled into daily use immediately",
      "Better in person than in the photos",
      "Quiet, well-made, and useful",
    ],
    titles4: [
      `Good ${n}, one small note`,
      "Solid overall",
      "Almost exactly what I wanted",
      "Works well with a minor caveat",
    ],
    titles3: [
      "Fine, not remarkable",
      "Does the job",
      "Mixed on the size",
    ],
    bodies5: [
      `The ${n} arrived well packed and looks as shown. Materials feel considered rather than flashy, and it has already become part of the daily routine.`,
      `I compared a few similar pieces before ordering this ${n}. The finish is even, the proportions are right, and it does not look cheap next to things we already own.`,
      `Used the ${n} every day this week. Nothing fussy to figure out, and it has held up to ordinary handling without scuffs or warping.`,
      `Bought the ${n} with two other items from the same order. All three arrived together, packed separately, and the ${n} is the one I reach for most.`,
      `The ${n} is heavier / denser than I expected in a good way. It sits where I put it and does not feel like a disposable version of the same object.`,
      `Color matches the listing. The ${n} fits the room without drawing attention, which is what I wanted.`,
    ],
    bodies4: [
      `The ${n} is well made and functions as described. I am taking one star because it is a little smaller than it appeared in the photos, but I am keeping it.`,
      `Happy with the ${n} overall. Instructions could be clearer, though setup still took only a few minutes.`,
      `Good material and a calm look. Shipping took a day longer than the estimate; the ${n} itself is what I expected.`,
      `The ${n} works well. I would have liked one more size option, but this one still fits the space.`,
    ],
    bodies3: [
      `The ${n} is adequate. It does what it should, but I expected a slightly more substantial feel given the description.`,
      `Fine for the price. The ${n} is useful enough, though I may look at a larger version later.`,
    ],
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function formatDate(daysAgo: number): string {
  const date = new Date("2026-09-16T12:00:00.000Z");
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function generateReviewsForProduct(productId: string, productName: string): ProductReview[] {
  const seed = hashString(productId + productName);
  const rand = seededRandom(seed);
  const count = 12 + Math.floor(rand() * 9);
  const copy = productReviews(productName);

  const reviews: ProductReview[] = [];

  const ratingDistribution: number[] = [];
  for (let i = 0; i < count; i++) {
    const r = rand();
    if (r < 0.62) ratingDistribution.push(5);
    else if (r < 0.85) ratingDistribution.push(4);
    else if (r < 0.95) ratingDistribution.push(3);
    else if (r < 0.98) ratingDistribution.push(2);
    else ratingDistribution.push(1);
  }

  ratingDistribution.sort((a, b) => b - a);

  for (let i = 0; i < count; i++) {
    const rating = ratingDistribution[i];
    const firstName = pick(FIRST_NAMES, rand);
    const lastInitial = LAST_INITIALS[Math.floor(rand() * LAST_INITIALS.length)];

    let title: string;
    let body: string;

    if (rating >= 5) {
      title = pick(copy.titles5, rand);
      body = pick(copy.bodies5, rand);
    } else if (rating >= 4) {
      title = pick(copy.titles4, rand);
      body = pick(copy.bodies4, rand);
    } else {
      title = pick(copy.titles3, rand);
      body = pick(copy.bodies3, rand);
    }

    const daysAgo = Math.floor(rand() * 365) + 1;
    const hasImage = rating >= 4 && rand() > 0.75;

    reviews.push({
      id: `${productId}-review-${i}`,
      productId,
      name: `${firstName} ${lastInitial}.`,
      rating,
      title,
      body,
      date: formatDate(daysAgo),
      verified: rand() > 0.15,
      helpful: Math.floor(rand() * 48),
      image: hasImage ? REVIEW_PHOTOS[Math.floor(rand() * REVIEW_PHOTOS.length)] : undefined,
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRatingBreakdown(reviews: ProductReview[]): RatingBreakdown {
  const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const key = r.rating as keyof RatingBreakdown;
    if (key >= 1 && key <= 5) breakdown[key]++;
  });
  return breakdown;
}

export function getAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getReviewCount(reviews: ProductReview[]): number {
  return reviews.length;
}
