"use client";
import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { getCategories } from "@/lib/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateProduct } from "@/lib/slices/productsSlice";
import { getProduct } from "@/lib/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  price: z.preprocess(
    (value) => Number(value), // Convert the value to a number
    z.number().min(1, {
      message: "price cannot be empty.",
    }),
  ),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  categories: z.array(z.number()).optional(),

  images: z.array(z.string()).optional(),
  discount: z.preprocess(
    (value) => Number(value), // Convert the value to a number
    z.number().optional(),
  ),
  uom: z.string().optional(),
});

function CreatePage({ params }: { params: { id: number } }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categories: [],
      discount: 0,
      uom: "",
      images: [],
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = params.id;

  const resetForm = () => {
    form.reset({
      name: "",
      price: 0,
      description: "",
      categories: [],
      discount: 0,
      uom: "",
      images: [],
    });
    setSelectedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("categories", JSON.stringify(data.categories));
    if (data.discount !== undefined) {
      formData.append("discount", data.discount.toString());
    }

    if (data.uom !== undefined) {
      formData.append("uom", data.uom.toString());
    }

    formData.append("images", JSON.stringify(data.images));

    images.forEach((image: File) => {
      formData.append("files", image);
    });

    try {
      await dispatch(updateProduct({ formData, id })).unwrap();
      resetForm();
      router.push("/admin/products");
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to updated product");
    }
  }

  const [images, setSelectedImages] = useState<File[]>([]);
  const [updateimages, setSelectedUpdateImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { categories } = useAppSelector((state) => state.categories);
  const { loading, product } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && product) {
      form.reset({
        name: product?.name || "",
        price: product?.price || 0,
        description: product?.description || "",
        categories: product?.categories?.map((category) => category.id) || [],
        discount: product?.discount || 0,
        uom: product?.uom || "",
        images: product?.images || [],
      });
      setSelectedUpdateImages(product?.images || []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, id]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
          <CardDescription>add a new product to the store</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:grid grid-cols-2 gap-4"
            >
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Product" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is public display name of the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Of Measurement</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: kg, ct" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="product discount"
                          type="number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={
                            Array.isArray(categories.categories)
                              ? categories.categories
                                  .filter((cat) => cat.id !== undefined)
                                  .map((cat) => ({
                                    id: cat.id as number,
                                    name: cat.name,
                                  }))
                              : []
                          }
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select category"
                          variant="inverted"
                          animation={2}
                          maxCount={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-center w-full">
                  <Button
                    onClick={handleButtonClick}
                    variant={"outline"}
                    type="button"
                    className="px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Add Images
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    aria-label="Select images"
                  />
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Selected image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                          width={40}
                          height={40}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {updateimages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {updateimages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image}
                          alt={`Selected image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                          width={40}
                          height={40}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length === 0 && updateimages.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">
                    No images selected
                  </p>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default CreatePage;
