import { create } from "zustand";
import type { Product } from "../types";
import { initialProducts } from "../data/products";

interface BundleState {
  products: Product[];
  activeStep: number;
  setStep: (step: number) => void;
  updateQuantity: (id: string, quantity: number, variantId?: string) => void;
  selectVariant: (id: string, variantId: string) => void;
}

export const useBundleStore = create<BundleState>((set) => ({
  products: initialProducts,
  activeStep: 1,

  setStep: (step) =>
    set((state) => ({
      activeStep: state.activeStep === step ? state.activeStep : step,
    })),

  updateQuantity: (id, quantity, variantId) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== id) return p;

        if (variantId && p.variants) {
          return {
            ...p,
            variants: p.variants.map((v) =>
              v.id === variantId ? { ...v, quantity } : v,
            ),
          };
        }

        return { ...p, quantity };
      }),
    })),

  selectVariant: (id, variantId) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== id || !p.variants) return p;
        return {
          ...p,
          variants: p.variants.map((v) => ({
            ...v,
            quantity: v.id === variantId ? Math.max(v.quantity, 1) : 0,
          })),
        };
      }),
    })),
}));
