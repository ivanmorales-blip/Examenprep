import { useEffect, useState } from "react";

export default function Register() {

    const [events, setEvents] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        event_id: "",
        document: null
    });

    useEffect(() => {

        fetch("/api/events")
            .then(res => res.json())
            .then(data => setEvents(data));

    }, []);

    const submit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("event_id", form.event_id);
        formData.append("document", form.document);

        await fetch("/api/registrations", {
            method: "POST",
            body: formData
        });

        alert("Registration saved");
    };

    return (
        <div className="p-10">

            <form
                onSubmit={submit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full"
                    onChange={e =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={e =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <select
                    className="border p-2 w-full"
                    onChange={e =>
                        setForm({
                            ...form,
                            event_id: e.target.value
                        })
                    }
                >
                    <option>Select event</option>

                    {events.map(event => (
                        <option
                            key={event.id}
                            value={event.id}
                        >
                            {event.name}
                        </option>
                    ))}

                </select>

                <input
                    type="file"
                    onChange={e =>
                        setForm({
                            ...form,
                            document: e.target.files[0]
                        })
                    }
                />

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Send
                </button>

            </form>

        </div>
    );
}