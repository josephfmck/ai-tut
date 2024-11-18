
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

import { BsDatabase } from "react-icons/bs";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default async function DatasetPage() {

    // ! Protect page
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    return (
      <div className='max-w-4xl mx-auto h-screen flex justify-center items-center'>
        <div className='w-full p-5 space-y-3'>
            <div className="flex items-center gap-2">
                <BsDatabase className='w-5 h-5'/>
                <h1>Dataset page</h1>
            </div>
            <Textarea placeholder='Add you dataset' className='h-96'/>
          <Button className="w-full">Submit</Button>
        </div>
      </div>
    );
  }
  