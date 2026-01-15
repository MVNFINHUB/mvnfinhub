// js/config.js
// Security: Immutable Configuration

const config = {
    SUPABASE_URL: "https://fviufivewglglnxhlmmf.supabase.co", 
    SUPABASE_ANON_KEY: "sb_publishable_HYE7g0GyJbUfmldKTTAbeA_OUdc0Rah"
};

// Freeze to prevent tampering
Object.freeze(config);

// Pre-flight Check
if (config.SUPABASE_URL.includes("YOUR_PROJECT")) {
    console.warn("MVN FinHub: Supabase keys not set. Forms will not submit.");
}

export default config;
