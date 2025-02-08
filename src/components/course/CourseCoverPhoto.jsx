function CourseCoverPhoto({ src }) {
  return (
    <>
      <div className="w-full h-[160pt] bg-zinc-200 relative">
        {src ? (
          <img src={src} alt="cover photo" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute top-0 bottom-0 start-0 end-0 bg-zinc-950 flex items-center justify-center">
            Photo de couverture
          </div>
        )}
      </div>
    </>
  )
}

export default CourseCoverPhoto
