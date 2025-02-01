"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AvailableColors = [
  "zinc",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
] as const;

export type Color = (typeof AvailableColors)[number];

type ColorProviderProps = {
  children: React.ReactNode;
  defaultColor?: Color;
  storageKey?: string;
};

type ColorProviderState = {
  color: Color;
  setColor: (color: Color) => void;
};

const initialState: ColorProviderState = {
  color: "zinc",
  setColor: () => null,
};

const ColorProviderContext = createContext<ColorProviderState>(initialState);

export function ColorProvider({
  children,
  defaultColor = "zinc",
  storageKey = "color",
  ...props
}: ColorProviderProps) {
  const [color, setColor] = useState<Color>(defaultColor);

  useEffect(() => {
    const currentColor = (localStorage.getItem("color") as Color) || color;
    setColor(currentColor);

    const body = window.document.querySelector("body")!;

    body.classList.remove(...AvailableColors.map((color) => `theme-${color}`));

    body.classList.add(`theme-${currentColor}`);
  }, [color]);

  const value = {
    color,
    setColor: (color: Color) => {
      localStorage.setItem(storageKey, color);
      setColor(color);
    },
  };

  return (
    <ColorProviderContext.Provider {...props} value={value}>
      {children}
    </ColorProviderContext.Provider>
  );
}

export const useColor = () => {
  const context = useContext(ColorProviderContext);

  if (context === undefined)
    throw new Error("useColor must be used within a ColorProvider");

  return context;
};
