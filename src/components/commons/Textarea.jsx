function Textarea({ id="", label="", value="", placeholder="", rows=5, onChange, onKeyUp, onKeyDown }) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block mb-2 font-[400] text-zinc-600"
      >{label}</label>
      <textarea
        id={id} 
        placeholder={placeholder}
        className="w-full text-sm rounded-3xl p-3 outline-none focus:border-zinc-600 bg-zinc-50 focus:bg-zinc-100"
        rows={rows}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp && onKeyUp}
        onKeyDown={onKeyDown && onKeyDown}
      ></textarea>
    </div>
  )
}

export default Textarea
