import "./App.css";
import CrewAIAgentOrchestrator from "./CrewAIAgentOrchestrator";

function App() {
  return (
    <div className="relative">
      <CrewAIAgentOrchestrator />

      {/* <div className="absolute -top-60 -right-60">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 508 542"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[500px] h-[541px] overflow-visible blur-[200px]"
        >
          <ellipse
            cx="253.804"
            cy="270.822"
            rx="116.918"
            ry="255.455"
            transform="rotate(40.017 253.804 270.822)"
            fill="url(#paint0_linear_591_3689)"
          ></ellipse>
          <defs>
            <linearGradient
              id="paint0_linear_591_3689"
              x1="138.318"
              y1="30.4923"
              x2="381.708"
              y2="36.7518"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3C8943"></stop>
              <stop offset="1" stopColor="#3C8943"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div> */}
    </div>
  );
}

export default App;
