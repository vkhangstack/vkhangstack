const axios = require("axios")
const fs = require("fs")

const getQuote = async () => {
  try {
    let result
    try {
      let { data } = await axios.get("https://api.quotable.io/quotes/random?maxLength=50")
      result = data
    } catch (error) {
      let { data } = await axios.get("http://api.quotable.io/quotes/random?maxLength=50")
      result = data
    }
    const quote = result[0].content
    const author = result[0].author

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
  let { quote, author } = await getQuote()
  const requestTime = Date.now()
  if (!quote) {
    quote = "Fail many times. You will success!"
    author = "vkhangstack"
  }

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
        "description": "Passionate Software Engineer with over 2 years of experience, specializing in backend development with Node.js and NestJS.
         Skilled in building robust and scalable APIs and microservices with a strong understanding of software architecture and database management.
         Familiar with frontend development using React.js and basic DevOps practices, including CI/CD pipelines and cloud deployment.
         Known for delivering efficient solutions, optimizing application performance, and collaborating effectively within Agile teams.",
        "requestTime": ${requestTime},
      }
  
  <img src="https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif" with="400px" />

  [![trophy](https://github-profile-trophy.vercel.app/?username=vkhangstack)](https://github.com/vkhangstack/vkhangstack)
  
     ${quote} - ${author}`
  )
}

generate()
