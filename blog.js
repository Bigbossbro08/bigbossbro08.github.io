document.addEventListener("DOMContentLoaded", () => {
  // 1) configure marked → highlight.js
  marked.setOptions({
    highlight: (code, lang) => {
      const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language: validLang }).value;
    }
  });

  // 2) find the ID
  const projectId = new URLSearchParams(window.location.search).get("id");
  if (!projectId) {
    return document.getElementById("blog-content").innerHTML = "<p>Project not found.</p>";
  }

  // 3) fetch & render
  fetch("projects.json")
    .then(res => res.json())
    .then(data => {
      const project = data.projects.find(p => p.id === projectId);
      if (!project) {
        return document.getElementById("blog-content").innerHTML = "<p>Project not found.</p>";
      }

      document.getElementById("blog-title").textContent = project.title;
      document.getElementById("blog-content").innerHTML = marked.parse(project.contentMarkdown);

      // 4) highlight all code blocks
      document.querySelectorAll('#blog-content pre code').forEach(el => {
        hljs.highlightElement(el);
      });
    })
    .catch(err => {
      console.error("Error loading project data:", err);
      document.getElementById("blog-content").innerHTML = "<p>Error loading content.</p>";
    });
});