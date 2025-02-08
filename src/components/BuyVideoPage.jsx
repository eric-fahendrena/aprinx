import { useState } from "react"
import Header from "./commons/Header"
import InputText from "./commons/InputText"
import Button from "./commons/Button"
import { useNavigate, useParams } from "react-router-dom"

function BuyVideoPage() {
  const [transIdIpt, setTransIdIpt] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  
  function verify() {
    navigate(`/videos/${params.vId}/payment`)
  }

  return (
    <>
      <Header />
      <div className="p-5 bg-zinc-950 text-white">
        <h1 className="text-3xl">Acheter la vidéo</h1>
        <div className="py-3">
          Envoyer 10 000Ar au numéro <strong>+261 32 24 060 77</strong>, puis entrez l'ID de transaction dans le champ ci-déssous pour verifier votre payement.
        </div>
      </div>
      <div className="container mx-auto">
        <div className="p-5">
          <InputText 
            id={"transId"}
            label="ID de transaction" 
            placeholder="ID de transaction"
            value={transIdIpt}
            onChange={(e) => setTransIdIpt(e.target.value)} 
          />
          <Button onClick={verify}>Verifier</Button>
        </div>
      </div>
    </>
  )
}

export default BuyVideoPage
