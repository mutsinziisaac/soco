"use client";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { CloudUpload, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "@/lib/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  file: z.string().optional(),
});

const updateFormSchema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  file: z.string().optional(),
});

function Categories() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(
    (state) => state.categories,
  );
  const dropZoneConfig = {
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [file, setFile] = useState<File | null>();
  const [updateId, setUpdateId] = useState<number | null>();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const setUpdateData = (name: string, description: string) => {
    updateForm.reset({
      name: name,
      description: description,
    });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (file) {
      formData.append("file", file);
    } else {
      console.error("No file selected");
    }

    try {
      await dispatch(createCategory(formData)).unwrap();
      toast.success("Category created successfully");
      form.reset();
      setFile(null);
    } catch () {
      toast.error("Something went wrong");
    }
  };

  const onUpdateSubmit = async (data: z.infer<typeof updateFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (file) {
      formData.append("file", file);
    } else {
      console.error("No file selected");
    }

    try {
      await dispatch(updateCategory({ formData, updateId })).unwrap();
      toast.success("Category Updated successfully");
      updateForm.reset({
        name: "",
        description: "",
      });
      setUpdateId(null);
      setFile(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>name</FormLabel>
                          <FormControl>
                            <Input placeholder="Category Name" {...field} />
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
                            <Input
                              placeholder="Category Description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="file"
                      render={() => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <FileUploader
                              value={file}
                              onValueChange={setFile}
                              dropzoneOptions={dropZoneConfig}
                              className="relative bg-background rounded-lg p-2"
                            >
                              <FileInput
                                id="fileInput"
                                className="outline-dashed outline-1 outline-slate-500"
                              >
                                <div className="flex items-center justify-center flex-col p-8 w-full">
                                  <CloudUpload className="text-gray-500 w-10 h-10" />
                                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>
                                    &nbsp; or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF
                                  </p>
                                </div>
                              </FileInput>
                              <FileUploaderContent>
                                {file && (
                                  <FileUploaderItem key="image">
                                    <Paperclip className="h-4 w-4 stroke-current" />
                                    <span>{file.name}</span>
                                  </FileUploaderItem>
                                )}
                              </FileUploaderContent>
                            </FileUploader>
                          </FormControl>
                          <FormDescription>
                            Select a file to upload.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your categories here</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.categories?.map((category: any) => (
                <TableRow key={category?.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={category?.image || "/noimage.jpeg"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {category?.name}
                  </TableCell>
                  <TableCell>{category?.description}</TableCell>
                  <TableCell>{category?._count?.products}</TableCell>
                  <TableCell>
                    <Dialog>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onClick={() => {
                                  setUpdateId(category?.id);
                                  setUpdateData(
                                    category?.name,
                                    category?.description,
                                  );
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the Category and remove its
                              data from the servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-500"
                              onClick={() => {
                                handleDeleteCategory(category?.id);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Form {...updateForm}>
                            <form
                              onSubmit={updateForm.handleSubmit(onUpdateSubmit)}
                              className="space-y-8"
                            >
                              <FormField
                                control={updateForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Category Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={updateForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Category Description"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={updateForm.control}
                                name="file"
                                render={() => (
                                  <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                      <FileUploader
                                        value={file}
                                        onValueChange={setFile}
                                        dropzoneOptions={dropZoneConfig}
                                        className="relative bg-background rounded-lg p-2"
                                      >
                                        <FileInput
                                          id="fileInput"
                                          className="outline-dashed outline-1 outline-slate-500"
                                        >
                                          <div className="flex items-center justify-center flex-col p-8 w-full">
                                            <CloudUpload className="text-gray-500 w-10 h-10" />
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                              <span className="font-semibold">
                                                Click to upload
                                              </span>
                                              &nbsp; or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                              SVG, PNG, JPG or GIF
                                            </p>
                                          </div>
                                        </FileInput>
                                        <FileUploaderContent>
                                          {file && (
                                            <FileUploaderItem key="image">
                                              <Paperclip className="h-4 w-4 stroke-current" />
                                              <span>{file.name}</span>
                                            </FileUploaderItem>
                                          )}
                                        </FileUploaderContent>
                                      </FileUploader>
                                    </FormControl>
                                    <FormDescription>
                                      Select a file to upload.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button type="submit">Submit</Button>
                            </form>
                          </Form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> categories
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Categories;
