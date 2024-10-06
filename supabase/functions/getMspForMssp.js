import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { serve } from 'https://deno.land/x/sift@0.5.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const env = await config({ path: '.env.development' });


const supabase = createClient(
  env.get('REACT_APP_SUPABASE_URL')!,
  env.get('REACT_APP_SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {

      const url = new URL(req.url);
  const pathname = url.pathname; // Get the URL path
  const segments = pathname.split('/'); // Split the path to get segments

  // Assuming you have a URL like /mssp/123, where 123 is the parameter
  const msspId = segments[2]; // This would get the '123' part
    console.log(`Received MSSP ID: ${msspId}`);

  const rawQuery = `
        SELECT mssp.mssp_name, msp.msp_name
        FROM msp
        JOIN msp_mssp ON msp.msp_id = msp_mssp.msp_id
        JOIN mssp ON mssp.mssp_id = msp_mssp.mssp_id
        WHERE mssp.mssp_id=$1
  `;

  const { data, error } = await supabase.rpc('sql', {
    query: rawQuery,
    params: [msspId],
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
});
