import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
// Import du bouton - ajustez l'import selon l'export de votre composant
import { Button } from "../../components/ui/button";
import React from "react";

describe("Composant <Button />", () => {
    it("devrait s'afficher correctement avec le texte donné", () => {
        // Si la lib heroui Button ou Shadcn Button nécessite un wrapper, l'ajouter
        render(<Button>Cliquez-moi</Button>);

        // Vérifier la présence du bouton
        const buttonElement = screen.getByRole("button", {
            name: /Cliquez-moi/i,
        });
        expect(buttonElement).toBeDefined();
    });

    it("devrait appeler la fonction onClick lorsqu'il est cliqué", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Action</Button>);

        const buttonElement = screen.getByRole("button", { name: /Action/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
