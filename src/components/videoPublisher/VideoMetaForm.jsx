import { useState } from "react"
import Radio from "../commons/Radio"
import Button from "../commons/Button"
import InputText from "../commons/InputText"
import Textarea from "../commons/Textarea"

function VideoMetaForm({ onNext, onPrev }) {
  const [titleIpt, setTitleIpt] = useState("")
  const [titleIptError, setTitleIptError] = useState(false)
  const [titleIptHelper, setTitleIptHelper] = useState("")
  const [descIpt, setDescIpt] = useState("")
  const [access, setAccess] = useState("free")

  function next() {
    const postData = new Object()

    if (titleIpt.length < 6) {
      setTitleIptError(true)
      setTitleIptHelper("Un titre d'au moins 6 caractère est requis")
      return
    }

    setTitleIptError(false)
    setTitleIptHelper("")

    // stocking post data to local storage
    postData.title = titleIpt
    postData.description = descIpt
    postData.access = access
    
    onNext(postData)
  }

  function prev() {
    localStorage.setItem("post_title", null)
    localStorage.setItem("post_description", null)
    localStorage.setItem("post_access", null)
    onPrev && onPrev()
  }

  return (
    <>
      <div className="mb-12">
        <div className="container mx-auto">
          <div className="p-5">
            <h1 className="font-[500] text-xl text-zinc-600">Ajouter des méta donnés</h1>
            <div className="py-5">
              <div className="py-2">
                <InputText 
                  id="titleIpt"
                  label="Titre"
                  placeholder="Titre de la vidéo"
                  value={titleIpt}
                  onChange={e => setTitleIpt(e.target.value)}
                />
                <div className="py-2 text-red-600 text-sm font-bold">{titleIptHelper}</div>
              </div>
              <div className="py-2">
                <Textarea 
                  id="descIpt"
                  label="Description"
                  placeholder="Description de la vidéo"
                  rows={5}
                  value={descIpt}
                  onChange={e => setDescIpt(e.target.value)}
                />
              </div>
              <div className="py-2">
                <div className="mb-2 font-bold text-zinc-600">Accès</div>
                <div className="flex">
                  <div className="me-5">
                    <Radio 
                      label={"Gratuit"} 
                      id={"freeRadio"} 
                      name={"access"} 
                      defaultChecked 
                      onChange={(e) => e.target.checked && setAccess("free")}
                    />
                  </div>
                  <div title="L'option payante sera bientôt disponible.">
                    <Radio 
                      label={"Payant"} 
                      id={"saleRadio"} 
                      name={"access"} 
                      onChange={(e) => e.target.checked && setAccess("sale")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 start-0 end-0 py-5">
        <div className="container mx-auto px-4">
          <div className="flex">
          <div className="w-1/2 px-1">
              <Button 
                variant="secondary"
                onClick={prev}
              >
                Retour
              </Button>
            </div>
            <div className="w-1/2 px-1">
              <Button
                onClick={next}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoMetaForm
