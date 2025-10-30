import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    console.log('Registration API called');
    
    // Initialize Supabase client
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

    // ✅ Correct field names from frontend
    const { email, password, full_name, phone, role } = await request.json();
    
    console.log('Registering user:', { email, full_name, role, phone });

    // Validate required fields
    if (!email || !password || !full_name || !role) {
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

    // 2. Create user profile in users table
    console.log('Creating user profile...');
    const { error: profileError } = await supabase
      .from('users') // ✅ Correct table name
      .insert([
        {
          auth_id: authData.user.id, // ✅ Correct field name
          email: email.trim().toLowerCase(),
          full_name: full_name, // ✅ Correct field name
          phone: phone || '',
          role: role, // ✅ Correct field name
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return NextResponse.json(
        { error: 'Profile creation failed: ' + profileError.message }, 
        { status: 400 }
      );
    }

    console.log('User profile created successfully');

    return NextResponse.json({ 
      success: true,
      message: 'User registered successfully', 
      user: { 
        id: authData.user.id, 
        email: authData.user.email,
        full_name: full_name,
        role: role
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

export async function GET() {
  return NextResponse.json({ 
    message: 'Users registration API is working',
    timestamp: new Date().toISOString()
  });
}