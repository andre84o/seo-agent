// Settings API
// Hämta och uppdatera applikationsinställningar

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Hämta alla inställningar
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('setting_key');

    if (error) throw error;

    // Maskera känsliga värden för frontend
    const maskedData = data.map(setting => ({
      ...setting,
      setting_value: setting.is_sensitive && setting.setting_value
        ? '••••••••' + setting.setting_value.slice(-4)
        : setting.setting_value,
      actual_value: null // Skicka aldrig hela värdet till frontend
    }));

    return NextResponse.json({
      success: true,
      settings: maskedData
    });

  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST - Uppdatera en inställning
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { setting_key, setting_value } = body;

    if (!setting_key) {
      return NextResponse.json(
        { success: false, error: 'setting_key is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('settings')
      .update({ setting_value })
      .eq('setting_key', setting_key)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      setting: data
    });

  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update setting' },
      { status: 500 }
    );
  }
}

// Helper function för andra API-routes att hämta settings
export async function getSettingValue(key: string): Promise<string | null> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('settings')
      .select('setting_value')
      .eq('setting_key', key)
      .single();

    if (error) {
      console.error(`Failed to get setting ${key}:`, error);
      return null;
    }

    return data?.setting_value || null;

  } catch (error) {
    console.error('getSettingValue error:', error);
    return null;
  }
}
