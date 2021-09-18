const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
    const { data } = await axios.get(
      "https://quotes.rest/qod?language=en&quot;"
    );
    const quote = data.contents.quotes[0].quote;
    const author = data.contents.quotes[0].author;

    console.log("new quote", `"${quote}"`);

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

<p align="center">
<img width="20%" src="https://github.com/vkhang-stack/vkhang-stack/blob/master/zebra.png"/>
</p>


- 🔭 I'm **Student** | **Coder** |**Hate code**
- 🌱 Currently Learning **JavaScript**, **Web Development**
- 👯 Willing to contribute more and more in **Open Source Projects**
- ⚡ Hobbies: Reading Book, listening to music, playing game League of Legends

### 💬📫 Feel Free to Contact me.....

<p align="center">
	<a href="https://github.com/vkhangstack"><img alt="github" width="10%" style="padding:5px" src="https://img.icons8.com/clouds/100/000000/github.png"/></a>
	<a href="https://www.facebook.com/vkhang.pvkteam/"><img alt="facebook" width="10%" style="padding:5px" src="https://img.icons8.com/clouds/100/000000/facebook-new.png"/></a>
	<a href="https://twitter.com/hx10r"><img alt="twitter" width="10%" style="padding:5px" src="https://img.icons8.com/clouds/100/000000/twitter.png"/></a>
</p>

  _**${quote}**_\n\n_${author}`
  );
};

generate();
