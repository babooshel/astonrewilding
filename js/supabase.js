import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://oxfjqbubrjykkargsnpl.supabase.co',    // replace with your Supabase project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmpxYnVicmp5a2thcmdzbnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDM0ODMsImV4cCI6MjA4NTM3OTQ4M30.ZaI44w7oR6D9s0A4mogi_dPunbnA8Ry65IogGNK_cdw'        // replace with your Supabase public anon key
);