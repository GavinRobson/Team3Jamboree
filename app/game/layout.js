export default function GameLayout({ children }) {
  return (
    <div>
      <main className="w-screen h-screen">{children}</main>
    </div>
  );
}
