const axios = require("axios")
const fs = require("fs")

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://api.quotable.io/quotes/random?maxLength=50")
    console.log(data)
    const quote = data[0].content
    const author = data[0].author

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
        "job: "Software Engineer",
        "portfolio": "https://phamvankhang.name.vn",
        "email": "phamvankhang.tvi@gmail.com",
        "github": "https://github.com/vkhangstack",
        "linkedin": "https://www.linkedin.com/in/vkhangstack",
        "description": "I have 2 years of work experience in Software Development. 
        I have experience and am strong at Software, Web Applications, and Restful API using Nodejs. 
        I am experienced in integrating automation tests and deploying applications into Continuous Integration and Jenkins.
        Build project and check security project.",
      }
  
  <img src="https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif" with="400px" />

  [![trophy](https://github-profile-trophy.vercel.app/?username=vkhangstack)](https://github.com/vkhangstack/vkhangstack)
  
  <img align="center" src="https://github-readme-stats.vercel.app/api/?username=vkhangstack&theme=dracula" />

     ${quote} - ${author}`
  )
}

generate()
