import { BarLoader } from "react-spinners"

const FullScreenLoader = ({ title }) => {
  const override = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <div className="fixed top-0 bottom-0 start-0 end-0 bg-white flex items-center justify-center">
      <div className="text-zinc-600 text-center">
        <div className="mb-5">{title}</div>
        <div className="">
          <BarLoader cssOverride={override} color="#800" />
        </div>
      </div>
    </div>
  )
}

export default FullScreenLoader
