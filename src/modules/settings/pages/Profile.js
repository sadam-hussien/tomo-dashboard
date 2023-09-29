import { MainInfoForm, SecurityForm } from "../components";

export default function Profile() {
  return (
    <section className="profile-page">
      <div className="setting-input-container">
        <MainInfoForm />
      </div>

      <SecurityForm />
    </section>
  );
}
