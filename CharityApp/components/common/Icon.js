import React from "react";
import { View } from "react-native-animatable";
import { Svg, Path, Rect } from "react-native-svg";
import { COLORS } from "../../constants";

export const OrangeTick = ({ width = "20", height = "18" }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 2 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.667 10C1.667 5.4 5.4 1.667 10 1.667S18.333 5.4 18.333 10 14.6 18.333 10 18.333A8.336 8.336 0 0 1 1.667 10Zm6.666 1.808 5.492-5.491L15 7.5l-6.667 6.667L5 10.833l1.175-1.175 2.158 2.15Z"
      fill={COLORS.primary}
    />
  </Svg>
);


export const EmailIcon = ({ size = 40 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="512" height="512" rx="15%" fill="#fff" />
      <Path fill="#f2f2f2" d="M120 392V151.075h272V392" />
      <Path fillOpacity=".05" d="M256 285L120 392l-4-212" />
      <Path fill="#d54c3f" d="M120 392H97c-12 0-22-10-22-23V143h45z" />
      <Path fillOpacity=".08" d="M317 392h77V159H82" />
      <Path fill="#f2f2f2" d="M97 121h318L256 234" />
      <Path fill="#b63524" d="M392 392h23c12 0 22-10 22-23V143h-45z" />
      <Path
        fill="none"
        stroke="#de5145"
        strokeLinecap="round"
        strokeWidth="44"
        d="M97 143l159 115 159-115"
      />
    </Svg>
  );
};



export const TikTokIcon = ({ size = 20, color = 'white' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
        fill={color}
      />
    </Svg>
  );
};

const icons = { OrangeTick, EmailIcon, TikTokIcon, }
export default icons 