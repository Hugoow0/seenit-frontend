import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useIsMobile from "../../hooks/use-media-query";

describe("Hook - useIsMobile", () => {
    // Sauvegarde de l'objet window initial
    const originalInnerWidth = window.innerWidth;

    beforeAll(() => {
        // Configurer un mock pour simuler le redimensionnement
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1024, // Desktop par défaut
        });
    });

    afterAll(() => {
        // Restauration
        window.innerWidth = originalInnerWidth;
    });

    it("devrait retourner false sur un écran large (desktop)", () => {
        window.innerWidth = 1024;
        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it("devrait retourner true sur un petit écran (mobile)", () => {
        window.innerWidth = 500;
        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it("devrait se mettre à jour lors du redimensionnement de la fenêtre", () => {
        window.innerWidth = 1024; // Commence en desktop
        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);

        // Simule le redimensionnement vers un mobile
        act(() => {
            window.innerWidth = 500;
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current).toBe(true);
    });
});
