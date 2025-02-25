import { Check } from "lucide-react"
import { Link } from "react-router-dom"

function FullScreenStatus({ status="info", message, linkText, href }) {
  return (
    <div className="fixed top-0 bottom-0 start-0 end-0 bg-white flex items-center justify-center">
      <div className="text-center">
        {status === "success" && (
          <div className="w-[40pt] h-[40pt] border-[6px] mx-auto mb-3 border-green-600 text-green-600 rounded-full flex items-center justify-center">
            <Check size={24} strokeWidth={6} />
          </div>
        )}
        <p className="text-xl mb-3">{message}</p>
        <Link to={href} className="text-[#800] font-bold">{linkText}</Link>
      </div>
    </div>
  )
}

export default FullScreenStatus
