/* eslint-disable @typescript-eslint/no-explicit-any */
export const Envs = (() => {
  if (typeof window !== 'undefined' && (window as any).__ENV__) {
    return (window as any).__ENV__;
  }

  return {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  };
})();

console.log(process.env.NEXT_PUBLIC_API_URL);
console.log(Envs.NEXT_PUBLIC_API_URL);