import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003", //"davinci:ft-personal-2023-01-27-14-02-16",
  prompt: "are you aware of the fact that you are a robit?",
  max_tokens: 100,
  n: 1,
  stop: null,
  temperature: 0.5
})

console.log(completion.data.choices[0].text);
