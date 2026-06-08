import { useEffect, useState } from "react";

export default function Register() {

      const [users, setUser] = useState([]);
    const [form, setForm] = useState({
        asunto: "",
        mensaje: "",
        destinatario: "",
    });

        useEffect(() => {
        fetch("/user")
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("asunto", form.asunto);
        formData.append("mensaje", form.mensaje);
        formData.append("destinatario", form.destinatario);
        
        const res = await fetch("/missatges/store", {
            method: "POST",
            body: formData
        });

        console.log(await res.text());

        if (res.ok) {window.location.href = "/admin/dashboard";}
    };

    return (
        <div className="p-6 flex justify-center">

            <form onSubmit={submit} className="w-full max-w-2xl grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-4 border rounded">
                
                <input type="text" placeholder="Asunto" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, asunto: e.target.value }))}/>

                <input type="text" placeholder="mensaje" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, mensaje: e.target.value }))}/>

                <select
          onChange={e => setForm(prev => ({ ...prev, destinatario: e.target.value }))}
          className="border p-2 rounded w-64"
        >
          <option value="">Destinatario</option>
          {users.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.email}
            </option>
          ))}
        </select>

                <button className=" col-span-full bg-green-500 text-white py-3 rounded text-[clamp(1rem,2vw,1.1rem)]">
                    Send
                </button>

            </form>
        </div>
    );
}