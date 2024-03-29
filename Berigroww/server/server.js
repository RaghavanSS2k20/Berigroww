import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
  
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'application setup succesful'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt)
    const response = await openai.createCompletion({
     model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    
    
    res.status(500).send(error || 'Something went wrong');
  }
})

// <<<<<<< HEAD
// app.listen(8082, () => console.log('AI server started on http://localhost:8082'))
// =======
// app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
// >>>>>>> origin/master
