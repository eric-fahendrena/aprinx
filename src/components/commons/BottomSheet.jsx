import { ChevronDown } from "lucide-react"

function BottomSheet({ title="", children, open=false, onClose }) {
  return (
    <div 
      className="fixed z-50 top-0 bottom-0 start-0 end-0 bg-white shadow rounded-t-3xl"
      style={{
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "all .25s ease-in-out",
      }}
    >
      <div className="h-1/12 sticky top-0 bg-white z-[9999]">
        <div className="flex justify-center">
          <button
            onClick={onClose}
          >
            <ChevronDown size={40} />
            <div className="hidden">Fermer</div>
          </button>
        </div>
        <div className="px-5 font-[500]">{title}</div>
      </div>
      <div className="h-11/12 flex p-5">
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
