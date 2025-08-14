export default function Footer() {
  return (
    <footer className="mt-10 pb-6 text-center text-xs text-white/60">
      <p>
        © {new Date().getFullYear()} SmartTodo • Built with Next.js & Django
      </p>
    </footer>
  );
}
