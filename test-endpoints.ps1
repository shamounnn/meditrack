# MediTrack API Endpoint Testing Script
$baseUrl = "http://localhost:4000"

Write-Host "=== Testing MediTrack API Endpoints ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "   ✓ Health Check: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Health Check failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Get All Users
Write-Host "2. Testing GET /api/users..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Get
    Write-Host "   ✓ Found $($response.Count) user(s)" -ForegroundColor Green
    if ($response.Count -gt 0) {
        Write-Host "   First user: $($response[0].username)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Create a Test User
Write-Host "3. Testing POST /api/users (Create User)..." -ForegroundColor Yellow
$testUser = @{
    username = "testuser_$(Get-Random -Minimum 1000 -Maximum 9999)"
    email = "test_$(Get-Random -Minimum 1000 -Maximum 9999)@example.com"
    passwordHash = "testpassword123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Post -Body $testUser -ContentType "application/json"
    $testUserId = $response.userId
    Write-Host "   ✓ User created: $($response.username) (ID: $testUserId)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testUserId = $null
}
Write-Host ""

# Test 4: Get User by ID
if ($testUserId) {
    Write-Host "4. Testing GET /api/users/:userId..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$testUserId" -Method Get
        Write-Host "   ✓ User retrieved: $($response.username)" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 5: Get All Medications
Write-Host "5. Testing GET /api/medications..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/medications" -Method Get
    Write-Host "   ✓ Found $($response.Count) medication(s)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Create Medication (if we have a user)
if ($testUserId) {
    Write-Host "6. Testing POST /api/medications (Create Medication)..." -ForegroundColor Yellow
    $testMedication = @{
        userId = $testUserId
        name = "Test Aspirin"
        dosage = "500mg"
        pillsPerBox = 30
        currentPills = 25
        sideEffects = "Stomach upset"
        lowStockThreshold = 5
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/medications" -Method Post -Body $testMedication -ContentType "application/json"
        $testMedicationId = $response.medicationId
        Write-Host "   ✓ Medication created: $($response.name) (ID: $testMedicationId)" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $testMedicationId = $null
    }
    Write-Host ""
}

# Test 7: Get User Medications
if ($testUserId) {
    Write-Host "7. Testing GET /api/users/:userId/medications..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$testUserId/medications" -Method Get
        Write-Host "   ✓ Found $($response.Count) medication(s) for user" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 8: Get All Schedules
Write-Host "8. Testing GET /api/schedules..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/schedules" -Method Get
    Write-Host "   ✓ Found $($response.Count) schedule(s)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 9: Get All Alerts
Write-Host "9. Testing GET /api/alerts..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/alerts" -Method Get
    Write-Host "   ✓ Found $($response.Count) alert(s)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Complete ===" -ForegroundColor Cyan

