import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../../contexts/CourseContext"

function ScrollableTab({ onSelect }) {
  const { tags, setTags } = useContext(CourseContext)

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

  return (
    <div className="">
      <div className="">
        <div className="px-5 py-2 overflow-scroll whitespace-nowrap scrollbar-hide">
          {tags.map((tag, idx) => {
            return (
              <button key={idx} className="px-1 inline-block" onClick={() => handleTagClick(tag)}>
                <div className={`py-2 px-3 text-sm ${tag.active ? "bg-red-800 text-white" : "bg-zinc-200"} rounded-full`}>
                  {tag.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScrollableTab
