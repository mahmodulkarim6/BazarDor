import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage(){
  return(
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-6">
    <Hero />
    <HomeProducts />
    </div>
  );
}