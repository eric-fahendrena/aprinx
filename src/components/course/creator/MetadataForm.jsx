import { useState } from "react"
import InputText from "../../commons/InputText"
import Textarea from "../../commons/Textarea"
import Select from "react-select"

function MetadataForm() {
  const [titleIpt, setTitleIpt] = useState("")
  const [descriptionIpt, setDescriptionIpt] = useState("")

  const categoriesOptions = [
    {
      value: "programing",
      label: "Programmation"
    },
    {
      value: "language",
      label: "Langue"
    }
  ]

  function categoryOnChangeHandler(val) {
    localStorage.setItem("course_category_ipt", JSON.stringify(val))
  }
  function titleOnChangeHandler(e) {
    setTitleIpt(e.target.value)
    localStorage.setItem("course_title_ipt", e.target.value)
  }
  function descriptionOnChangeHandler(e) {
    setDescriptionIpt(e.target.value)
    localStorage.setItem("course_description_ipt", e.target.value)
  }

  return (
    <div>
      <Select 
        className="py-5"
        placeholder="Categorie"
        options={categoriesOptions}
        onChange={categoryOnChangeHandler}
      />
      <InputText 
        placeholder="Titre"
        value={titleIpt}
        onChange={titleOnChangeHandler}
      />
      <Textarea
        placeholder={"Description"}
        value={descriptionIpt}
        onChange={descriptionOnChangeHandler}
      ></Textarea>
    </div>
  )
}

export default MetadataForm
