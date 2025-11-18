@echo off
echo Running AI system migration...
echo.

REM Du måste ha PostgreSQL installerat och psql i PATH
REM Eller installera det via: winget install PostgreSQL.PostgreSQL

psql "postgresql://postgres.mjxjxwlxbtdralhdpodo:YourPasswordHere@aws-0-eu-central-1.pooler.supabase.com:6543/postgres" -f "supabase/migrations/20250117000000_ai_system.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Migration completed successfully!
) else (
    echo.
    echo ❌ Migration failed. Check errors above.
)

pause
