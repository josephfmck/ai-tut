import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { createClient } from '../../utils/supabase/server'; // Import the server-side Supabase client


// init openAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
    
    // ! Protect route
    // Create a server-side Supabase client
    const supabase = await createClient();

    // Retrieve the authenticated user
    const { data: { user }, error } = await supabase.auth.getUser();


    // If there's an error or no user is found, return 401 Unauthorized
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // ! Sending request to the server
    const request = await req.json();

    // check valid request
    if(!request?.text) {
        return NextResponse.json({
            message: "Invalid request missing key"
            },
            {status: 422}
        );        
    }


    try {
        //! Call to OpenAI - generate embedding
            // input text were sending
        const result = await openai.embeddings.create({
            input: request.text,
            model: "text-embedding-ada-002"
        });

        const embedding = result.data[0].embedding;
        const token = result.usage.total_tokens;
    
    
        // ! returning the response from the server
        return NextResponse.json({
            token,
            embedding
        });
    } catch(err) {
        return NextResponse.json({
            message: "Error in generating embedding"
            },
            {status: 500}
        );
    } 
}