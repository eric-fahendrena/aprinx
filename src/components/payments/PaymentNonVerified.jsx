import { AlertCircle } from "lucide-react"

function PaymentNonVerified() {
  return (
    <div className="container mx-auto">
      <div className="p-5">
        <div className="py-5 text-red-600">
          <AlertCircle size={56} />
        </div>
        <h1 className="text-3xl font-bold py-5 text-zinc-900">Le délai de vérification est expiré.</h1>
        <p>Nous n'avons pas encore pu vérifier votre paiement.</p>
        <div className="py-5">
          <div className="mb-2 font-bold text-zinc-600">Contacter notre responsable</div>
          <p>Appelez le <a href="tel:+261339933134" target="_blank" className="font-bold text-blue-600">+261 33 99 331 34</a> pour finaliser.</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentNonVerified
