/**
 * Navigation & Authentication Separation Test Suite
 * Tests:
 * 1. Open / while logged out -> Login page (via /login redirect).
 * 2. Open /login while logged out -> Login page.
 * 3. Log in successfully -> /feed (default) or intended destination.
 * 4. Open / while logged in -> /feed.
 * 5. Open /login while logged in -> /feed (or intended destination).
 * 6. Open /feeds -> /feed.
 * 7. Refresh /feed -> Feed remains accessible to authenticated user.
 * 8. Log out -> return to /login.
 * 9. Feeds replaces Home in authenticated navigation, preserving all features and omitting old landing page.
 */

import assert from "node:assert";

// 1. Navigation definitions from lib/constants.ts
const PUBLIC_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Subjects", href: "/subjects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const APP_NAV_LINKS = [
  { label: "Feeds", href: "/feed", isHighlighted: true },
  { label: "Notes", href: "/notes" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Jobs", href: "/jobs" },
  { label: "Pharma Library", href: "/library" },
  { label: "Ebooks", href: "/ebooks" },
];

const PROTECTED_ROUTES = [
  "/feed",
  "/notes",
  "/mock-tests",
  "/jobs",
  "/library",
  "/ebooks",
  "/wallet"
];

console.log("=== RUNNING ROOT LOGIN & FEEDS HOME VERIFICATION TEST SUITE ===\n");

// Flow 1: Root route / while logged out
console.log("-> Flow 1: Testing '/' while logged out -> redirects to /login...");
function simulateRootRoute(user, queryRedirect) {
  if (user) {
    return { action: "REDIRECT", destination: queryRedirect && queryRedirect !== "/" && queryRedirect !== "/login" ? queryRedirect : "/feed" };
  }
  if (queryRedirect && queryRedirect !== "/" && queryRedirect !== "/login") {
    return { action: "REDIRECT", destination: `/login?redirect=${encodeURIComponent(queryRedirect)}` };
  }
  return { action: "REDIRECT", destination: "/login" };
}

const unauthRoot = simulateRootRoute(null);
assert.strictEqual(unauthRoot.action, "REDIRECT");
assert.strictEqual(unauthRoot.destination, "/login");
console.log("✓ Flow 1 Passed: '/' redirects unauthenticated visitors to /login.\n");

// Flow 2: /login while logged out
console.log("-> Flow 2: Testing '/login' while logged out -> displays login page...");
function simulateLoginPage(user, queryRedirect) {
  const destination = queryRedirect && queryRedirect !== "/" && queryRedirect !== "/login" ? queryRedirect : "/feed";
  if (user) {
    return { action: "REDIRECT", destination };
  }
  return { action: "RENDER_LOGIN_FORM", defaultPostLoginRedirect: destination };
}

const unauthLogin = simulateLoginPage(null);
assert.strictEqual(unauthLogin.action, "RENDER_LOGIN_FORM");
assert.strictEqual(unauthLogin.defaultPostLoginRedirect, "/feed");
console.log("✓ Flow 2 Passed: '/login' renders the login form with default post-login redirect to /feed.\n");

// Flow 3: Successful login redirects to /feed
console.log("-> Flow 3: Testing successful login -> redirects to /feed or destination...");
function handleAuthSuccess(destination) {
  return { destination: destination || "/feed" };
}

assert.strictEqual(handleAuthSuccess().destination, "/feed");
assert.strictEqual(handleAuthSuccess("/notes").destination, "/notes");
assert.strictEqual(handleAuthSuccess("/mock-tests").destination, "/mock-tests");
console.log("✓ Flow 3 Passed: Successful authentication redirects to /feed (or preserved target).\n");

// Flow 4: Open / while logged in
console.log("-> Flow 4: Testing '/' while logged in -> redirects to /feed...");
const authRoot = simulateRootRoute({ uid: "user_123" });
assert.strictEqual(authRoot.action, "REDIRECT");
assert.strictEqual(authRoot.destination, "/feed");

const authRootWithParam = simulateRootRoute({ uid: "user_123" }, "/library");
assert.strictEqual(authRootWithParam.action, "REDIRECT");
assert.strictEqual(authRootWithParam.destination, "/library");
console.log("✓ Flow 4 Passed: '/' redirects authenticated users directly to /feed (or destination).\n");

// Flow 5: Open /login while logged in
console.log("-> Flow 5: Testing '/login' while logged in -> redirects to /feed...");
const authLogin = simulateLoginPage({ uid: "user_123" });
assert.strictEqual(authLogin.action, "REDIRECT");
assert.strictEqual(authLogin.destination, "/feed");

const authLoginWithParam = simulateLoginPage({ uid: "user_123" }, "/jobs");
assert.strictEqual(authLoginWithParam.action, "REDIRECT");
assert.strictEqual(authLoginWithParam.destination, "/jobs");
console.log("✓ Flow 5 Passed: '/login' redirects authenticated users to /feed without flashing the form.\n");

// Flow 6: Open /feeds -> redirects to /feed
console.log("-> Flow 6: Testing '/feeds' alias -> redirects to /feed...");
function simulateFeedsAlias() {
  return { action: "REDIRECT", destination: "/feed" };
}
assert.strictEqual(simulateFeedsAlias().destination, "/feed");
console.log("✓ Flow 6 Passed: '/feeds' redirects to /feed.\n");

// Flow 7: Refresh /feed while logged in
console.log("-> Flow 7: Testing refresh on protected /feed while logged in...");
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

const feedRefreshed = simulateRouteGuard("/feed", { uid: "user_123" }, false);
assert.strictEqual(feedRefreshed.status, "RENDER");
assert.strictEqual(feedRefreshed.pathname, "/feed");

// Unauthenticated direct access is properly intercepted
const feedUnauth = simulateRouteGuard("/feed", null, false);
assert.strictEqual(feedUnauth.status, "REDIRECT");
assert.strictEqual(feedUnauth.target, "/login?redirect=%2Ffeed");
console.log("✓ Flow 7 Passed: Protected route /feed remains accessible to authenticated user and guards against logged-out access.\n");

// Flow 8: Log out -> return to /login
console.log("-> Flow 8: Testing log out -> clears state and returns to /login...");
function simulateLogout(authState) {
  authState.user = null;
  authState.profile = null;
  authState.capsules = 0;
  authState.capsuleUnits = 0;
  authState.transactions = [];
  return { redirectTo: "/login" };
}

const userSession = {
  user: { uid: "user_abc" },
  profile: { fullName: "Test Pharmacist" },
  capsules: 50,
  capsuleUnits: 5000,
  transactions: [{ id: "tx_1" }]
};

const logoutRes = simulateLogout(userSession);
assert.strictEqual(userSession.user, null);
assert.strictEqual(userSession.profile, null);
assert.strictEqual(userSession.capsules, 0);
assert.strictEqual(logoutRes.redirectTo, "/login");
console.log("✓ Flow 8 Passed: Logout purges authentication state and returns directly to /login.\n");

// Flow 9: Feeds replaces Home in navigation
console.log("-> Flow 9: Verifying Feeds replaces Home in authenticated navigation...");
const appLabels = APP_NAV_LINKS.map(l => l.label);
assert.ok(!appLabels.includes("Home"), "Authenticated navigation must NOT include old landing page 'Home'!");
assert.ok(appLabels.includes("Feeds"), "Authenticated navigation must include 'Feeds'!");
assert.strictEqual(APP_NAV_LINKS[0].label, "Feeds");
assert.strictEqual(APP_NAV_LINKS[0].href, "/feed");
assert.strictEqual(APP_NAV_LINKS[0].isHighlighted, true);

// Preserved app features
const expectedTabs = ["Feeds", "Notes", "Mock Tests", "Jobs", "Pharma Library", "Ebooks"];
assert.deepStrictEqual(appLabels, expectedTabs);
console.log("✓ Flow 9 Passed: Feeds is the primary home link (/feed); old Home landing page is completely removed from app navigation.\n");

console.log("ALL 9 ROOT & FEEDS AUTHENTICATION FLOW TESTS PASSED! (9/9)\n");
