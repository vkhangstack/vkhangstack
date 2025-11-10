const axios = require("axios")
const fs = require("fs").promises

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://api.quotable.io/quotes/random?maxLength=50")
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
  let { quote, author } = await getQuote()
  const requestTime = Date.now()
  if (!quote) {
    quote = "Fail many times. You will success!"
    author = "vkhangstack"
  }

  const readmeContent = `
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

  try {
    await fs.writeFile("README.md", readmeContent)
    console.log("README.md updated successfully")
  } catch (err) {
    console.error("Error writing README.md:", err.message)
    throw err
  }
}

generate()
