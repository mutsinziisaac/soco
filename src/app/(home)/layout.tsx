"use client";
import {
  House,
  Truck,
  List,
  UserCog,
  Search,
  MapPin,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeItem, totalPrice } from "@/lib/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cart = useAppSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  const handleRemoveItem = (productId: number) => {
    dispatch(removeItem(productId));
    dispatch(totalPrice());
  };

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      // Check if token exists in localStorage
      try {
        localStorage.removeItem("ACT");
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:4000",
          },
        });
        localStorage.setItem("ACT", token);
      } catch (err) {
        return;
      }
    };

    fetchToken();
  }, []);

  return (
    <body className="relative">
      <header className="h-20 border-b sticky top-0 bg-orange-50 flex items-center justify-between px-10">
        <Image
          src="/soqologo-removebg-preview.PNG"
          alt="soqologo"
          width={150}
          height={80}
        />
        <form>
          <div className="py-0">
            <div className="relative w-[450px]">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search Products..."
                className="pl-8 h-12 bg-white"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </div>
          </div>
        </form>
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          <p className="font-bold">Nganda ln 5</p>
        </div>

        <Sheet>
          <SheetTrigger>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-3xl ${
                cart.cart.length > 0 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              <p className="font-bold">{cart.cart.length}</p>
            </div>
          </SheetTrigger>
          <SheetContent className="w-2/5 sm:max-w-full">
            <SheetHeader>
              <SheetTitle className="text-2xl">Items in Your Bag 🛍️</SheetTitle>
              <SheetDescription>
                Almost there! Just a few steps to checkout 🥳!!!!
              </SheetDescription>
            </SheetHeader>

            <div className="h-5/6 overflow-y-scroll">
              {cart.cart.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {cart.cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <div className="">
                          <p>{item.name}</p>
                          <button
                            className="flex items-center gap-1"
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <p className="text-gray-400">Remove</p>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 border p-2 rounded-md">
                          <p>{item.quantity}</p>
                          <p>{item.uom}</p>
                        </div>
                        <div>
                          {item?.discount ? (
                            <div className="text-sm">
                              <p className="bg-yellow-300">
                                UGX {item.discount * item.quantity}
                              </p>
                              <p className="line-through">
                                UGX {item.price * item.quantity}
                              </p>
                            </div>
                          ) : (
                            <p>UGX {item.price * item.quantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-center justify-center">
                  <Image
                    src="/emptybag-removebg-preview.png"
                    alt="emptybag"
                    width={200}
                    height={200}
                  />
                  <p className="text-2xl font-bold">Your Bag is Empty</p>
                </div>
              )}
            </div>
            <hr className="mb-4" />
            <Button className="w-full p-8 rounded-full font-extrabold text-xl flex items-center justify-between px-3">
              Go to Checkout
              <div className="text-sm flex bg-green-800 p-3 rounded-full">
                <p>UGX</p> <p>{cart.totalPrice}</p>
              </div>
            </Button>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex">
        <section className="w-60 border-r border-gray-100 min-h-screen">
          <div className="border-b flex flex-col gap-4 p-4">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "flex items-center gap-2 bg-black text-white px-4 py-2 rounded-3xl font-bold"
                  : "flex items-center gap-2 px-4 py-2 rounded-3xl"
              }
            >
              <House className="h-6 w-6" />
              <span>Shop</span>
            </Link>

            <Link
              href="/your-orders"
              className={
                pathname === "/your-orders"
                  ? "flex items-center gap-2 bg-black text-white px-4 py-2 rounded-3xl font-bold"
                  : "flex items-center gap-2 px-4 py-2 rounded-3xl "
              }
            >
              <Truck className="h-6 w-6" />
              <span>Your Orders</span>
            </Link>

            <Link
              href="/your-lists"
              className={
                pathname === "/your-lists"
                  ? "flex items-center gap-2 bg-black text-white px-4 py-2 rounded-3xl font-bold"
                  : "flex items-center gap-2 px-4 py-2 rounded-3xl "
              }
            >
              <List className="h-6 w-6" />
              <span>Your Lists</span>
            </Link>
            <Link
              href="/your-account"
              className={
                pathname === "/your-account"
                  ? "flex items-center gap-2 bg-black text-white px-4 py-2 rounded-3xl font-bold"
                  : "flex items-center gap-2 px-4 py-2 rounded-3xl "
              }
            >
              <UserCog className="h-6 w-6" />
              <span>Your Account</span>
            </Link>
          </div>
          <div className="border-b flex flex-col gap-4 p-4">
            <h3 className="font-bold text-lg">Browse aisles</h3>
          </div>
        </section>
        <main className="flex-1 ">{children}</main>
      </div>
    </body>
  );
}
