
export function InputBox({label, placeholder, onChange}) {
    return <div>
      <div className="font-popppins font-medium text-sky-500 text-left py-2">
        {label}
      </div>
      <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-cyan" />
    </div>
}