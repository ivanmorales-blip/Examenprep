import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Home() {
    const { auth } = usePage().props;

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetch("/projects")
            .then(res => res.json())
            .then(data => setProjects(data));

        fetch("/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    // filter tasks by selected project
    const filteredTasks = selectedProject
        ? tasks.filter(t => t.project_id === selectedProject.id)
        : [];

    return (
        <div className="p-6">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projectes</h1>

                <h1 className="text-xl font-bold">
                    {auth?.user?.name}
                </h1>
            </div>

            {/* 2 PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT: PROJECTS */}
            <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold">Projects</h2>

                    <Link
                        href="/admin/addproject"
                        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                    >
                        + Add Project
                    </Link>
                </div>

                {projects.map(project => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${
                            selectedProject?.id === project.id
                                ? "bg-gray-200"
                                : ""
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{project.name}</span>
                                <a href={`/admin/editproject/${project.id}`} className="text-blue-500">
                                    Edit
                                </a>
                        </div>
                        
                        Fecha de inicio {project.fecha_inicio} - Fecha Final {project.fecha_fin}
                        {project.descripcio && (
                            <p className="text-sm text-gray-500">
                                {project.descripcio}
                            </p>
                        )}
                    </div>
                ))}
            </div>

                {/* RIGHT: TASKS */}
                <div className="border rounded p-4">
                    <h2 className="font-bold mb-4">
                        Tasks
                    </h2>

                    {!selectedProject ? (
                        <p className="text-gray-500">
                            Select a project to view tasks
                        </p>
                    ) : filteredTasks.length === 0 ? (
                        <p className="text-gray-500">
                            No tasks for this project
                        </p>
                    ) : (
                        filteredTasks.map(task => (
                            <div
                                key={task.id}
                                className="p-3 border rounded mb-2"
                            >
                                {task.descripcio}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}