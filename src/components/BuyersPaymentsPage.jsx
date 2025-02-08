import Header from "./commons/Header"
import BuyerPayment from "./payments/BuyerPayment"

function BuyersPaymentsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="p-5">
          <h1 className="text-3xl font-bold">Paiements</h1>
          <div className="py-5">
            <BuyerPayment
              title="Embona sy hanina - Mahaleo"
              senderName="Eric Fahendrena"
            />
            <BuyerPayment
              title="Hay hay - Mahaleo"
              senderName="Eric Fahendrena"
              state="verified"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyersPaymentsPage
