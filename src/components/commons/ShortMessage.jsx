import React from "react"

function ShortMessage({ children, type="primary", icon }) {
  return (
    <div className={
      `
        text-center
        ${type === "primary" && "text-blue-600"}
        ${type === "info" && "text-zinc-300"}
        ${type === "success" && "text-green-600"}
        ${type === "warning" && "text-yellow-300"}
        ${type === "danger" && "text-red-400"}
      `
    }>
      <div className="flex items-center justify-center font-bold">
        {icon && (
          <div className="me-2">
            {icon}
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ShortMessage
