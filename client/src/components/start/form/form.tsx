"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/aceternity/label";
import { Input } from "@/components/ui/aceternity/input";
import { cn } from "@/lib/utils";

import { z } from "zod";
import { ContentSchema } from "@/components/start/validation/form.validation";
import { Form as Forms } from "@/components/ui/shadcn/form";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/redux/useSelector";
import { setDescription, setTitle } from "@/components/start/slice/form.slice";

export function Form() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = async () => {};
  // Dispatch Redux actions when form values change
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(event.target.value));
  };
  return (
    <>
      <Forms {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              placeholder="Project Title"
              type="text"
              {...form.register("title")}
              onChange={onTitleChange}
            />
            {form.formState.errors.title && (
              <p className="text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Description</Label>
            <Input
              id="description"
              placeholder="Project Description"
              type="text"
              {...form.register("description")}
              onChange={onDescriptionChange}
            />
            {form.formState.errors.description && (
              <p className="text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </LabelInputContainer>
        </form>
      </Forms>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
