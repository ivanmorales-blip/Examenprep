import { useEffect, useState, useMemo } from "react";

export default function Home() {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => setEvents(data));
    }, []);

    // 🔍 FILTER LOGIC (name + date + both)
    const filteredEvents = useMemo(() => {
        if (!search.trim()) return events;

        const query = search.toLowerCase();

        return events.filter(event => {
            const nameMatch = event.name.toLowerCase().includes(query);
            const dateMatch = event.date.toLowerCase().includes(query);

            return nameMatch || dateMatch;
        });
    }, [events, search]);

    return (
        <div className="p-6">

            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold">
                    Events
                </h1>

                <a
                    href="/login"
                    className="bg-black text-white px-4 py-2 rounded w-fit"
                >
                    Admin Login
                </a>

            </div>

            {/* 🔎 SEARCH BAR */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or date (e.g. 2026-06 or Laravel)"
                    className="
                        w-full
                        max-w-xl
                        border
                        rounded
                        px-4
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-blue-400
                    "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* GRID */}
            <div className="
                grid
                gap-4
                grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
            ">

                {filteredEvents.map(event => (
                    <div
                        key={event.id}
                        className="border rounded p-4 flex flex-col gap-2"
                    >

                        <h2 className="font-bold text-lg">
                            {event.name}
                        </h2>

                        <p className="text-sm text-gray-600">
                            {event.date}
                        </p>

                        <p className="text-sm">
                            {event.short_description}
                        </p>

                        <a
                            href={`/register/${event.id}`}
                            className="bg-blue-500 text-white px-3 py-2 rounded text-center mt-auto"
                        >
                            Register
                        </a>

                    </div>
                ))}

            </div>

            {/* NO RESULTS */}
            {filteredEvents.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    No events found.
                </p>
            )}

        </div>
    );
}