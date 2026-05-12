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

        // 🔥 CRITICAL FIX HERE
        if (form.document instanceof File) {
            formData.append("document", form.document);
        } else {
            console.error("No valid file selected:", form.document);
            alert("Please select a valid file");
            return;
        }

        const res = await fetch("/api/registrations", {
            method: "POST",
            body: formData
        });

        const text = await res.text();
        console.log("RESPONSE:", text);
    };

    return (
        <div className="p-10">
            <form onSubmit={submit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            name: e.target.value
                        }))
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            email: e.target.value
                        }))
                    }
                />

                <select
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            event_id: e.target.value
                        }))
                    }
                >
                    <option value="">Select event</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>

                {/* 🔥 FIXED FILE INPUT */}
                <input
                    type="file"
                    accept=".jpg,.pdf"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;

                        console.log("Selected file:", file);

                        setForm(prev => ({
                            ...prev,
                            document: file
                        }));
                    }}
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