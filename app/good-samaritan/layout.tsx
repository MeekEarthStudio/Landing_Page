import GoodSamaritanSubnav from "@/components/GoodSamaritanSubnav";

export default function GoodSamaritanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoodSamaritanSubnav />
      {children}
    </>
  );
}
