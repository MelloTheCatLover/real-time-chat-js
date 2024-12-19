import React from "react";
import { Sparkles } from "../components/ui/sparkles";

export const HomePage = () => {
  return (
    <div>
      <Sparkles
        density={1800}
        speed={1.2}
        color="#48b6ff"
        direction="top"
        className="absolute inset-x-0 bottom-0 h-full w-full "
      />
    </div>
  );
};
