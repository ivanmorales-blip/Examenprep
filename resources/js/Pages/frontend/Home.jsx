import { useEffect, useState } from "react";

export default function Home() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => setEvents(data));
    }, []);

    return (
        <div className="p-6">

            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

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

            {/* GRID TABLE REPLACEMENT */}
            <div className="
                grid
                gap-4
                grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
            ">

                {events.map(event => (
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

        </div>
    );
}