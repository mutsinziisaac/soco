"use client";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { useRouter } from "next/navigation";

function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(
    (state: any) => state.orders,
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const timeAgo = (timestamp: Date) => {
    const date = moment(timestamp);
    const now = moment();

    if (now.diff(date, "months") >= 1) {
      // Show the exact date if the difference is more than 1 month
      return date.format("MMMM D, YYYY"); // e.g., "October 21, 2024"
    } else {
      // Show relative time like "2 hours ago"
      return date.fromNow();
    }
  };

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
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your orders here</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.orders?.map((order: any) => (
                <TableRow
                  key={order?.id}
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium"># {order?.id}</TableCell>
                  <TableCell>{order?.user?.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getBadge(order?.orderStatus)}`}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell>{timeAgo(order?.orderDate)}</TableCell>
                  <TableCell>{order?.user?.tel}</TableCell>
                  <TableCell>{order?.shippingAddress?.fullAddress}</TableCell>
                  <TableCell className="flex -space-x-4">
                    {order?.orderItems?.map((item, index) => (
                      <div key={index}>
                        <Avatar>
                          <AvatarImage src={item.product.images[0]} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> orders
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Orders;
