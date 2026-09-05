export type Nft = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

export type CartItem = {
  item: Nft;
  quantity: number;
};
