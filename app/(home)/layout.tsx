import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import CartDrawer from "@/components/cart/cart-drawer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}