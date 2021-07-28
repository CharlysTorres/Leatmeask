
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "./Button";

import '../styles/modal.scss'

export interface ConfirmModalHandles {
  open(): void;
  close(): void;
}

interface ConfirmModalProps {
  onConfirm(): void;
  isConfirming?: boolean;
  title: string;
  confirmText: string;
  description: string;
  icon: string;
}

export function ConfirmModal() {
  return (
    <div></div>
  );
}