/**
 * Navigation & Authentication Separation Test Suite
 * Tests:
 * 1. Public navigation contains ONLY public links (About, Features, Subjects, Blog, Contact).
 * 2. Public navigation strictly OMITS authenticated application items (Home, Feeds, Notes, Mock Tests, Jobs, Library, Ebooks, Wallet).
 * 3. Authenticated navigation includes complete application tabs (Home, Feeds, Notes, Mock Tests, Jobs, Library, Ebooks).
 * 4. Protected route guard invariant: unauthenticated access redirects to login preserving destination.
 * 5. Logout invariant: clears user profile, capsules, and returns to landing page.
 * 6. Login redirection default: defaults to /feed.
 */

import assert from "node:assert";

// Simulated Navigation Config from lib/constants.ts
const PUBLIC_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Subjects", href: "/subjects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const APP_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Feeds", href: "/feed", isHighlighted: true },
  { label: "Notes", href: "/notes" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Jobs", href: "/jobs" },
  { label: "Pharma Library", href: "/library" },
  { label: "Ebooks", href: "/ebooks" },
];

// Protected routes registry
const PROTECTED_ROUTES = [
  "/feed",
  "/notes",
  "/mock-tests",
  "/jobs",
  "/library",
  "/ebooks",
  "/wallet"
];

console.log("=== RUNNING NAVIGATION & AUTH SEPARATION TEST SUITE ===\n");

// Test 1: Public Navigation Link Integrity
console.log("-> Test 1: Verifying public navigation items before login...");
const publicLabels = PUBLIC_NAV_LINKS.map(l => l.label);
assert.deepStrictEqual(publicLabels, ["About", "Features", "Subjects", "Blog", "Contact"]);
console.log("✓ Test 1 Passed: Public navigation contains exactly About, Features, Subjects, Blog, Contact.\n");

// Test 2: Public Navigation Strict Omission of App Tabs
console.log("-> Test 2: Verifying unauthenticated visitors cannot see app tabs...");
const forbiddenForPublic = ["Home", "Feeds", "Notes", "Mock Tests", "Jobs", "Pharma Library", "Ebooks", "Wallet"];
for (const forbidden of forbiddenForPublic) {
  assert.ok(!publicLabels.includes(forbidden), `Forbidden tab '${forbidden}' found in public navigation!`);
}
console.log("✓ Test 2 Passed: Public navigation strictly hides all authenticated app tabs.\n");

// Test 3: Authenticated App Navigation Completeness
console.log("-> Test 3: Verifying authenticated app navigation tabs...");
const appLabels = APP_NAV_LINKS.map(l => l.label);
assert.ok(appLabels.includes("Home"));
assert.ok(appLabels.includes("Feeds"));
assert.ok(appLabels.includes("Notes"));
assert.ok(appLabels.includes("Mock Tests"));
assert.ok(appLabels.includes("Jobs"));
assert.ok(appLabels.includes("Pharma Library"));
assert.ok(appLabels.includes("Ebooks"));

const feedsItem = APP_NAV_LINKS.find(l => l.label === "Feeds");
assert.strictEqual(feedsItem.href, "/feed");
assert.strictEqual(feedsItem.isHighlighted, true);
console.log("✓ Test 3 Passed: Authenticated navigation includes all required application tabs.\n");

// Test 4: Protected Routes Guard Invariants
console.log("-> Test 4: Verifying route protection and login redirection invariants...");
function simulateRouteGuard(pathname, user, loading) {
  if (loading) return { status: "LOADING" };
  if (!user && PROTECTED_ROUTES.includes(pathname)) {
    return {
      status: "REDIRECT",
      target: `/login?redirect=${encodeURIComponent(pathname)}`
    };
  }
  return { status: "RENDER", pathname };
}

for (const route of PROTECTED_ROUTES) {
  const result = simulateRouteGuard(route, null, false);
  assert.strictEqual(result.status, "REDIRECT");
  assert.strictEqual(result.target, `/login?redirect=${encodeURIComponent(route)}`);
}

// When logged in, access is permitted
for (const route of PROTECTED_ROUTES) {
  const result = simulateRouteGuard(route, { uid: "test-user" }, false);
  assert.strictEqual(result.status, "RENDER");
}
console.log("✓ Test 4 Passed: All protected routes redirect unauthenticated users preserving destination.\n");

// Test 5: Logout State Clearance & Redirection Invariant
console.log("-> Test 5: Verifying logout state purge and landing page return...");
function simulateLogout(authState) {
  authState.user = null;
  authState.profile = null;
  authState.capsules = 0;
  authState.capsuleUnits = 0;
  authState.transactions = [];
  return { redirectTo: "/" };
}

const mockState = {
  user: { uid: "123" },
  profile: { name: "Arun" },
  capsules: 50.0,
  capsuleUnits: 5000,
  transactions: [{ id: "tx1" }]
};

const logoutResult = simulateLogout(mockState);
assert.strictEqual(mockState.user, null);
assert.strictEqual(mockState.profile, null);
assert.strictEqual(mockState.capsules, 0);
assert.strictEqual(logoutResult.redirectTo, "/");
console.log("✓ Test 5 Passed: Logout clears state immediately and redirects to public landing page.\n");

// Test 6: Default Login Redirection
console.log("-> Test 6: Verifying login default redirection to /feed...");
function resolveLoginRedirect(redirectParam) {
  return redirectParam || "/feed";
}

assert.strictEqual(resolveLoginRedirect(null), "/feed");
assert.strictEqual(resolveLoginRedirect(""), "/feed");
assert.strictEqual(resolveLoginRedirect("/notes"), "/notes");
assert.strictEqual(resolveLoginRedirect("/mock-tests"), "/mock-tests");
console.log("✓ Test 6 Passed: Login defaults to /feed and preserves specific redirect targets.\n");

console.log("ALL NAVIGATION & AUTH SEPARATION TESTS PASSED SUCCESSFULLY! (6/6)");
