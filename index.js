const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
    const { data } = await axios.get(
      "https://stage-api-quotes.herokuapp.com/api/query?quote=random"
    );
    const quote = data.quote;
    const author = data.author;

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
  ## Hi there,👋👋 I'm Pham Van Khang 
  
<img align="center" src="https://github-readme-stats.vercel.app/api/?username=vkhangstack&theme=dracula" />

  _**${quote}**_\n\n_${author}`
  );
};

generate();
