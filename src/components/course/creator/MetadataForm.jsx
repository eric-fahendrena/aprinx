import { useState } from "react"
import InputNumber from "../../commons/InputNumber"
import InputText from "../../commons/InputText"
import Textarea from "../../commons/Textarea"
import Select from "react-select"

function MetadataForm() {
  const [priceIpt, setPriceIpt] = useState("")
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
    },
    {
      value: "music",
      label: "Musique"
    },
    {
      value: "sport",
      label: "Sport",
    }
  ]

  function categoryOnChangeHandler(val) {
    localStorage.setItem("course_category_ipt", JSON.stringify(val))
  }
  function priceOnChangeHandler(e) {
    setPriceIpt(e.target.value)
    localStorage.setItem("course_price_ipt", e.target.value)
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
      <div className="mb-3">
        <InputNumber 
          label="Prix (Ariary)"
          placeholder="Prix"
          id="priceIpt"
          value={priceIpt}
          onChange={priceOnChangeHandler}
        />
      </div>
      <div className="mb-3">
        <InputText 
          label="Titre"
          placeholder="Titre"
          id="titleIpt"
          value={titleIpt}
          onChange={titleOnChangeHandler}
        />
      </div>
      <div className="mb-3">
        <Textarea
          label="Description"
          placeholder={"Description"}
          value={descriptionIpt}
          onChange={descriptionOnChangeHandler}
        ></Textarea>
      </div>
    </div>
  )
}

export default MetadataForm
