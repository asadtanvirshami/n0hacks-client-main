"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import usFlag from "@/public/flags/us.png";
import esFlag from "@/public/flags/sp.png";

const languages = [
  { code: "en", label: "English", flag: usFlag },
  { code: "es", label: "Espa\u00f1ol", flag: esFlag },
] as const;

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find((item) => item.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 rounded-full border border-emerald-400/45 bg-black/85 px-3 text-sm font-semibold text-white shadow-[0_0_14px_rgba(16,185,129,0.45)] transition-all duration-300 hover:border-emerald-300 hover:bg-black hover:text-emerald-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.65)] sm:px-4 sm:text-sm"
        >
          {currentLanguage && (
            <>
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.label}
                width={18}
                height={18}
                className="rounded-sm sm:mr-2"
              />
              <span className="hidden sm:inline">{currentLanguage.label}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[190px] rounded-2xl border border-emerald-400/35 bg-[#060c09] p-1.5 shadow-[0_0_22px_rgba(16,185,129,0.55)]"
      >
        {languages.map((item) => {
          const isSelected = language === item.code;

          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`mt-1 flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-base outline-none transition-colors focus:bg-emerald-400/10 focus:text-emerald-300 data-[highlighted]:bg-emerald-400/10 data-[highlighted]:text-emerald-300 ${
                isSelected
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "text-white hover:bg-emerald-400/10 hover:text-emerald-200"
              }`}
            >
              <Image
                src={item.flag}
                alt={item.label}
                width={28}
                height={18}
                className="rounded-sm"
              />
              <span className={isSelected ? "font-semibold" : "font-medium"}>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
