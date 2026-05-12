<!DOCTYPE html>
<html>
<head>
    <title>Events</title>
</head>
<body>
<a href="{{ route('login') }}">
    <button>Login admin</button>
</a>
<h1>Events</h1>

<table border="1">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Data</th>
            <th>Descripció</th>
            <th>Acció</th>
        </tr>
    </thead>

    <tbody id="events-table"></tbody>
</table>

<script>
fetch("/api/events")
    .then(res => res.json())
    .then(events => {
        const table = document.getElementById("events-table");

        events.forEach(event => {
            table.innerHTML += `
                <tr>
                    <td>${event.name}</td>
                    <td>${event.date}</td>
                    <td>${event.short_description}</td>
                    <td>
                        <a href="/register/${event.id}">Inscriure's</a>
                    </td>
                </tr>
            `;
        });
    });
</script>

</body>
</html>