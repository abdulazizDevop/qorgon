import React from "react";

interface DemoBadgeProps {
  label?: string;
  className?: string;
}

const DemoBadge: React.FC<DemoBadgeProps> = ({
  label = "Demo ma'lumot",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider border border-amber-200 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
      {label}
    </span>
  );
};

export default DemoBadge;
