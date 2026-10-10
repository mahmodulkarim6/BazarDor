import CategoryView from "@/components/CategoryView";
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  return <CategoryView slug={slug} />;
}
