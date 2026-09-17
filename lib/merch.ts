export const ETSY_SHOP_URL =
  "https://www.etsy.com/shop/MeekEarthStudio?ref=dashboard-header";

export type MerchPhoto = {
  src: string;
  alt: string;
};

export type MerchProduct = {
  id: string;
  name: string;
  color: string;
  blurb: string;
  photos: MerchPhoto[];
};

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: "forest",
    name: "After God's Own Heart",
    color: "Black — forest",
    blurb:
      "Chest: ichthys with “You Met a Man.” Back: AFTER God’s Own Heart beside a forest earth.",
    photos: [
      { src: "/merch/black-front-worn.jpg", alt: "Black tee, front, You Met a Man ichthys" },
      { src: "/merch/black-back-worn.jpg", alt: "Black tee, back, After God's Own Heart forest" },
      { src: "/merch/black-front-hanger.jpg", alt: "Black tee hanging, front" },
      { src: "/merch/black-front-flat.jpg", alt: "Black tee flat lay, front" },
      { src: "/merch/black-back-flat.jpg", alt: "Black tee flat lay, back forest print" },
      { src: "/merch/black-back-detail.jpg", alt: "Black tee back print detail" },
      { src: "/merch/black-front-indoor.jpg", alt: "Black tee worn indoors" },
      { src: "/merch/black-front-street.jpg", alt: "Black tee worn on the street" },
    ],
  },
  {
    id: "water",
    name: "After God's Own Heart",
    color: "Navy — water",
    blurb:
      "Same front mark. Back: AFTER God’s Own Heart beside a water earth.",
    photos: [
      { src: "/merch/navy-front-worn.jpg", alt: "Navy tee, front, You Met a Man ichthys" },
      { src: "/merch/navy-back-worn.jpg", alt: "Navy tee, back, After God's Own Heart water" },
      { src: "/merch/navy-front-hanger.jpg", alt: "Navy tee hanging, front" },
      { src: "/merch/navy-front-flat.jpg", alt: "Navy tee flat lay, front" },
      { src: "/merch/navy-back-flat.jpg", alt: "Navy tee flat lay, back water print" },
      { src: "/merch/navy-back-detail.jpg", alt: "Navy tee back print detail" },
      { src: "/merch/navy-front-indoor.jpg", alt: "Navy tee worn indoors" },
      { src: "/merch/navy-front-street.jpg", alt: "Navy tee worn on the street" },
    ],
  },
];
