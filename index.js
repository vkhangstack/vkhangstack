const axios = require("axios")
const fs = require("fs")

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://quotes.phamvankhang.name.vn/random?licenseKey=7caee3c11313efe8bbd2ccd6f48a341d479b3d3b751052f630678799554240ca")
    console.log(data)
    const quote = data.data.content
    const author = data.data.author

    console.log("new quote", `"${quote}" - ${author}`)

    return {
      quote,
      author,
    }
  } catch (err) {
    console.error(err.message)
    return {}
  }
}

const generate = async () => {
  const { quote, author } = await getQuote()

  if (!quote) return

  fs.writeFileSync(
    "README.md",
    `
     ## Github Profile of Pham Van Khang
      {
        "name": "Pham Van Khang",
        "job: "Fullstack Developer",
        "portfolio": "https://phamvankhang.name.vn",
        "email": "phamvankhang.tvi@gmail.com",
        "github": "https://github.com/vkhangstack",
        "linkedin": "https://www.linkedin.com/in/vkhangstack",
        "description": "As a dynamic person and interested in learning a lot of new 
        knowledge, I wanna improve my English language and programming skills to 
        become a professional developer.",
      }
  
  <img src="https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif" with="400px" />

  [![trophy](https://github-profile-trophy.vercel.app/?username=vkhangstack)](https://github.com/vkhangstack/vkhangstack)
  
  <img align="center" src="https://github-readme-stats.vercel.app/api/?username=vkhangstack&theme=dracula" />

     ${quote} - ${author}`
  )
}

generate()
