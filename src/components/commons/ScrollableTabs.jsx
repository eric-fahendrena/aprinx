import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../../contexts/CourseContext"

function ScrollableTab({ onSelect }) {
  const { categories } = useContext(CourseContext)
  const [tags, setTags] = useState([
    {value: "all", label: "Tous", active: true},
  ])

  const handleTagClick = (tag) => {
    tags.map(item => {
      item.active = false
      if (item.value === tag.value) {
        item.active = true
      }

      return item
    })
    setTags(tags)
    onSelect(tag)
  }

  useEffect(() => {
    console.log("Tags count", tags.length)

    for (let i = 1; i < categories.length; i++) {
      const tag = {
        value: categories[i].value,
        label: categories[i].label,
        active: false
      }
      tags[i] = tag
    }
  }, [tags])
  
  return (
    <div className="container mx-auto">
      <div className="px-5 py-2 overflow-scroll whitespace-nowrap scrollbar-hide">
        {tags.map((tag, idx) => {
          return (
            <button key={idx} className="px-1 inline-block" onClick={() => handleTagClick(tag)}>
              <div className={`py-2 px-3 ${tag.active ? "bg-red-800 text-white" : "bg-zinc-200"} rounded-full`}>
                {tag.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollableTab
