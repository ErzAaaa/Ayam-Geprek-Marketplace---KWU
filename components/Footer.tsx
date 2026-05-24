export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 text-center text-sm opacity-70">
        &copy; {new Date().getFullYear()} Ayam Geprek Merakyat. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
