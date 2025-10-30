import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    console.log('Registration API called');
    
    // Initialize Supabase client inside the function (runtime)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { email, password, name, userType } = await request.json();
    
    console.log('Registering user:', { email, name, userType });

    // Validate required fields
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      );
    }

    // 1. Create user in Supabase Auth
    console.log('Creating Supabase auth user...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password,
    });

    if (authError) {
      console.error('Auth error:', authError.message);
      return NextResponse.json(
        { error: authError.message }, 
        { status: 400 }
      );
    }

    if (!authData.user) {
      console.error('No user data returned from auth');
      return NextResponse.json(
        { error: 'User creation failed - no user data returned' }, 
        { status: 400 }
      );
    }

    console.log('Auth user created:', authData.user.id);

    // 2. Create user profile in profiles table
    console.log('Creating user profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email.trim().toLowerCase(),
          full_name: name,
          user_type: userType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      
      // Try to clean up the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json(
        { error: 'Profile creation failed: ' + profileError.message }, 
        { status: 400 }
      );
    }

    console.log('User profile created successfully');

    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'User registered successfully', 
      user: { 
        id: authData.user.id, 
        email: authData.user.email,
        name: name,
        userType: userType
      } 
    }, { status: 201 });

  } catch (error) {
    console.error('Unexpected registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message }, 
      { status: 500 }
    );
  }
}

// Optional: Add GET method to check if API is working
export async function GET() {
  return NextResponse.json({ 
    message: 'Users registration API is working',
    timestamp: new Date().toISOString()
  });
}