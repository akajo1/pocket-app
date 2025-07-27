import { create } from 'zustand';
import { Child } from '../types';

interface ChildrenState {
  children: Child[];
  selectedChild: Child | null;
  isLoading: boolean;
  error: string | null;
}

interface ChildrenActions {
  setChildren: (children: Child[]) => void;
  setSelectedChild: (child: Child | null) => void;
  addChild: (child: Child) => void;
  updateChild: (id: number, updates: Partial<Child>) => void;
  removeChild: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateChildBalance: (childId: number, amount: number, operation: 'add' | 'subtract') => void;
  updateChildSpending: (childId: number, amount: number) => void;
}

export const useChildrenStore = create<ChildrenState & ChildrenActions>((set, get) => ({
  // State
  children: [],
  selectedChild: null,
  isLoading: false,
  error: null,

  // Actions
  setChildren: (children) => set({ children }),

  setSelectedChild: (selectedChild) => set({ selectedChild }),

  addChild: (child) => set((state) => ({ 
    children: [...state.children, child] 
  })),

  updateChild: (id, updates) => set((state) => ({
    children: state.children.map(child => 
      child.id === id ? { ...child, ...updates } : child
    ),
    selectedChild: state.selectedChild?.id === id 
      ? { ...state.selectedChild, ...updates } 
      : state.selectedChild
  })),

  removeChild: (id) => set((state) => ({
    children: state.children.filter(child => child.id !== id),
    selectedChild: state.selectedChild?.id === id ? null : state.selectedChild
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  updateChildBalance: (childId, amount, operation) => set((state) => ({
    children: state.children.map(child => {
      if (child.id === childId) {
        const newBalance = operation === 'add' 
          ? child.balance + amount 
          : child.balance - amount;
        return { 
          ...child, 
          balance: Math.max(0, newBalance),
          lastActivity: new Date().toISOString()
        };
      }
      return child;
    }),
    selectedChild: state.selectedChild?.id === childId
      ? {
          ...state.selectedChild,
          balance: operation === 'add'
            ? state.selectedChild.balance + amount
            : Math.max(0, state.selectedChild.balance - amount),
          lastActivity: new Date().toISOString()
        }
      : state.selectedChild
  })),

  updateChildSpending: (childId, amount) => set((state) => ({
    children: state.children.map(child => {
      if (child.id === childId) {
        return {
          ...child,
          dailySpent: child.dailySpent + amount,
          weeklySpent: child.weeklySpent + amount,
          lastActivity: new Date().toISOString()
        };
      }
      return child;
    }),
    selectedChild: state.selectedChild?.id === childId
      ? {
          ...state.selectedChild,
          dailySpent: state.selectedChild.dailySpent + amount,
          weeklySpent: state.selectedChild.weeklySpent + amount,
          lastActivity: new Date().toISOString()
        }
      : state.selectedChild
  })),
}));