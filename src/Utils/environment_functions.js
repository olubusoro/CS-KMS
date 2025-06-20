export default function environ(){ if (import.meta.env.VITE_ENVIRONMENT !== "development") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  
  
}} 

export const customAlert = (msg) => { if (import.meta.env.VITE_ENVIRONMENT === "development") alert(msg); };