import { useOutletContext } from "react-router-dom";
import { MainInfoForm, SecurityForm } from "../components";

export default function Profile() {
  const { data } = useOutletContext();

  return (
    <section className="profile-page">
      <div className="setting-input-container">
        <MainInfoForm data={data} />
      </div>

      <SecurityForm />
    </section>
  );
}
