import { supabase } from "@/app/supabase/page";



export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Error during registration:", error.message);
    throw error; 
  }

  return data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await supabase.auth.signInWithPassword({ email, password });

  if (response.error) {
    throw response.error; 
  }

  return response; 
};