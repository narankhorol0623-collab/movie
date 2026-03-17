"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRightIcon, ChevronDownIcon, MessageCircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const GenresDropdown = ({ genres }: { genres: any[] }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentIds =
    pathname.startsWith("/genres/") && !pathname.endsWith("/all")
      ? decodeURIComponent(pathname.replace("/genres/", ""))
          .split(",")
          .filter(Boolean)
      : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(currentIds);

  useEffect(() => {
    setSelectedIds(currentIds);
  }, [pathname]);

  const toggleGenre = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    const url =
      selectedIds.length > 0
        ? `/genres/${selectedIds.join(",")}`
        : "/genres/all";

    router.push(url);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-[#e4e4e7] bg-white px-4 py-2 max-sm:py-3 text-sm hover:bg-gray-50 cursor-pointer"
      >
        <ChevronDownIcon size={16} />
        <span className="max-sm:hidden max-md:hidden">Genre</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full z-50 mt-2 w-145 max-sm:w-80 rounded-xl border border-[#e4e4e7] bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-1">Genres</h2>
            <p className="text-sm text-gray-500 mb-4">
              See lists of movies by genre
            </p>

            <div className="h-px bg-gray-100 mb-4" />

            <div className="flex flex-wrap gap-2 mb-6">
              {genres?.map((g) => {
                const id = String(g.id);
                const isSelected = selectedIds.includes(id);

                return (
                  <button
                    key={id}
                    onClick={() => toggleGenre(id)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs transition cursor-pointer
                      ${
                        isSelected
                          ? "bg-indigo-700 text-white border-indigo-700"
                          : "bg-white border-gray-300 hover:border-indigo-400 hover:text-indigo-500"
                      }`}
                  >
                    {g.name}
                    {isSelected ? (
                      < MessageCircleX  size={14} />
                    ) : (
                      <ChevronRightIcon size={12} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center items-center  pt-2">
              <button
                onClick={handleApply}
                className="bg-white text-black border border-gray-300 hover:bg-indigo-700 hover:text-white px-6 py-2 rounded-lg text-[12px] font-semibold cursor-pointer"
              >
                Apply Filters
                {selectedIds.length > 0 && ` (${selectedIds.length})`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
