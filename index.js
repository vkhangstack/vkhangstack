const axios = require("axios")
const fs = require("fs").promises

// Profile data constant to avoid duplication
const PROFILE_DATA = {
  name: "Pham Van Khang",
  job: "Software Engineer",
  portfolio: "https://phamvankhang.name.vn",
  email: "phamvankhang.tvi@gmail.com",
  github: "https://github.com/vkhangstack",
  linkedin: "https://www.linkedin.com/in/vkhangstack",
  description: "Passionate Software Engineer with over 2 years of experience, specializing in backend development with Node.js and NestJS. Skilled in building robust and scalable APIs and microservices with a strong understanding of software architecture and database management. Familiar with frontend development using React.js and basic DevOps practices, including CI/CD pipelines and cloud deployment. Known for delivering efficient solutions, optimizing application performance, and collaborating effectively within Agile teams."
}

// Refactored to avoid duplicate axios calls
const fetchQuoteFromAPI = async (protocol) => {
  const url = `${protocol}://api.quotable.io/quotes/random?maxLength=50`
  const { data } = await axios.get(url)
  return data
}

const getQuote = async () => {
  try {
    let result
    try {
      result = await fetchQuoteFromAPI("https")
    } catch (error) {
      result = await fetchQuoteFromAPI("http")
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

// Extract README template generation to avoid hardcoded duplication
const generateReadmeContent = (quote, author, requestTime) => {
  return `
     ## Github Profile of Pham Van Khang
      {
        "name": "${PROFILE_DATA.name}",
        "job: "${PROFILE_DATA.job}",
        "portfolio": "${PROFILE_DATA.portfolio}",
        "email": "${PROFILE_DATA.email}",
        "github": "${PROFILE_DATA.github}",
        "linkedin": "${PROFILE_DATA.linkedin}",
        "description": "${PROFILE_DATA.description}",
        "requestTime": ${requestTime},
      }
  
  <img src="https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif" with="400px" />

  [![trophy](https://github-profile-trophy.vercel.app/?username=vkhangstack)](https://github.com/vkhangstack/vkhangstack)
  
     ${quote} - ${author}`
}

const generate = async () => {
  let { quote, author } = await getQuote()
  const requestTime = Date.now()
  if (!quote) {
    quote = "Fail many times. You will success!"
    author = "vkhangstack"
  }

  const readmeContent = generateReadmeContent(quote, author, requestTime)
  fs.writeFileSync("README.md", readmeContent)
}

generate()
