import Header from "./commons/Header"
import PaymentPending from "./payments/PaymentPending"
import PaymentNonVerified from "./payments/PaymentNonVerified"
import PaymentVerified from "./payments/PaymentVerified"

function PendingPaymentPage() {
  const status = "verified"
  
  return (
    <>
      <Header />
      {status !== "pending" ? "" : (
        <PaymentPending />
      )}
      {status !== "non-verified" ? "" : (
        <PaymentNonVerified />
      )}
      {status !== "verified" ? "" : (
        <PaymentVerified />
      )}
    </>
  )
}

export default PendingPaymentPage
