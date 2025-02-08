import { useState } from "react"
import Radio from "../commons/Radio"
import Button from "../commons/Button"

function PostMetaForm({ onNext, onPrev }) {
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
    localStorage.setItem("post_data", JSON.stringify(postData))
    
    onNext && onNext()
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
            <div className="h-[160pt] bg-zinc-600"></div>
            <div className="py-5">
              <div className="py-2">
                <label htmlFor="titleInp" className="block mb-2 font-bold text-zinc-600">Titre</label>
                <input 
                  id="titleInp" 
                  type="text" 
                  placeholder="Titre du contenu" 
                  className={`w-full border-2 rounded p-3 font-bold focus:border-blue-600 outline-none ${titleIptError ? "border-red-600" : ""}`}
                  value={titleIpt}
                  onChange={(e) => setTitleIpt(e.target.value)}
                />
                <div className="py-2 text-red-600 text-sm font-bold">{titleIptHelper}</div>
              </div>
              <div className="py-2">
                <label htmlFor="descInp" className="block mb-2 font-bold text-zinc-600">Description (Optionnel)</label>
                <textarea 
                  id="descInp" 
                  placeholder="Description du contenu" 
                  rows={5} 
                  className="w-full border-2 rounded p-3 font-bold focus:border-blue-600 outline-none"
                  value={descIpt}
                  onChange={(e) => setDescIpt(e.target.value)}
                ></textarea>
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
                      disabled 
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

export default PostMetaForm
