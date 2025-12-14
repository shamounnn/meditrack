#!/bin/bash
# Quick Start Script for MediTrack

echo "🏥 MediTrack - Quick Start Setup"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL 12+ first."
    echo "Download from: https://www.postgresql.org/download"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo "✅ PostgreSQL installed"
echo ""

# Create database
echo "📦 Creating PostgreSQL database..."
read -p "Enter PostgreSQL username (default: postgres): " PGUSER
PGUSER=${PGUSER:-postgres}
read -p "Enter PostgreSQL password: " PGPASSWORD
read -p "Enter database name (default: meditrack_db): " DBNAME
DBNAME=${DBNAME:-meditrack_db}

# Create database and run schema
psql -U $PGUSER -c "CREATE DATABASE $DBNAME;" 2>/dev/null || echo "⚠️  Database may already exist"
psql -U $PGUSER -d $DBNAME -f api/database/schema.sql || echo "❌ Failed to load schema"

# Create .env file
echo ""
echo "📝 Creating .env file for backend..."
cat > api/.env << EOF
PGHOST=localhost
PGPORT=5432
PGDATABASE=$DBNAME
PGUSER=$PGUSER
PGPASSWORD=$PGPASSWORD
PORT=4000
NODE_ENV=development
EOF
echo "✅ .env file created at api/.env"

# Install backend dependencies
echo ""
echo "📥 Installing backend dependencies..."
cd api
npm install
cd ..

# Install frontend dependencies
echo ""
echo "📥 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📖 Next Steps:"
echo "1. Start backend: cd api && npm run dev"
echo "2. In another terminal, start frontend: cd frontend && npm run dev"
echo "3. Open browser to http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Project overview"
echo "  - SETUP_MEDITRACK.md - Detailed setup guide"
echo "  - EXAMPLES.md - API usage examples"
echo ""
echo "💊 Default test users:"
echo "  - Username: john_doe, Password: (set in database)"
echo "  - Username: jane_smith, Password: (set in database)"
echo ""
echo "Happy tracking! 💊"
