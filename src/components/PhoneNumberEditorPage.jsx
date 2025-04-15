import InputNumber from "./commons/InputNumber"
import InputText  from "./commons/InputText"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Button from "./commons/Button"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"

function PhoneNumberEditorPage() {
  const { profile } = useContext(ProfileContext)
  const { savePhoneNumber } = useContext(ProfileContext)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [associatedName, setAssociatedName] = useState("")
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const phoneNbChangeHandler = (e) => {
    setPhoneNumber(e.target.value)
  }
  const assocNameChangeHandler = (e) => {
    setAssociatedName(e.target.value)
  }
  const save = async () => {
    const data = new Object()
    if (phoneNumber.length < 10) {
      alert("Le numéro de téléphone est incorrect !")
      return
    }
    if (associatedName.length < 6) {
      alert("Le nom associé est trop court !");
      return
    }

    data.phone_number = phoneNumber
    data.phone_number_associated_name = associatedName
    console.log("Saving...")
    setSaving(true)
    const updatedProfile = await savePhoneNumber(data)
    console.log("Finished !")
    console.log("Updated profile")
    console.log(updatedProfile)

    profile.phone_number = phoneNumber
    profile.phone_number_associated_name = associatedName
    setSaving(false)
    navigate("/")
  }
  
  useEffect(() => {
    if (profile.phone_number) {
      setPhoneNumber(profile.phone_number)
      setAssociatedName(profile.phone_number_associated_name)
    }
  }, [])

  return (
    <>
      <header className="px-5 py-3 bg-[#800] text-white font-[500] sticky top-0">
        <div className="flex">
          <Link to="/">
            <ArrowLeft strokeWidth={2} className="me-2" />
          </Link>
          Informations de paiement
        </div>
      </header>
      <div className="absolute top-0 bottom-0 start-0 end-0 bg-white mt-[56px]">
        <div className="p-5 md:w-2/3 lg:w-1/2">
          <div className="p-5 border rounded-3xl">
            <div className="mb-3">
              <h1 className="mb-3 text-[1.5rem] font-bold">Les informations de payement</h1>
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
            <Button onClick={save} disabled={saving}>{saving ? "..." : "Enregistrer"}</Button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default PhoneNumberEditorPage
