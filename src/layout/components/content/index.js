export default function Content({ children, ...data }) {
  return (
    <main className="app-content" id="app-content">
      {!data.boxed ? (
        <div className="app-content__inner">{children}</div>
      ) : (
        children
      )}
    </main>
  );
}
