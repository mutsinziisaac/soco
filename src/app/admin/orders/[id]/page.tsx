"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { CreditCard, MapPin, Package, Phone, Truck, User } from "lucide-react";
import {
  changeOrderStatus,
  deleteOrder,
  getOneOrder,
} from "@/lib/slices/singleOrderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import moment from "moment";

function getBadge(status: string | undefined) {
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

export default function OrderDetails({ params }: { params: { id: number } }) {
  const id = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneOrder(id));
  }, [dispatch, id]);

  const { order } = useAppSelector((state) => state.order);

  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await dispatch(
        changeOrderStatus({ orderId: id, status: newStatus }),
      ).unwrap();
      toast.success("Order status changed");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      toast.success("Order deleted");
      router.push("/admin/orders");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const timeAgo = (timestamp: string) => {
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

  return (
    <div className="container mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-5xl mx-auto overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-orange-500 to-green-500 p-6 text-white">
            <h1 className="text-3xl font-bold">Order #{order?.id}</h1>
            <p className="text-lg mt-2">
              {order?.orderDate
                ? timeAgo(order.orderDate)
                : "No date available"}
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Package className="mr-2" /> Order Details
                </h2>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <CreditCard className="mr-2 text-gray-500" />{" "}
                    {order?.paymentMethod}
                  </p>
                  <p className="flex items-center">
                    <Truck className="mr-2 text-gray-500" /> Status:
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-white text-sm ${getBadge(order?.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                  <div className="mt-4">
                    <Select
                      onValueChange={handleStatusChange}
                      value={order.orderStatus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Delivering">Delivering</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <User className="mr-2" /> Customer Information
                </h2>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <User className="mr-2 text-gray-500" /> {order?.user?.name}
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2 text-gray-500" /> {order?.user?.tel}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="mr-2 text-gray-500" />{" "}
                    {order?.shippingAddress?.fullAddress}
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order?.orderItems?.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell>
                        <div className="w-12 h-12 relative">
                          <Image
                            src={item?.product?.images[0] || "/noimage.jpeg"}
                            alt="Product"
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item?.product?.name}
                      </TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>${item?.price.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">
                        ${(item?.quantity * item?.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 text-right">
              <p className="text-2xl font-bold">
                Total: ${order?.totalAmount?.toFixed(2)}
              </p>
            </div>
          </CardContent>
          <div className="bg-gray-100 p-6 flex justify-between items-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the order and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteOrder}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              onClick={() => router.push("/admin/orders")}
              variant="outline"
            >
              Back to Orders
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
