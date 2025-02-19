"use client";
import React, { useEffect } from "react";
import {
  Loader2,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getDashboardData } from "@/lib/slices/dashboardSlice";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { getChartData } from "@/lib/slices/chartSlice";
import { getOrders } from "@/lib/slices/orderSlice";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const chartConfig = {
  totalRevenue: {
    label: "dailyrevenue",
    color: "hsl(var(--primary))",
  },
};

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { dashboardData, loading } = useAppSelector(
    (state) => state.dashboardData,
  );

  const { chartData, loading: chartLoading } = useAppSelector(
    (state) => state?.chartData,
  );

  const {
    orders,
    loading: ordersLoading,
    error,
  } = useAppSelector((state: any) => state.orders);

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getChartData());
    dispatch(getOrders());
  }, [dispatch]);

  type ProfileColor = "red" | "blue" | "green" | "yellow" | "purple" | "pink";

  function profileColor(color: ProfileColor) {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "purple":
        return "bg-purple-500";
      case "pink":
        return "bg-pink-500";
      default:
        return "bg-gray-300";
    }
  }

  type OrderStatus =
    | "Pending"
    | "Confirmed"
    | "Delivering"
    | "Completed"
    | "Cancelled";

  function getBadge(status: OrderStatus) {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-700";
      case "Confirmed":
        return "bg-green-200 text-green-600";
      case "Delivering":
        return "bg-orange-200 text-orange-500";
      case "Completed":
        return "bg-purple-200 text-purple-500";
      case "Cancelled":
        return "bg-red-200 text-red-500";
      default:
        return "bg-gray-300";
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Total Revenue
            </CardTitle>
            <p className="font-bold">UGX</p>
          </CardHeader>
          <CardContent className="flex flex-col">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <NumberTicker
                value={dashboardData?.totalRevenue?._sum?.totalAmount}
                className="text-2xl font-bold"
              />
            )}

            <span className="text-gray-500 font-thin">
              {10}% from last month
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Completed orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5" />
          </CardHeader>
          <CardContent className="flex flex-col">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <NumberTicker
                value={dashboardData?.totalOrders}
                className="text-2xl font-bold"
              />
            )}
            <span className="text-gray-500 font-thin">
              {10}% from last month
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Users</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent className="flex flex-col">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <NumberTicker
                value={dashboardData?.users}
                className="text-2xl font-bold"
              />
            )}
            <span className="text-gray-500 font-thin">
              {10}% from last month
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Mothly Growth
            </CardTitle>
            {dashboardData?.totalMonthlyRevenue?._sum?.totalAmount < 0 ? (
              <TrendingDown
                className={`h-5 w-5 ${dashboardData?.totalMonthlyRevenue?._sum?.totalAmount < 0 ? "text-red-500" : ""}`}
              />
            ) : (
              <TrendingUp className="h-5 w-5 text-green-500" />
            )}
          </CardHeader>
          <CardContent className="flex flex-col">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <NumberTicker
                value={dashboardData?.totalMonthlyRevenue?._sum?.totalAmount}
                className="text-2xl font-bold"
              />
            )}
            <span className="text-gray-500 font-thin">
              {10}% from last month
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={true}
                  tickMargin={2}
                  tickFormatter={(value) => value.slice(8, 10)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="totalRevenue"
                  type="natural"
                  stroke="var(--color-totalRevenue)"
                  strokeWidth={2}
                  dot={false}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing revenue for the last 30 days
            </div>
          </CardFooter>
        </Card>

        <Card className="w-2/3 h-[600px] overflow-y-auto">
          <CardHeader>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-semibold">Recent Orders</CardTitle>
              <ShoppingCart className="h-5 w-5" />
            </div>
            <CardDescription>Top 10 recent orders</CardDescription>
          </CardHeader>

          <CardContent>
            {ordersLoading ? (
              <Loader2 className="mr-20 justify-self-center  h-12 w-12 animate-spin" />
            ) : (
              <Table>
                <TableBody>
                  {orders?.orders?.map((order: any) => (
                    <TableRow
                      key={order?.id}
                      onClick={() => router.push(`/admin/orders/${order.id}`)}
                      className="cursor-pointer border-none"
                    >
                      <TableCell className="hidden sm:table-cell">
                        <div
                          className={`aspect-square rounded-full h-10 w-10 flex items-center justify-center ${profileColor(order?.user?.image)}`}
                        >
                          <span className="text-white font-bold">
                            {order?.user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold"> {order?.user?.name}</p>
                        <p className="text-muted-foreground">
                          {order?.user?.tel}{" "}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getBadge(order?.orderStatus)}`}
                        >
                          {order?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-end">
                        +UGX{order?.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
