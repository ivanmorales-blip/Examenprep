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
            .then(setEvents);
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("event_id", form.event_id);

        if (form.document instanceof File) {
            formData.append("document", form.document);
        }

        const res = await fetch("/api/registrations", {
            method: "POST",
            body: formData
        });

        console.log(await res.text());
    };

    return (
        <div className="p-6 flex justify-center">

            <form
                onSubmit={submit}
                className="
                    w-full
                    max-w-2xl
                    grid
                    gap-4
                    grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
                    p-4
                    border
                    rounded
                "
            >

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-3 w-full"
                    onChange={e =>
                        setForm(prev => ({ ...prev, name: e.target.value }))
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 w-full"
                    onChange={e =>
                        setForm(prev => ({ ...prev, email: e.target.value }))
                    }
                />

                <select
                    className="border p-3 w-full col-span-full"
                    onChange={e =>
                        setForm(prev => ({ ...prev, event_id: e.target.value }))
                    }
                >
                    <option value="">Select event</option>
                    {events.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    className="col-span-full"
                    onChange={e =>
                        setForm(prev => ({
                            ...prev,
                            document: e.target.files?.[0] || null
                        }))
                    }
                />

                <button
                    className="
                        col-span-full
                        bg-green-500
                        text-white
                        py-3
                        rounded
                        text-[clamp(1rem,2vw,1.1rem)]
                    "
                >
                    Send
                </button>

            </form>

        </div>
    );
}