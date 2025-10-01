import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: services, error } = await supabase.from("services").select("*").eq("is_active", true).order("name")

    if (error) {
      console.error("[v0] Error fetching services:", error)
      return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
    }

    return NextResponse.json({ services })
  } catch (error) {
    console.error("[v0] Error in services route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
