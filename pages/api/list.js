// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Enables us to fetch data via terminal
 */
const config = {
  headers: { Authorization: `Bearer ALDJAK23423JKSLAJAF23423J23SAD3` },
};

const fetchData = async () => {

  const response = await fetch(
    "http://developers.gictsystems.com/api/dummy/items/",
    { method: 'GET', ...config }
  );
  const data = await response.json();
  const status = response.status;
  return { status, data }
}

export default async function handler(req, res) {

  const { status, data } = await fetchData();

  res.status(status).json(data)
}
