import { create } from "zustand";

export type Transaction = {
  id: number;
  type: "entrada" | "saida";
  value: number;
  to?: string;
  description: string;
};

type BalanceState = {
  balance: number;
  transactions: Transaction[];
  deposit: (value: number) => boolean;
  transfer: (value: number, to: string) => boolean;
};

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: 1000,
  transactions: [
    {
      id: 1,
      type: "entrada",
      value: 1000,
      description: "Saldo inicial",
    },
  ],

  deposit: (value) => {
    if (!value || value <= 0) return false;

    set((state) => ({
      balance: state.balance + value,
      transactions: [
        {
          id: Date.now(),
          type: "entrada",
          value,
          description: "Depósito em conta",
        },
        ...state.transactions,
      ],
    }));

    return true;
  },

  transfer: (value, to) => {
    let success = false;

    set((state) => {
      if (!value || value <= 0 || value > state.balance || !to.trim()) {
        success = false;
        return state;
      }

      success = true;

      return {
        balance: state.balance - value,
        transactions: [
          {
            id: Date.now(),
            type: "saida",
            value,
            to,
            description: "Transferência enviada",
          },
          ...state.transactions,
        ],
      };
    });

    return success;
  },
}));