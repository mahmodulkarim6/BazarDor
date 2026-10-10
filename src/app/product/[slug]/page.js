import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}
