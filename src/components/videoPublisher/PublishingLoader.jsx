import { DotLoader, HashLoader, BarLoader, PropagateLoader } from "react-spinners"

const PublishingLoader = () => {
  const override = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
      <div className="text-zinc-600 text-center">
        <div className="mb-5">Publication en cours</div>
        <div className="">
          <BarLoader cssOverride={override} color="#800" />
        </div>
      </div>
    </div>
  )
}

export default PublishingLoader
