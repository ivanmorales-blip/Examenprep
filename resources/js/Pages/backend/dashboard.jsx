import { useEffect, useState, useMemo } from "react";

export default function Home() {

    const [projects, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => setProject(data));

        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
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

            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold">
                    Projectes
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded w-fit"
                >
                    Logout
                </button>


            </div>

            {/* GRID */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {projects.map(project => (
        <div
            key={project.id}
            className="border rounded p-4 flex flex-col gap-2"
        >

            <h2 className="font-bold text-lg">
                {project.name}
            </h2>
        </div>
    ))}

    {tasks.map(task => (
        <div
            key={task.id}
            className="border rounded p-4 flex flex-col gap-2"
        >

            <h2 className="font-bold text-lg">
                {task.descripcio}
            </h2>
        </div>
    ))}

</div>
        </div>
    );
}