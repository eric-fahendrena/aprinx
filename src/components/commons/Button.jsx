function Button({ children, variant="primary", disabled=false, onClick }) {
  let bgClass = "bg-red-800"
  let colorClass = "text-white"
  let borderClass = ""
  if (variant === "secondary") {
    bgClass = "bg-white"
    colorClass = "text-zinc-600"
    borderClass = "border border-zinc-400"
  }
  if (variant === "light") {
    bgClass = "bg-white"
    colorClass = "text-zinc-900"
    borderClass = "border"
  }

  return (
    <button
      className={`${bgClass} ${colorClass} ${borderClass} ${disabled ? "opacity-50" : ""} rounded font-bold w-full py-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
