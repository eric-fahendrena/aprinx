import { useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";

function LazyObserver({ onInView }) {
  const element = useRef()
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onInView && onInView()
      }
    })
  })

  useEffect(() => {
    observer.observe(element.current)
  }, [])

  return (
    <div className="h-[24pt] flex items-center justify-center" ref={element}>
      <PulseLoader color="#800" size={8} />
    </div>
  )
}

export default LazyObserver
