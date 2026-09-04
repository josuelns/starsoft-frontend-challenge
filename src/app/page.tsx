export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded bg-brand-card-bg p-8 text-center">
        <h1 className="text-2xl font-semibold text-brand-gray-light">
          Starsoft NFT Marketplace
        </h1>
        <p className="mt-4 text-brand-gray-medium">
          Estrutura base configurada. Os componentes serão implementados em
          seguida.
        </p>
        <button
          type="button"
          className="mt-8 rounded bg-brand-orange px-6 py-3 font-medium text-brand-dark-bg transition-opacity hover:opacity-90"
        >
          Explorar NFTs
        </button>
      </div>
    </main>
  );
}
