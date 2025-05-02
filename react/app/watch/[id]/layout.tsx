export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[100vw]">
        {children}
    </section>
  );
}
