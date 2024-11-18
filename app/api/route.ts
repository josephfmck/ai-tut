// embedding route 
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

console.log(supabase);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const prompt = "Once upon a time";


  try {
    // ! create embeddings from prompt using model
    const result = await openai.embeddings.create({
      input: prompt,
      model: "text-embedding-ada-002",
    });
    console.log(result);

    const embedding = result.data[0].embedding;
    const token = result.usage.total_tokens;

    // ! insert into supabase table
    // Assuming you have a table named 'documents' in your Supabase database
    const { error} = await supabase
    .from('documents2')
    .insert([{ 
        content: prompt,
        embedding: embedding,
        token: token
    }]);

    // const embedding = result.data[0].embedding;
    // const token = result.usage.total_tokens;
  
    res.status(200).json({ result });
    // res.status(200).json({ embedding, token });
  } catch {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}