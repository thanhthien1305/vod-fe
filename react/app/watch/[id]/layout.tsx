export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-[88px] w-[100vw]">
        {children}
    </section>
  );
}
