import { useEffect, useState } from "react";

export default function AdminRegistrations() {

    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetch("/admin/registrations/data", {
            credentials: "same-origin"
        })
            .then(res => res.json())
            .then(setRegistrations);
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

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-6">

                <h1 className="text-[clamp(1.3rem,2.5vw,2rem)] font-bold">
                    Registrations
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded w-fit"
                >
                    Logout
                </button>

            </div>

            {/* GRID */}
            <div className="
                grid
                gap-4
                grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
            ">

                {registrations.map(reg => (
                    <div
                        key={reg.id}
                        className="border rounded p-4 flex flex-col gap-2"
                    >

                        <p className="font-semibold">
                            {reg.name}
                        </p>

                        <p className="text-sm">
                            {reg.email}
                        </p>

                        <p className="text-sm text-gray-600">
                            {reg.event?.name}
                        </p>

                        <a
                            href={`/storage/${reg.dni_path}`}
                            className="text-blue-500 underline mt-auto"
                            target="_blank"
                        >
                            Open document
                        </a>

                    </div>
                ))}

            </div>

        </div>
    );
}