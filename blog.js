document.addEventListener("DOMContentLoaded", function () {
    // Get query parameter for project ID
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
  
    if (!projectId) {
      document.getElementById("blog-content").innerHTML = "<p>Project not found.</p>";
      return;
    }
  
    // Fetch project data from JSON file
    fetch("projects.json")
      .then(response => response.json())
      .then(data => {
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
          // Use Marked.js to convert markdown to HTML
          const blogHTML = marked.parse(project.contentMarkdown);
          document.getElementById("blog-title").textContent = project.title;
          document.getElementById("blog-content").innerHTML = blogHTML;
        } else {
          document.getElementById("blog-content").innerHTML = "<p>Project not found.</p>";
        }
      })
      .catch(error => {
        console.error("Error loading project data:", error);
        document.getElementById("blog-content").innerHTML = "<p>Error loading content.</p>";
      });
  });