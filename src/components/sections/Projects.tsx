type Project = {
  name: string;
  description: string;
  stack: string[];
};

const projects: Project[] = [
  {
    name: "golden-book-rag",
    description:
      "A tool for asking questions about any PDF book, with answers cited to the page. I'm building the retrieval pipeline from scratch: chunking, embeddings, and semantic search, to learn how RAG works while improving answer accuracy and reducing hallucination.",
    stack: ["FastAPI", "Postgres/pgvector", "Gemini", "Next.js"],
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Projects
        </h2>
        <div className="flex flex-col gap-12">
          {projects.map((project) => (
            <div key={project.name} className="grid md:grid-cols-3 gap-4 md:gap-8">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
              </div>
              <div className="md:col-span-2 space-y-3">
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {project.stack.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
