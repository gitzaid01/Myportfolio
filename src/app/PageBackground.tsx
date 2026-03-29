// // components/PageBackground.tsx
// "use client";

// import { useEffect, useRef } from "react";

// function RulerBar({ axis }: { axis: "top" | "left" }) {
//   const isTop = axis === "top";
//   const ticks = Array.from({ length: isTop ? 120 : 80 }, (_, i) => i);

//   return (
//     <div
//       aria-hidden="true"
//       className="fixed z-50 pointer-events-none select-none"
//       style={
//         isTop
//           ? { top: 0, left: 0, right: 0, height: 20 }
//           : { top: 0, left: 0, bottom: 0, width: 20 }
//       }
//     >
//       <div className="absolute inset-0" style={{ background: "rgba(9,9,11,0.92)" }} />
//       <div
//         className="absolute"
//         style={
//           isTop
//             ? { bottom: 0, left: 0, right: 0, height: 1, background: "rgba(139,92,246,0.3)" }
//             : { top: 0, right: 0, bottom: 0, width: 1, background: "rgba(139,92,246,0.3)" }
//         }
//       />
//       {ticks.map((i) => {
//         const isMajor = i % 8 === 0;
//         const pos = i * 16;
//         if (isTop) {
//           return (
//             <div
//               key={i}
//               className="absolute bottom-0"
//               style={{
//                 left: pos,
//                 width: 1,
//                 height: isMajor ? 10 : 5,
//                 background: isMajor ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.2)",
//               }}
//             >
//               {isMajor && i > 0 && (
//                 <span
//                   className="absolute font-mono"
//                   style={{ fontSize: 7, color: "rgba(139,92,246,0.55)", top: -11, left: 2, whiteSpace: "nowrap" }}
//                 >
//                   {i}
//                 </span>
//               )}
//             </div>
//           );
//         }
//         return (
//           <div
//             key={i}
//             className="absolute right-0"
//             style={{
//               top: pos,
//               height: 1,
//               width: isMajor ? 10 : 5,
//               background: isMajor ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.2)",
//             }}
//           >
//             {isMajor && i > 0 && (
//               <span
//                 className="absolute font-mono"
//                 style={{ fontSize: 7, color: "rgba(139,92,246,0.55)", left: -14, top: 1, whiteSpace: "nowrap" }}
//               >
//                 {i}
//               </span>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function PageBackground() {
//   return (
//     <>
//       {/* Full-page grid — fixed so it covers everything including scroll */}
//       <div
//         aria-hidden="true"
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             repeating-linear-gradient(
//               90deg,
//               rgba(139,92,246,0.05) 0px,
//               rgba(139,92,246,0.05) 1px,
//               transparent 1px,
//               transparent 1rem
//             ),
//             repeating-linear-gradient(
//               180deg,
//               rgba(139,92,246,0.05) 0px,
//               rgba(139,92,246,0.05) 1px,
//               transparent 1px,
//               transparent 1rem
//             )
//           `,
//         }}
//       />

//       {/* Fixed rulers that persist on scroll */}
//       <RulerBar axis="top" />
//       <RulerBar axis="left" />

//       {/* Corner cap — covers the 20×20 intersection */}
//       <div
//         aria-hidden="true"
//         className="fixed top-0 left-0 z-50 pointer-events-none"
//         style={{
//           width: 20,
//           height: 20,
//           background: "rgba(9,9,11,0.92)",
//           borderRight: "1px solid rgba(139,92,246,0.3)",
//           borderBottom: "1px solid rgba(139,92,246,0.3)",
//         }}
//       />
//     </>
//   );
// }