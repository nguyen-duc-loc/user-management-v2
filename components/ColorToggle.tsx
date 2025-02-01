"use client";

import React from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AvailableColors, Color, useColor } from "@/hooks/useColor";
import { cn } from "@/lib/utils";

const mapColor = {
  zinc: "theme-zinc",
  red: "theme-red",
  rose: "theme-rose",
  orange: "theme-orange",
  green: "theme-green",
  blue: "theme-blue",
  yellow: "theme-yellow",
  violet: "theme-violet",
};

const ColorItem = ({ color }: { color: Color }) => (
  <div className="flex items-center gap-4">
    <div className={cn("w-6 h-6 rounded-full bg-primary", mapColor[color])} />
    {color}
  </div>
);

const ColorToggle = () => {
  const { color, setColor } = useColor();

  return (
    <Select
      onValueChange={(value) => {
        setColor((value as Color) || "blue");
      }}
      defaultValue={color}
    >
      <SelectTrigger className="w-[160px] capitalize">
        <SelectValue placeholder={<ColorItem color={color} />} />
      </SelectTrigger>
      <SelectContent>
        {AvailableColors.map((color) => (
          <SelectItem key={color} value={color} className="capitalize">
            <ColorItem color={color} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ColorToggle;
