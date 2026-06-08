import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ProjectEdit({ projectId }) {

    const [form, setForm] = useState({
        name: "",
        descripcio: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    useEffect(() => {
        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(project => {
                setForm({
                    name: project.name,
                    descripcio: project.descripcio,
                    fecha_inicio: project.fecha_inicio,
                    fecha_fin: project.fecha_fin
                });
            });
    }, []);

    const submit = async (e) => {

        e.preventDefault();

        const res = await fetch(`/api/projects/${projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        console.log(await res.text());

        if (res.ok) {window.location.href = "/admin/dashboard";}
    };

    return (
        <div className="p-6 flex flex-col items-center">
             <div className="w-full max-w-2xl flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Project</h1>
                <Link href="/admin/dashboard" className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                    Tornar al menu
                </Link>
            </div>
                <div className="w-full max-w-2xl">
                <form onSubmit={submit} className="w-full max-w-2xl grid gap-4 p-4 border rounded">

                    <input type="text" value={form.name} className="border p-3" onChange={e => setForm({...form, name: e.target.value})}/>

                    <textarea value={form.descripcio} className="border p-3" onChange={e => setForm({...form, descripcio: e.target.value})}/>

                    <input type="date" value={form.fecha_inicio} className="border p-3" onChange={e => setForm({...form, fecha_inicio: e.target.value})}/>

                    <input type="date" value={form.fecha_fin} className="border p-3"onChange={e => setForm({...form,fecha_fin: e.target.value})}/>

                    <button className="bg-blue-500 text-white p-3 rounded">
                        Save Changes
                    </button>

                </form>
            </div>
        </div>
    );
}