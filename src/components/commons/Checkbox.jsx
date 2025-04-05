function Checkbox({label, defaultChecked=false, id, name, value, onChange, disabled=false, title}) {
  return (
    <>
      <input type="checkbox" id={id} name={name} value={value} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} className="me-2" />
      <label htmlFor={id} className={`${!disabled ? "" : "text-zinc-600"}`}>{label}</label>
    </>
  )
}

export default Checkbox
