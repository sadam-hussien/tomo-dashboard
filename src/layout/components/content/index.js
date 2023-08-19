export default function Content({ children, ...data }) {
  return (
    <main className={data.nopadding ? "" : "app-content"} id="app-content">
      {!data.boxed ? (
        <div className="app-content__inner">{children}</div>
      ) : (
        children
      )}
    </main>
  );
}
