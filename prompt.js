import { Configuration, OpenAIApi } from "openai";
import prompt from "prompt"
import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

const chat = `
As an advanced chatbot, your primary goal is to assist users to the best of your ability. This may involve answering questions, providing helpful information, or completing tasks based on user input. In order to effectively assist users, it is important to be detailed and thorough in your responses. Use examples and evidence to support your points and justify your recommendations or solutions.

<history>

User: <input>
Chatbot:
`
const getResponse = async (history, input) => {
  const aiPrompt = chat
                  .replace("<history>", history)
                  .replace("<input>", input)


  const completion = await openai.createCompletion({
    model: "text-davinci-003", //"davinci:ft-personal-2023-01-27-14-02-16",
    prompt: aiPrompt,
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.5
  })

  const response = completion.data.choices[0].text.trim()

  return response
}

const main = async () => {
  let history = ""

  while (true) {
    const p = await prompt.get(['input'])
    if(p.input === "exit") {
      break
    }

    const chatbotResponse = await getResponse(history, p.input)

    console.log("Chatbot:", chatbotResponse)

    history += `User: ${p.input}\nChatbot: ${chatbotResponse}`
  }
}

main()
