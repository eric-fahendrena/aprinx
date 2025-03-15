function CourseDetailLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-[56px] bg-zinc-300"></div>
      <div className="w-full h-[160pt] bg-zinc-300"></div>
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-3 mb-3">
          <div className="w-1/4 h-[32pt] bg-zinc-300 rounded-3xl"></div>
          <div className="w-1/4 h-[32pt] bg-zinc-300 rounded-3xl"></div>
          <div className="w-1/4 h-[32pt] bg-zinc-300 rounded-3xl"></div>
        </div>
        <div className="h-[56px] bg-zinc-300 rounded-3xl mb-5"></div>
        <div className="h-[160px] bg-zinc-300 rounded-3xl mb-5"></div>
        <div className="h-[240px] bg-zinc-300 rounded-3xl mb-3"></div>
        <div className="flex items-center">
          <div className="w-1/6">
            <div className="w-[56px] h-[56px] bg-zinc-300 rounded-full"></div>
          </div>
          <div className="w-5/6">
            <div className="w-1/2 h-[16px] bg-zinc-300 rounded-3xl mb-2"></div>
            <div className="w-2/3 h-[16px] bg-zinc-300 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailLoader
