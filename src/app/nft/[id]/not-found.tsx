import Link from 'next/link';

export default function NftNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[600px] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-sans text-[25px] font-semibold text-brand-gray-light">
        NFT não encontrado
      </h1>
      <p className="mt-4 font-sans text-[14px] text-brand-gray-medium">
        O item que você procura não existe ou foi removido do catálogo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-[66px] items-center justify-center rounded bg-brand-orange px-8 font-sans text-[16px] font-bold uppercase text-brand-gray-light transition-opacity hover:opacity-90"
      >
        Voltar ao marketplace
      </Link>
    </main>
  );
}
