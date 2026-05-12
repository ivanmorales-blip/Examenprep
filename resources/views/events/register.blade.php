<form id="form">
    <input name="name" placeholder="Nom">
    <input name="email" type="email">
    <input type="file" name="file">

    <button type="submit">Enviar</button>
</form>

<script>
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await fetch("/api/registrations", {
        method: "POST",
        body: formData
    });

    alert("Inscripció enviada");
});
</script>