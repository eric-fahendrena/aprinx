function ScrollableTab() {
  const tags = [
    {id: "all", name: "Tous", active: false},
    {id: "music", name: "Musique", active: true},
    {id: "programation", name: "Programation"},
    {id: "general-education", name: "Enseignement générale"}
  ]
  
  return (
    <div className="container mx-auto">
      <div className=" px-5 py-2 overflow-scroll whitespace-nowrap scrollbar-hide">
        {tags.map((tag, idx) => {
          return (
            <div key={idx} className="px-1 inline-block">
              <div className={`py-2 px-3 ${tag.active ? "bg-red-800 text-white" : "bg-zinc-200"} font-bold rounded-lg`}>
                {tag.name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollableTab
