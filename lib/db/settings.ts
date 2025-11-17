// Settings Helper Functions
// Hämta applikationsinställningar från databasen

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Hämta en enskild inställning
 *
 * Prioritet för API-nycklar (känsliga): .env.local först, sedan DB
 * Prioritet för övriga inställningar: DB först, sedan .env.local
 *
 * @param key - Setting key att hämta
 * @param fallbackEnvKey - Namn på env variable att använda som fallback
 * @param prioritizeEnv - Om true, använd .env.local först (för känsliga API-nycklar)
 */
export async function getSetting(
  key: string,
  fallbackEnvKey?: string,
  prioritizeEnv: boolean = false
): Promise<string | null> {
  try {
    // För API-nycklar: Prioritera .env.local
    if (prioritizeEnv && fallbackEnvKey && process.env[fallbackEnvKey]) {
      console.log(`Using env variable ${fallbackEnvKey} for sensitive setting ${key}`);
      return process.env[fallbackEnvKey]!;
    }

    // Hämta från databas
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('settings')
      .select('setting_value')
      .eq('setting_key', key)
      .single();

    if (error) {
      console.warn(`Failed to get setting ${key} from DB:`, error.message);
      // Fallback till env variable
      if (fallbackEnvKey && process.env[fallbackEnvKey]) {
        console.log(`Using fallback env variable ${fallbackEnvKey}`);
        return process.env[fallbackEnvKey]!;
      }
      return null;
    }

    // Om DB-värde finns, använd det. Annars fallback till env
    if (data?.setting_value) {
      return data.setting_value;
    }

    // Fallback till env variable om DB-värde är tomt
    if (fallbackEnvKey && process.env[fallbackEnvKey]) {
      console.log(`DB value empty for ${key}, using env variable ${fallbackEnvKey}`);
      return process.env[fallbackEnvKey]!;
    }

    return null;

  } catch (error) {
    console.error('getSetting error:', error);
    // Fallback till env variable
    if (fallbackEnvKey && process.env[fallbackEnvKey]) {
      return process.env[fallbackEnvKey]!;
    }
    return null;
  }
}

/**
 * Hämta alla inställningar som ett objekt
 */
export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('settings')
      .select('setting_key, setting_value');

    if (error) {
      console.error('Failed to get all settings:', error);
      return {};
    }

    const settings: Record<string, string> = {};
    data?.forEach(row => {
      if (row.setting_value) {
        settings[row.setting_key] = row.setting_value;
      }
    });

    return settings;

  } catch (error) {
    console.error('getAllSettings error:', error);
    return {};
  }
}

/**
 * Uppdatera en inställning
 */
export async function updateSetting(key: string, value: string): Promise<boolean> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from('settings')
      .update({ setting_value: value })
      .eq('setting_key', key);

    if (error) {
      console.error(`Failed to update setting ${key}:`, error);
      return false;
    }

    return true;

  } catch (error) {
    console.error('updateSetting error:', error);
    return false;
  }
}
