#!/bin/bash

# SEO Agent Setup Script
# Automatisk installation och konfiguration

set -e  # Exit on error

echo "╔════════════════════════════════════════════╗"
echo "║   SEO Agent - Setup & Installation         ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Färger
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kontrollera Node.js
echo -e "${YELLOW}[1/6] Kontrollerar Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js är inte installerat!${NC}"
    echo "Installera Node.js från https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} hittades${NC}"
echo ""

# Kontrollera npm
echo -e "${YELLOW}[2/6] Kontrollerar npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm är inte installerat!${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION} hittades${NC}"
echo ""

# Installera beroenden
echo -e "${YELLOW}[3/6] Installerar npm-paket...${NC}"
npm install
echo -e "${GREEN}✓ Alla paket installerade${NC}"
echo ""

# Skapa .env.local om den inte finns
echo -e "${YELLOW}[4/6] Konfigurerar miljövariabler...${NC}"
if [ ! -f .env.local ]; then
    echo "Skapar .env.local från mall..."
    cat > .env.local << 'EOF'
# Supabase - BYTA UT DESSA MED DINA EGNA!
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PageSpeed Insights - LÄGG TILL DIN API-NYCKEL
PSI_API_KEY=AIzaSy...

# Site Configuration
SITE_URL=https://dinwebbplats.se
SITEMAP_URL=https://dinwebbplats.se/sitemap.xml
MAX_PAGES_PER_RUN=20

# Vercel Cron (valfri)
CRON_SECRET=generate-a-random-secret-here

# Google Search Console (valfritt)
# GSC_ACCESS_TOKEN=
# GSC_SITE_URL=
# GSC_CLIENT_ID=
# GSC_CLIENT_SECRET=
# GSC_REFRESH_TOKEN=
EOF
    echo -e "${GREEN}✓ .env.local skapad${NC}"
    echo -e "${YELLOW}⚠ OBS: Du måste redigera .env.local med dina API-nycklar!${NC}"
else
    echo -e "${GREEN}✓ .env.local finns redan${NC}"
fi
echo ""

# Kontrollera Supabase CLI
echo -e "${YELLOW}[5/6] Kontrollerar Supabase CLI...${NC}"
if command -v supabase &> /dev/null; then
    SUPABASE_VERSION=$(supabase --version | head -n 1)
    echo -e "${GREEN}✓ Supabase CLI ${SUPABASE_VERSION} hittades${NC}"

    echo ""
    echo -e "${YELLOW}Vill du köra database migrations nu? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Kör migrations..."
        supabase db push || echo -e "${RED}⚠ Migration misslyckades. Kör manuellt senare.${NC}"
    else
        echo "Hoppar över migrations. Kör 'supabase db push' manuellt senare."
    fi
else
    echo -e "${YELLOW}⚠ Supabase CLI är inte installerat${NC}"
    echo "För att köra migrations automatiskt, installera Supabase CLI:"
    echo "  npm install -g supabase"
    echo ""
    echo "Alternativt kan du köra migrations manuellt i Supabase Dashboard."
fi
echo ""

# Sammanfattning
echo -e "${YELLOW}[6/6] Setup komplett!${NC}"
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║           Nästa steg                       ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "1. Redigera .env.local med dina API-nycklar:"
echo "   ${YELLOW}nano .env.local${NC}"
echo ""
echo "2. Kör database migrations (om inte redan gjort):"
echo "   ${YELLOW}supabase db push${NC}"
echo "   Eller kopiera SQL från supabase/migrations/ till Supabase Dashboard"
echo ""
echo "3. Starta development server:"
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "4. Öppna i webbläsare:"
echo "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "5. Läs fullständig dokumentation:"
echo "   ${YELLOW}cat INSTALLATION.md${NC}"
echo ""
echo -e "${GREEN}✓ Lycka till med SEO-optimeringen! 🚀${NC}"
