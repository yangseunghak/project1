export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="bg-white pt-36">
      <div className="container-wide border-b border-[#E8EBEE] pb-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title mt-5 max-w-5xl font-black text-[#071A2B]">{title}</h1>
        <p className="lead mt-6 max-w-3xl">{description}</p>
      </div>
    </section>
  );
}
