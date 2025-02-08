import { Timer, CircleCheck, Info, CreditCard } from "lucide-react"

function BuyerPayment({ title="", senderName="", state="pending" }) {
  return (
    <div className="py-1">
      <div className="flex items-center p-1 border rounded">
        <div className="w-1/6">
          <div className="w-[40pt] h-[40pt] flex items-center justify-center bg-blue-300 text-white rounded">
            <CreditCard />
          </div>
        </div>
        <div className="w-4/6 px-3">
          <div className="font-bold text-zinc-950">
            {title.substring(0, 20)}
            {title.length > 20 && (<span className="text-zinc-300"> ...</span>)}</div>
          <div className="text-zinc-600">{senderName}</div>
        </div>
        <div className="w-1/6">
          <div className="flex items-center justify-center">
            {state !== "pending" ? "" : (
              <Timer className="text-zinc-400" />
            )}
            {state !== "verified" ? "" : (
              <CircleCheck className="text-green-600" />
            )}
            {state !== "non-verified" ? "" : (
              <Info className="text-red-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerPayment
