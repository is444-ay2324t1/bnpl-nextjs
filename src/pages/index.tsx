import { Layout } from "@/components/Layout";
import { TotalCreditChart } from "@/components/Home/TotalCreditChart";
import { OrderCard } from "@/components/Home/OrderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderDashboard from "@/components/Home/TotalOrdersDashboard";
import { Installment } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [billsDueThisMonth, setBillsDueThisMonth] = useState<Installment[]>([]);
  const [billsDueOtherMonths, setBillsDueOtherMonths] = useState<Installment[]>(
    []
  );
  const [userData, setUserData] = useState<any>({});
  const [refreshCount, setRefreshCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleRefresh = () => {
    // This function is called from the child component to trigger a refresh
    setRefreshCount(refreshCount + 1);
  };
  const [chartData, setChartData] = useState([
    { status: "Available", credit: 2000 },
  ]);

  const fetchOutstandingBills = async () => {
    const res = await fetch("/api/bills?userId=zihang23&paid=false", {
      method: "GET",
    });

    return res.json();
  };

  useEffect(() => {
    fetchOutstandingBills().then((res) => {
      setUserData(res);
      setLoading(false);

      const chart = [];
      let availableFunds = 2000;
      for (const order in res.orders) {
        const orderData = res.orders[order];

        console.log("hehehxxxx", orderData);
        chart.push({
          status: orderData.merchant,
          credit: orderData.amountDue,
        });
        availableFunds -= orderData.amountDue;
      }
      chart.push({
        status: "Available",
        credit: availableFunds,
      });

      console.log("hehh", chart);
      setChartData(chart);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      console.log("hehe", currentMonth, res);
      const billsThisMonth = (
        res.outstandingInstallments as Installment[]
      ).filter((installment) => {
        const dueDate = new Date(installment.dueDate);
        console.log("duedate", dueDate);
        return dueDate.getMonth() === currentMonth;
      });

      const billsOtherMonths = (
        res.outstandingInstallments as Installment[]
      ).filter((installment) => {
        const dueDate = new Date(installment.dueDate);
        return dueDate.getMonth() !== currentMonth;
      });

      setBillsDueThisMonth(billsThisMonth);
      setBillsDueOtherMonths(billsOtherMonths);
    });
  }, [refreshCount]);

  return (
    <Layout>
      <main className="min-h-screen">
        <div className="flex flex-col gap-4 px-4 lg:flex-row">
          <OrderDashboard loading={loading} {...userData} />
          <TotalCreditChart chartData={chartData} />
        </div>
        <Card className="mt-4 mx-4">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Orders</CardTitle>
          </CardHeader>
          <CardHeader>
            <CardTitle className="text-2xl">Due Soon</CardTitle>
          </CardHeader>
          {billsDueThisMonth.length > 0 && (
            <CardContent className="space-y-6">
              {billsDueThisMonth.map((installment, index) => (
                <>
                  <OrderCard
                    key={index}
                    installmentObj={installment}
                    onRefresh={handleRefresh}
                  />
                </>
              ))}
            </CardContent>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Payments</CardTitle>
          </CardHeader>
          {billsDueOtherMonths.length > 0 && (
            <CardContent className="space-y-6">
              {billsDueOtherMonths.map((installment, index) => (
                <>
                  <OrderCard
                    key={index}
                    installmentObj={installment}
                    onRefresh={handleRefresh}
                  />
                </>
              ))}
            </CardContent>
          )}
        </Card>
      </main>
    </Layout>
  );
}
