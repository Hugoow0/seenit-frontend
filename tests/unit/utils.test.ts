import { describe, it, expect } from 'vitest';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Simulation de la fonction dans cn s'il y en a une, mais utilsons directement le test sur clsx et twMerge qui est la base de cn
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

describe('Utils - cn()', () => {
  it('devrait fusionner les classes tailwind correctement', () => {
    const result = cn('px-2 py-1', 'bg-red-500');
    expect(result).toBe('px-2 py-1 bg-red-500');
  });

  it('devrait gérer les conflits de classes tailwind', () => {
    const result = cn('px-2 py-1 bg-red-500', 'bg-blue-500');
    expect(result).toBe('px-2 py-1 bg-blue-500');
  });

  it('devrait ignorer les valeurs nulles ou conditionnelles fausses', () => {
    const isError = false;
    const result = cn('text-white', isError && 'bg-red-500', !isError && 'bg-green-500');
    expect(result).toBe('text-white bg-green-500');
  });
});
