import React, { useState, useEffect } from "react";
import { Pack, Pie } from "@potion/layout";
import { Svg, Circle, Arc } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      {/*  <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg> */}

      <Svg width={400} height={400}>
        <Pie
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          id={datum => datum.id}
          sort={(a, b) => a.id - b.id}
          nodeEnter={d => ({ ...d, startAngle: d.endAngle })}
          animate
        >
          {nodes =>
            nodes.map(({ startAngle, endAngle, key }, i) => {
              if (i < colors.length) {
                  return (
                    <Arc
                      key={key}
                      innerRadius={0}
                      outerRadius={100}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={colors[i].code.hex}
                      stroke="white"
                      strokeWidth={1}
                    />
                  
                  )
              }
              
            })
          }
        </Pie>
      </Svg>
    </div>
  );
};

export default Bubbles;
