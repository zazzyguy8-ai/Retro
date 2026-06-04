"use client";

export function Win95Window({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-[#c0c0c0] win95-border ${className}`}>
      <div className="win95-titlebar">
        <span>{title}</span>
        <span className="flex gap-0.5">
          <button className="win95-button !px-1 !py-0 text-xs leading-none">_</button>
          <button className="win95-button !px-1 !py-0 text-xs leading-none">□</button>
          <button className="win95-button !px-1 !py-0 text-xs leading-none">✕</button>
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export function Win95Button({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`win95-button ${disabled ? "text-gray-500" : "hover:bg-gray-200"} ${className}`}
    >
      {children}
    </button>
  );
}
