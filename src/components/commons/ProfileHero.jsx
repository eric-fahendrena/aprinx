function ProfileHero() {
  return (
    <div className="h-[160px] relative">
      <div className="h-2/3 bg-zinc-950 text-white">
        <div className="container mx-auto">
          <div className="p-5">
            <div className="text-2xl font-bold py-1">Tojo Guitariste</div>
            <div className="text-sm text-zinc-400">@tojo_guitariste</div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-end justify-end p-5">
        <div className="w-[80pt] h-[80pt] bg-zinc-600 rounded-full"></div>
      </div>
    </div>
  )
}

export default ProfileHero
