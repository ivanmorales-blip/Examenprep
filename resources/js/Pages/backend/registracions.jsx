import { useEffect, useState } from "react";

export default function Registrations() {

    const [registrations, setRegistrations] = useState([]);

    const [filters, setFilters] = useState({
        event_name: "",
        date: ""
    });

    const loadData = async () => {

        const params = new URLSearchParams(filters);

        const response = await fetch(
            `/api/admin/registrations?${params}`,
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        setRegistrations(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                Registrations
            </h1>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Event name"
                    className="border p-2"
                    onChange={e =>
                        setFilters({
                            ...filters,
                            event_name: e.target.value
                        })
                    }
                />

                <input
                    type="date"
                    className="border p-2"
                    onChange={e =>
                        setFilters({
                            ...filters,
                            date: e.target.value
                        })
                    }
                />

                <button
                    onClick={loadData}
                    className="bg-blue-500 text-white px-4"
                >
                    Filter
                </button>

            </div>

            <table className="w-full border">

                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>DNI</th>
                    </tr>
                </thead>

                <tbody>

                    {registrations.map(reg => (

                        <tr key={reg.id}>

                            <td>{reg.event.name}</td>

                            <td>{reg.event.date}</td>

                            <td>{reg.name}</td>

                            <td>{reg.email}</td>

                            <td>
                                <a
                                    href={`/storage/${reg.document_path}`}
                                    target="_blank"
                                >
                                    Download
                                </a>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}