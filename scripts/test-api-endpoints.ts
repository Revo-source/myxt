// Comprehensive API endpoint testing script
// Run this to verify all endpoints are working correctly

interface TestResult {
  endpoint: string
  method: string
  status: "PASS" | "FAIL" | "SKIP"
  statusCode?: number
  error?: string
  responseTime?: number
}

const API_BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const results: TestResult[] = []

// Helper function to make authenticated requests
async function makeRequest(
  endpoint: string,
  method = "GET",
  body?: any,
  headers: Record<string, string> = {},
): Promise<TestResult> {
  const startTime = Date.now()

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const responseTime = Date.now() - startTime

    return {
      endpoint,
      method,
      status: response.ok ? "PASS" : "FAIL",
      statusCode: response.status,
      responseTime,
    }
  } catch (error) {
    return {
      endpoint,
      method,
      status: "FAIL",
      error: error instanceof Error ? error.message : "Unknown error",
      responseTime: Date.now() - startTime,
    }
  }
}

// Test suite
async function runTests() {
  console.log("🧪 Starting API endpoint tests...\n")

  // Test 1: Public endpoints (no auth required)
  console.log("📋 Testing public endpoints...")

  results.push(await makeRequest("/api/tracks", "GET"))
  results.push(await makeRequest("/api/tracks?limit=5", "GET"))
  results.push(await makeRequest("/api/streams", "GET"))
  results.push(await makeRequest("/api/streams?live=true", "GET"))
  results.push(await makeRequest("/api/users/testuser", "GET"))

  // Test 2: Protected endpoints (should return 401)
  console.log("🔒 Testing protected endpoints (should return 401)...")

  results.push(await makeRequest("/api/tracks", "POST", { title: "Test Track" }))
  results.push(await makeRequest("/api/analytics", "GET"))
  results.push(await makeRequest("/api/files", "GET"))

  // Test 3: Invalid endpoints (should return 404)
  console.log("❌ Testing invalid endpoints (should return 404)...")

  results.push(await makeRequest("/api/nonexistent", "GET"))
  results.push(await makeRequest("/api/tracks/invalid-id", "GET"))

  // Test 4: Malformed requests (should return 400)
  console.log("⚠️ Testing malformed requests (should return 400)...")

  results.push(await makeRequest("/api/tracks", "POST", {})) // Missing required fields
  results.push(await makeRequest("/api/analytics/track", "POST", {})) // Missing event type

  // Performance tests
  console.log("⚡ Testing response times...")

  const performanceTest = await makeRequest("/api/tracks?limit=20", "GET")
  results.push(performanceTest)

  // Generate report
  console.log("\n📊 Test Results Summary:")
  console.log("========================")

  const passed = results.filter((r) => r.status === "PASS").length
  const failed = results.filter((r) => r.status === "FAIL").length
  const avgResponseTime =
    results.filter((r) => r.responseTime).reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length

  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📈 Average Response Time: ${avgResponseTime.toFixed(2)}ms`)

  console.log("\n📋 Detailed Results:")
  results.forEach((result) => {
    const status = result.status === "PASS" ? "✅" : "❌"
    const time = result.responseTime ? `(${result.responseTime}ms)` : ""
    console.log(`${status} ${result.method} ${result.endpoint} - ${result.statusCode} ${time}`)
    if (result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })

  // Performance warnings
  const slowRequests = results.filter((r) => (r.responseTime || 0) > 1000)
  if (slowRequests.length > 0) {
    console.log("\n⚠️ Slow Requests (>1s):")
    slowRequests.forEach((r) => {
      console.log(`   ${r.method} ${r.endpoint}: ${r.responseTime}ms`)
    })
  }

  return { passed, failed, avgResponseTime }
}

// Run the tests
runTests()
  .then((summary) => {
    console.log("\n🎯 Test Summary:")
    console.log(`Success Rate: ${((summary.passed / (summary.passed + summary.failed)) * 100).toFixed(1)}%`)

    if (summary.failed === 0) {
      console.log("🎉 All tests passed! API is functioning correctly.")
    } else {
      console.log("🔧 Some tests failed. Please review the issues above.")
    }
  })
  .catch(console.error)
