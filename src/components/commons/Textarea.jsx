function Textarea({ id="", label="", value="", placeholder="", rows=5, onChange }) {
  return (
    <div className="">
      <label htmlFor={id} className="block mb-2 font-bold text-zinc-600">{label}</label>
      <textarea
        id={id} 
        placeholder={placeholder}
        className="w-full rounded p-3 outline-none focus:border-zinc-600 bg-zinc-50 focus:bg-zinc-100"
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  )
}

export default Textarea
