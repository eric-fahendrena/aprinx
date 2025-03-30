function InputNumber({ id="", label="", onChange, value="", placeholder="", error=false, helper="" }) {
  return (
    <div className="">
      <label htmlFor={id} className="block mb-2 font-bold text-zinc-600">{label}</label>
      <input 
        id={id} 
        type="number" 
        placeholder={placeholder} 
        className={`w-full rounded-3xl p-3 ${error ? "bg-red-50" : ""} outline-none focus:border-zinc-600 bg-zinc-50 focus:bg-zinc-100`}
        value={value}
        onChange={onChange}
      />
      {helper && (
        <div className="text-red-600 text-xs pt-2">{helper}</div>
      )}
    </div>
  )
}

export default InputNumber
