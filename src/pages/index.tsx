import { Layout } from "@/components/Layout";
import { TotalCreditChart } from "@/components/Home/TotalCreditChart";
import { DashboardHeader } from "@/components/Home/DashboardHeader";
import { OrderCard } from "@/components/Home/OrderCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderDashboard from "@/components/Home/TotalOrdersDashboard";

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen">
        <div className="flex flex-col gap-4 px-4 lg:flex-row">
          <OrderDashboard />
          <TotalCreditChart />
        </div>
        <Card className="mt-4 mx-4">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Orders</CardTitle>
          </CardHeader>
          <CardHeader>
            <CardTitle className="text-2xl">Due Soon</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-6 ">
            <OrderCard />
            <OrderCard />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-6 ">
            <OrderCard />
            <OrderCard />
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
