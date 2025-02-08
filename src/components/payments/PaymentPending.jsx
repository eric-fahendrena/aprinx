import { Timer } from "lucide-react"

function PaymentPending() {
  return (
    <div className="container mx-auto">
      <div className="p-5">
        <div className="py-5 text-blue-600">
          <Timer size={56} />
        </div>
        <h1 className="text-3xl font-bold py-5 text-zinc-900">Vérification de votre paiement</h1>
        <p>Votre paiement est en cours de vérification. Cela peut prendre un instant, merci de patienter.</p>
        <div className="py-5">
          <div className="mb-2 font-bold text-zinc-600">Temps restant</div>
          <div className="text-5xl font-bold">
            59 : 00
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPending
