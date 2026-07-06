import { weatherSeasons, packingTips } from "../data/seed";

export default function Weather() {
  return (
    <>
      <div className="page-hero weather-hero">
        <h1>🌦 Gothenburg Weather</h1>
        <p>Famously unpredictable — here's how to stay comfortable all year round.</p>
      </div>

      <h2 className="section-heading">The Four Seasons</h2>
      <div className="weather-grid">
        {weatherSeasons.map((s) => (
          <div key={s.season} className="weather-card">
            <div className="weather-emoji">{s.emoji}</div>
            <h3>{s.season}</h3>
            <div className="weather-temp">{s.temp}</div>
            <p>{s.description}</p>
            <div className="weather-tip">💡 {s.tip}</div>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Packing List</h2>
      <div className="packing-grid">
        {packingTips.map((tip) => (
          <div key={tip.item} className="packing-card">
            <span className="packing-emoji">{tip.emoji}</span>
            <div>
              <strong>{tip.item}</strong>
              <p>{tip.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
