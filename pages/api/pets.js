import connectToPetClient from "../../util/connect-to-pet-client";

async function handler(req, res) {
  const client = connectToPetClient();
  let resp;
  try {
    resp = await client.animal.search({ limit: 8 });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
    });
  }

  return res.status(200).json({
    message: "Fetched Pets",
    pets: resp.data.animals,
  });
}

export default handler;
