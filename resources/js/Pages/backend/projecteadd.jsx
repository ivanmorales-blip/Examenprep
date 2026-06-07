import { useEffect, useState } from "react";

export default function Register() {

    const [events, setEvents] = useState([]);

    const [form, setForm] = useState({
        name: "",
        descripcio: "",
        fechai: "",
        fechaf: ""
    });

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("descripcio", form.descripcio);
        formData.append("fecha_inicio", form.fechai);
        formData.append("fecha_fin", form.fechaf);

        const res = await fetch("/projects/add", {
            method: "POST",
            body: formData
        });

        console.log(await res.text());
    };

    return (
        <div className="p-6 flex justify-center">

            <form onSubmit={submit} className="w-full max-w-2xl grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-4 border rounded">
                
                <input type="text" placeholder="Name" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}/>

                <input type="text" placeholder="Descripcio" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, descripcio: e.target.value }))}/>

                <input type="date" placeholder="Fecha Inicio" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, fechai: e.target.value }))}/>

                <input type="date" placeholder="Fecha Fin" className="border p-3 w-full" onChange={e => setForm(prev => ({ ...prev, fechaf: e.target.value }))}/>

                <button className=" col-span-full bg-green-500 text-white py-3 rounded text-[clamp(1rem,2vw,1.1rem)]">
                    Send
                </button>

            </form>
        </div>
    );
}