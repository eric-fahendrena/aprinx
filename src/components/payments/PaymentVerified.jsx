import { CircleCheck, Info, TriangleAlert, CircleX, SearchCheck } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import Alert from "../commons/Alert"

function PaymentVerified() {
  const params = useParams()

  return (
    <div className="container mx-auto">
      <div className="p-5">
        <Alert type="success" icon={<CircleCheck size={40} />}>
          <h1 className="text-2xl text-zinc-600 mb-3">Paiement vérifié avec succès !</h1>
          <p className="text-zinc-600">Votre paiement a été confirmé.</p>
          <div className="py-5">
            <Link to={`/videos/${params.vId}`}  className="text-blue-600 font-bold">Acceder au cours</Link>
          </div>
        </Alert>
      </div>
    </div>
  )
}

export default PaymentVerified
