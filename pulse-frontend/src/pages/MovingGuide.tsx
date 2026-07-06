import { movingSteps } from "../data/seed";

export default function MovingGuide() {
  return (
    <>
      <div className="page-hero moving-hero">
        <h1>📦 Moving to Gothenburg</h1>
        <p>Eight essential steps to get settled — in the right order.</p>
      </div>
      <ol className="step-list">
        {movingSteps.map((step) => (
          <li key={step.id}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
