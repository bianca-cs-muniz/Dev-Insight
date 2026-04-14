const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
};

if (!env.API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não definida");
}

export { env };