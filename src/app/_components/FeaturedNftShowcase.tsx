'use client';

import { Card } from '@/components/nft/NftCard';
import type { ShowcaseNftItem } from '@/app/_data/showcase-data';

type FeaturedNftShowcaseProps = {
  nft: ShowcaseNftItem;
};

export function FeaturedNftShowcase({ nft }: FeaturedNftShowcaseProps) {
  return (
    <section aria-labelledby="card-heading">
      <h2
        id="card-heading"
        className="mb-4 font-sans text-xl font-semibold text-brand-gray-light"
      >
        Card NFT
      </h2>
      <Card>
        <Card.Image src={nft.imageSrc} alt={nft.imageAlt} />
        <div className="mt-[49px] px-[24.5px]">
          <Card.Title>{nft.title}</Card.Title>
          <Card.Description className="mt-[10px]">{nft.description}</Card.Description>
          <Card.Price className="mt-[30px]" value={nft.price} />
          <Card.BuyButton />
        </div>
      </Card>
    </section>
  );
}
