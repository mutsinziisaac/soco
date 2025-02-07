"use client";
import {
  File,
  Eye,
  MapPinCheck,
  CreditCard,
  CircleX,
  Hash,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { changeOrderStatus } from "@/lib/slices/orderSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  status: z
    .string({
      required_error: "Please select a status",
    })
    .refine(
      (value) =>
        [
          "pending",
          "confirmed",
          "delivering",
          "completed",
          "cancelled",
        ].includes(value),
      { message: "Please select a valid status" }
    ),
});

function Orders() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(
    (state: any) => state.orders
  );
  const [orderId, setOrderId] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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

  function getBadge(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-primary-foreground";

      case "confirmed":
        return "bg-primary text-primary-foreground";

      case "delivering":
        return "bg-orange-400 text-primary-foreground";

      case "completed":
        return "bg-purple-400 text-primary-foreground";

      case "cancelled":
        return "bg-red-500 text-primary-foreground";

      default:
        return "bg-gray-300"; // Default/fallback badge
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await dispatch(changeOrderStatus({ orderId, ...data })).unwrap();
      toast.success("Order status changed successfully");
      setOrderId(0);
    } catch (error) {
      toast.error("Something went wrong");
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.orders?.map((order: any) => (
                <TableRow key={order?.id}>
                  <TableCell className="font-medium"># {order?.id}</TableCell>
                  <TableCell>{order?.user?.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getBadge(order?.orderStatus)}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell>{timeAgo(order?.orderDate)}</TableCell>
                  <TableCell>{order?.tel}</TableCell>
                  <TableCell>{order?.location}</TableCell>
                  <TableCell>{order?.orderItems?.length}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Sheet>
                      <SheetTrigger>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 rounded-sm hover:border-primary hover:text-primary"
                          onClick={() => setOrderId(order?.id)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-1/2 sm:max-w-full">
                        <SheetHeader>
                          <SheetTitle>Order Details</SheetTitle>
                          <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2">
                            <div>
                              <h1>
                                <div className="flex items-center">
                                  <Hash className="h-4 w-4" />
                                  <span className="font-bold ml-2">
                                    Order ID:
                                  </span>{" "}
                                  {order?.id}
                                </div>
                              </h1>
                              <h1>
                                <div className="flex items-center">
                                  <MapPinCheck className="h-4 w-4" />
                                  <span className="font-bold ml-2">
                                    Address:
                                  </span>{" "}
                                  Mutungo
                                </div>
                              </h1>
                            </div>
                            <div>
                              <h1>
                                <div className="flex items-center">
                                  <CreditCard className="h-4 w-4" />
                                  <span className="font-bold ml-2">
                                    Payment Method:
                                  </span>{" "}
                                  {order?.paymentMethod}
                                </div>
                              </h1>
                              <h1>
                                <span className="font-bold">Total Amount:</span>{" "}
                                {order?.totalAmount} UGX
                              </h1>
                            </div>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order?.orderItems?.map((item: any) => (
                                <TableRow key={item?.id}>
                                  <TableCell>{item?.product?.name}</TableCell>
                                  <TableCell>{item?.price}</TableCell>
                                  <TableCell>{item?.quantity}</TableCell>
                                  <TableCell>
                                    {item?.quantity * item?.price} UGX
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="w-1/2 space-y-6"
                            >
                              <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="pending">
                                          Pending
                                        </SelectItem>
                                        <SelectItem value="confirmed">
                                          Confirmed
                                        </SelectItem>
                                        <SelectItem value="delivering">
                                          Delivering
                                        </SelectItem>
                                        <SelectItem value="completed">
                                          Completed
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      You can change order status here.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit">Submit</Button>
                            </form>
                          </Form>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        {" "}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 rounded-sm border-red-500 text-red-500 hover:text-red-700 text-right"
                        >
                          <CircleX className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will{" "}
                            <strong>Cancel</strong> order #{" "}
                            <strong>{order?.id}</strong>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
