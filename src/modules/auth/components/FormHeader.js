export default function FormHeader({ title, subtitle }) {
  return (
    <div className="auth-header">
      <h2 className="auth-header__title">{title}</h2>
      <h4 className="auth-header__subtitle mb-0">{subtitle}</h4>
    </div>
  );
}
