import { Layout } from "@/components/Layout";
import { AssetAllocationChart } from "@/components/AssetAllocationChart";


export default function Home() {
  return (
    <Layout>
      <main
        className={`text-primary flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-blue`}
      >
        Hello world
        <AssetAllocationChart />
      </main>
    </Layout>
  );
}
