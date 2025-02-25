import InputNumber from "./commons/InputNumber"
import InputText  from "./commons/InputText"
import Header from "./commons/Header"
import Button from "./commons/Button"
import { useContext, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"

function PhoneNumberEditorPage() {
  const { savePhoneNumber } = useContext(ProfileContext)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [associatedName, setAssociatedName] = useState("")

  const phoneNbChangeHandler = (e) => {
    setPhoneNumber(e.target.value)
  }
  const assocNameChangeHandler = (e) => {
    setAssociatedName(e.target.value)
  }
  const save = async () => {
    const data = new Object()
    data.phone_number = phoneNumber
    data.phone_number_associated_name = associatedName
    console.log("Saving...")
    const updatedProfile = await savePhoneNumber(data)
    console.log("Finished !")
    console.log("Updated profile")
    console.log(updatedProfile)
  }

  return (
    <>
      <Header title={"Ajouter les infos de payement"} />
      <div className="absolute top-0 bottom-0 start-0 end-0 bg-white mt-[56px]">
        <div className="container mx-auto p-5">
          <div className="p-5 border rounded">
            <div className="mb-3">
              <h1 className="mb-3 text-[1.5rem] font-bold">Ajouter les informations de payement</h1>
              <p className="mb-5">Ajouter votre numéro de téléphone ainsi que le nom associé pour que vos visiteurs puissent vous payer et accéder à vos cours.</p>
              <InputNumber 
                label="Numero de téléphone"
                placeholder="Entrez votre numero de téléphone"
                value={phoneNumber}
                onChange={phoneNbChangeHandler}
              />
            </div>
            <div className="mb-5">
              <InputText 
                label="Nom associé au numéro"
                placeholder="Nom associé au numero"
                value={associatedName}
                onChange={assocNameChangeHandler}
              />
            </div>
            <Button onClick={save}>Enregistrer</Button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default PhoneNumberEditorPage
