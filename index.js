import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  // const countryCode = req.body.countryCode
  const cat = await getCatFacts()
  const fox = await getFox()
  const holidays = await getHolidays("FR")
  return {
    foxPicture : fox,
    catFacts : cat,
    holidays : holidays
  };
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

async function getCatFacts() {
  try {
    const response = await axios ({
      url: "https://cat-fact.herokuapp.com/facts/random?amount=3",
      method: "GET"
    })
      return response.data.map(obj => obj.text)
  } catch {
    return null
  }
}

async function getFox() {
  try {
    const response = await axios ({
      url: "https://randomfox.ca/floof",
      method: "GET"
    })
      return response.data.image
  } catch {
    return null
  }
}

async function getHolidays(countryCode) {
  try {
    const response = await axios ({
      url: "https://date.nager.at/api/v2/PublicHolidays/2021/" + countryCode,
      method: "GET"
    })
      return response.data
  } catch {
    return null
  }
}
