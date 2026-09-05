import type { Nft } from '@/domain/nft/types';
import type { ApiProduct } from '@/services/products/types';

export function mapProductToNft(product: ApiProduct): Nft {
  const priceNumber = Number.parseFloat(product.price);

  return {
    id: String(product.id),
    title: product.name,
    description: product.description,
    price: Number.isInteger(priceNumber)
      ? priceNumber.toString()
      : priceNumber.toFixed(2),
    imageSrc: product.image,
    imageAlt: product.name,
  };
}
