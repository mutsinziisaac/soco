"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getSFProducts } from "@/lib/slices/storefront";
import { ChevronLeft, ChevronRight, Plus, Trash2, Minus } from "lucide-react";
import {
  addItem,
  removeItem,
  incQuantity,
  decQuantity,
  totalPrice,
} from "@/lib/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function Home() {
  const dispatch = useAppDispatch();

  const { sfProducts, loading, error } = useAppSelector(
    (state: any) => state.sfProducts
  );
  const { cart } = useAppSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(getSFProducts());
  }, [dispatch]);

  const handleAddToCart = (
    productId: number,
    price: number,
    name: string,
    image: string,
    uom: string,
    discount: number
  ) => {
    dispatch(
      addItem({ productId, quantity: 1, price, name, image, uom, discount })
    );
  };

  const handleIncQuantity = (productId: number) => {
    dispatch(incQuantity(productId));
  };

  const handleDecQuantity = (productId: number) => {
    dispatch(decQuantity(productId));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeItem(productId));
  };

  useEffect(() => {
    dispatch(totalPrice());
  }, [cart, dispatch]);

  return (
    <main className="">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 border">
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))
        : sfProducts?.categories?.map((category: any) => (
            <div key={category?.id} className="p-8">
              <div className="flex justify-between pb-8 items-center">
                <h2 className="text-2xl font-bold">{category?.name}</h2>
                <div className="flex gap-4">
                  <div className="bg-gray-200 rounded-full h-10 w-10 justify-center items-center flex">
                    <ChevronLeft className="cursor-pointer h-6 w-6" />
                  </div>

                  <div className="bg-gray-200 rounded-full h-10 w-10 justify-center items-center flex">
                    <ChevronRight className="cursor-pointer h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {category?.products?.map((product: any) => (
                  <div key={product?.id} className="relative">
                    {/* 
                  If the product is already in the cart, show the quantity
                  and provide buttons to increase or decrease the quantity
                  or remove the item from the cart
                */}
                    {cart
                      .map((item: any) => item.productId)
                      .includes(product?.id) ? (
                      <div className="w-fit gap-2 flex items-center -top-2 -right-2 absolute bg-primary text-white font-bold p-1 rounded-full">
                        {/* 
                      Show the quantity of the product in the cart
                      and provide buttons to increase or decrease the quantity
                    */}
                        {cart.filter(
                          (item: any) => item.productId === product.id
                        )[0]?.quantity > 1 ? (
                          <button
                            className="cursor-pointer hover:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => {
                              handleDecQuantity(product.id);
                            }}
                          >
                            {/* 
                          Show a minus sign if the quantity is greater than 1
                          and provide a button to decrease the quantity
                        */}
                            <Minus className="h-4 w-4 stroke-[3] cursor-pointer" />
                          </button>
                        ) : (
                          <button
                            className="cursor-pointer hover:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => {
                              handleRemoveItem(product.id);
                            }}
                          >
                            {/* 
                          Show a trash can icon if the quantity is 1
                          and provide a button to remove the item from the cart
                        */}
                            <Trash2 className="h-4 w-4 stroke-[3] cursor-pointer" />
                          </button>
                        )}

                        {/* 
                      Show the quantity of the product in the cart
                    */}
                        <p>
                          {
                            cart.filter(
                              (item: any) => item.productId === product?.id
                            )[0]?.quantity
                          }{" "}
                          ct
                        </p>
                        <button
                          className="cursor-pointer hover:bg-green-800 rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={() => handleIncQuantity(product.id)}
                        >
                          {/* 
                        Show a plus sign and provide a button to increase the quantity
                      */}
                          <Plus className="h-4 w-4 stroke-[4]" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          handleAddToCart(
                            product?.id,
                            product?.price,
                            product?.name,
                            product?.images?.[0],
                            product?.uom,
                            product?.discount
                          )
                        }
                        className="group font-extrabold text-base rounded-full w-auto min-w-[5rem] px-4 py-5 flex items-center justify-center transition-all duration-300 ease-in-out absolute -top-2 -right-2"
                      >
                        {/* 
                      If the product is not in the cart, show a button to add it to the cart
                    */}
                        <div>
                          <span className="group-hover:hidden flex items-center">
                            <Plus className="h-4 w-4 stroke-[4]" /> Add
                          </span>
                          <span className="hidden group-hover:inline">
                            Add to cart
                          </span>
                        </div>
                      </Button>
                    )}
                    <Image
                      className="aspect-square object-cover"
                      src={product?.images?.[0]}
                      alt={product?.name}
                      height="200"
                      width="200"
                    />
                    {product?.discount ? (
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          <small className="font-black text-xs">
                            <strong>UGX</strong>
                          </small>
                          <h3 className="text-lg font-black bg-yellow-300 p-1 rounded flex items-center justify-center">
                            {product?.discount}
                          </h3>
                        </div>
                        <div className="">
                          <p className="font-black text-sm">
                            {product?.uom ? (
                              <strong>/{product?.uom}.</strong>
                            ) : (
                              <p className="invisible text-sm bg-red-300">
                                UOM
                              </p>
                            )}
                          </p>
                          <h3 className="text-sm font-sans font-thin line-through">
                            UGX {product?.price}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          <small className="font-black text-xs">
                            <strong>UGX</strong>
                          </small>
                          <h3 className="text-lg font-black">
                            {product?.price}
                          </h3>
                        </div>
                        <div>
                          <p className="font-black text-sm">
                            {product?.uom ? (
                              <strong>/{product?.uom}.</strong>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    )}

                    <p className="font-light">{product?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
    </main>
  );
}

export default Home;
