import { visaSteps } from "../data/seed";

export default function VisaInfo() {
  return (
    <>
      <div className="page-hero visa-hero">
        <h1>🛂 Visa & Permits</h1>
        <p>Sweden's immigration process — step by step, from arrival to citizenship.</p>
      </div>
      <p className="section-note">
        Note: immigration rules change. Always verify current requirements at{" "}
        <a href="https://www.migrationsverket.se" target="_blank" rel="noreferrer">migrationsverket.se</a>.
      </p>
      <ol className="step-list">
        {visaSteps.map((step) => (
          <li key={step.id}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
