import { RefreshCcw } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div class="flex-col gap-4 w-full flex items-center justify-center mt-40">
      <div class="w-24 h-24 border-8 text-black text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-black rounded-full">
        <RefreshCcw className="h-8 w-8 animate-ping" />
      </div>
    </div>
  );
};

export default Loader;
