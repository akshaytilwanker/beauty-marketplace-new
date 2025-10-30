import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password, name, userType } = await request.json();

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    // 2. Create user profile in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          full_name: name,
          user_type: userType,
          created_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      // If profile creation fails, we should handle cleanup
      console.error('Profile creation error:', profileError);
      return NextResponse.json({ error: 'Profile creation failed' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'User registered successfully', 
      user: { id: authData.user.id, email: authData.user.email } 
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}