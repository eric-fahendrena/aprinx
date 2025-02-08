import { useState } from "react"
import Header from "./commons/Header"
import InputText from "./commons/InputText"
import Button from "./commons/Button"
import BuyerPayment from "./payments/BuyerPayment"
import TransactionDetail from "./commons/TransactionDetail"

function VerifyTransactionPage() {
  const [transIdIpt, setTransIdIpt] = useState("")
  const transFound = true

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="p-5">
          <h1 className="text-3xl font-bold py-5">Verification de transaction</h1>
          <div className="py-5">
            <InputText 
              id="transId" 
              label="ID de transaction" 
              placeholder="Entrez l'ID de Transaction" 
              value={transIdIpt}
              onChange={(e) => setTransIdIpt(e.target.value)}
            />
            {/* <Button>Verifier</Button> */}
          </div>
          {transFound && (
            <TransactionDetail 
              title="Aza avela hifoha - Aina Cook" 
              senderName="Eric Fahendrena"
              transId="CGD672.GD672HD.UD8H"
              date="22-09-2024 21:03"
            />
          )}
          {(transIdIpt === "" || !transFound) && (
            <div className="py-5">
              <BuyerPayment 
                title="Embona sy hanina - Mahaleo"
                senderName="Eric Fahendrena" 
              />
              <BuyerPayment 
                title="Aza avela hifoha - Aina cook"
                senderName="Eric Fahendrena" 
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default VerifyTransactionPage
