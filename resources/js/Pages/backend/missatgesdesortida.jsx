import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Home() {
    const { auth } = usePage().props;
    const [missatges, setMissatges] = useState([]);
    const [user, setUSer] = useState([]);

    useEffect(() => {
        fetch("/enviados")
            .then(res => res.json())
            .then(data => setMissatges(data));
    }, []);

        useEffect(() => {
        fetch("/user")
            .then(res => res.json())
            .then(data => setUSer(data));
    }, []);

    const logout = async () => {
        await fetch("/logout", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content"),
            }
        });

        window.location.href = "/";
    };

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mensajes enviados</h1>

                <h1 className="text-xl font-bold">
                    Benvingut, {auth?.user?.name}!
                </h1>

                <Link href="/admin/dashboard" className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                        Missatges de Entrada
                </Link>

                <Link href={`/admin/addmissatge/`} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                        Enviar Missatges
                </Link>

                <form onSubmit={logout}>
                        <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                            Log out
                        </button>
                </form>
        </div>
            <table className="w-full bg-white shadow rounded">
            <thead>
            <tr className="bg-orange-100 text-left">
                <th className="p-3">Data</th>
                <th className="p-3">Per a</th>
                <th className="p-3">Asumpte</th>
            </tr>
            </thead>

            <tbody>
            {missatges.map((m) => (
                <tr key={m.id} className="border-t">
                    <span className="text-gray-700 font-medium mb-2 p-3">{m.created_at}</span>
                    <span className="text-gray-500 text-sm mb-2 p-3">{m.destinatario_id}</span>
                    <span className="text-gray-500 text-sm mb-2 p-3">{m.asunto}</span>
                </tr>))}
            </tbody>
        </table>
        </div>
    );
}