import React, {useState} from "react";

const CirculraProgress = () => {
  const [precentage, setPrecentage] = useState(35);
  
  const radius = 85
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * precentage) / 100
  const program = [{name:"ساعه صوم",img:"fork"},{name:"سعر",img:"fire"},{name:"خطوة",img:"footprint"},{name:"الشرب",img:"water"},{name:"النوم",img:"sleep"}]
  
  return (
    <div className="circular-progress">
      {program.map((e)=>{
        return(
          <svg
          width={100}
          height={100}
          viewBox={`0 0 ${200} ${200}`}
          >
            <defs>
              <linearGradient id="gradient">
                <stop offset="10%" stopColor ="#333333"/>
                <stop offset="50%" stopColor = "#D02049"/>
                <stop offset="100%" stopColor = "#333333"/>
              </linearGradient>
            </defs>
          <circle
          cx={200 / 2}
          cy={200 / 2}
          strokeWidth="15px" 
          r={radius}
          className="circle-background"
          />
          <circle
          cx={200 / 2}
          cy={200 / 2}
          strokeWidth="15px" 
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray:dashArray,
            strokeDashoffset:dashOffset
          }}
          transform={`rotate(-90 ${200/2} ${200/2})`}
          stroke="url(#gradient)"
          />
          <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="circle-text">
             {precentage}%
          </text>
          <image href={`/assets/images/${e.img}.svg`} height="43" width="200" x="0%" y="18%" />
          <text style={{fontSize:"1.3rem"}} x="50%" y="65%" dy="0.3em" textAnchor="middle">
             {e.name}
          </text>
          </svg>
        )
      })}
    </div>
  );
};

export default CirculraProgress;
