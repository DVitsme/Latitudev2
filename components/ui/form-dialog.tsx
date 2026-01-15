"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  children: React.ReactNode;
  contentClassName?: string;
}

const FormDialog = ({
  trigger,
  title,
  description,
  children,
  contentClassName,
}: FormDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        {(title || description) && (
          <DialogHeader className="text-center">
            {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
            {description && (
              <DialogDescription className="text-base">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { FormDialog, type FormDialogProps };
