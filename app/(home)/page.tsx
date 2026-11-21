import Contact from "@/features/home/components/contact/contact";
import Products from "@/features/home/components/products/products";
import Hero from "@/features/home/components/hero/hero";
import Info from "@/features/home/components/info/info";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Products></Products>
      <Info></Info>
      <Contact></Contact>
    </>
  );
}
