const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
    const { data } = await axios.get(
      "http://api.quotes.phamvankhang.name.vn/random"
    );
    const quote = data.response.data.quote;
    const author = data.response.data.author;

    console.log("new quote", `"${quote}" - ${author}`);

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  fs.writeFileSync(
    "README.md",
    `
  ## Github Profile of Pham Van Khang
[![trophy](https://github-profile-trophy.vercel.app/?username=vkhangstack)](https://github.com/vkhangstack/vkhangstack)  
<img align="center" src="https://github-readme-stats.vercel.app/api/?username=vkhangstack&theme=dracula" />

  _**${quote}**_\n\n_${author}`
  );
};

generate();
