import { ChevronDown } from "lucide-react"

function BottomSheet({ children, open=false, onClose }) {
  return (
    <div 
      className="fixed z-50 top-28 bottom-0 start-0 end-0 bg-white rounded-t-3xl"
      style={{
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "all .25s ease-in-out",
      }}
    >
      <div className="h-[24pt] flex justify-center">
        <button
          onClick={onClose}
        >
          <ChevronDown size={40} />
        </button>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
