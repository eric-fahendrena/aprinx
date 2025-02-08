function Alert({ children, type="success", icon }) {
  return (
    <div className="p-5">
      <div className={
        `
          p-5 border-2 rounded-md relative
          ${type === "primary" && "border-blue-600"}
          ${type === "info" && "border-zinc-300"}
          ${type === "success" && "border-green-600"}
          ${type === "warning" && "border-yellow-300"}
          ${type === "danger" && "border-red-400"}
        `
      }>
        <div className={
          `
            absolute w-[32pt] h-[32pt] -top-[16pt] -start-[16pt] rounded-full bg-white flex items-center justify-center
            ${type === "primary" && "text-blue-600"}
            ${type === "info" && "text-zinc-300"}
            ${type === "success" && "text-green-600"}
            ${type === "warning" && "text-yellow-300"}
            ${type === "danger" && "text-red-400"}
          `
        }>
          {icon}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Alert
