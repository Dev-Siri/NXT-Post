"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loadingSpinner?: ReactNode;
}

export default function SubmitButton({
  children,
  loadingSpinner,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit">
      {children}
      {pending && loadingSpinner}
    </button>
  );
}
