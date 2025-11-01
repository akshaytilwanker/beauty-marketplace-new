import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ✅ Load from environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Guard clause for missing config
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Key in environment variables");
  throw new Error("Supabase environment variables not set correctly.");
}

// ✅ Create Supabase client

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("❌ Supabase signup error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "✅ User registered successfully", data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Server error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
