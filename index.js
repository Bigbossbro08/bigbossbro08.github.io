document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
      .then(response => response.json())
      .then(data => {
        const projectList = document.getElementById("project-list");
        projectList.innerHTML = ""; // Clear existing content
        
        projects = data.projects.reverse();
        projects.forEach(project => {
          const projectElement = document.createElement("div");
          projectElement.classList.add("project");
  
          projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.shortDescription}</p>
            <a href="blog.html?id=${project.id}" class="read-more">Read More</a>
          `;
  
          projectList.appendChild(projectElement);
        });
      })
      .catch(error => console.error("Error loading projects:", error));
  });