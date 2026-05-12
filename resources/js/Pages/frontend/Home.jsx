import { useEffect, useState } from "react";

export default function Home() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        fetch("/api/events")
            .then(res => res.json())
            .then(data => setEvents(data));

    }, []);

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                Events
            </h1>

            <table className="w-full border">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {events.map(event => (

                        <tr key={event.id}>

                            <td>{event.name}</td>

                            <td>{event.date}</td>

                            <td>{event.short_description}</td>

                            <td>
                                <a
                                    href={`/register/${event.id}`}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Register
                                </a>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}