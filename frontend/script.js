async function loadProjects() {

    const response = await fetch("https://portfolio-project-gurt.onrender.com/projects");

    const projects = await response.json();

    console.log(projects);

    const projectList = document.getElementById("project-list");

    projectList.innerHTML = "";

    projects.forEach(function(project){

        projectList.innerHTML += `
        
        <div class="project-card">

            <h3>${project.title}</h3>

            <p>${project.description}</p>

        </div>
        
        `;

    });

}

loadProjects();

document.getElementById("contactForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        message: document.getElementById("message").value

    };

    const response = await fetch("https://portfolio-project-gurt.onrender.com/contact", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    const result = await response.json();

    alert(result.message);

});