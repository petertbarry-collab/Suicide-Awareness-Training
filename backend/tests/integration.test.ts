import { describe, test, expect } from "bun:test";
import { api, authenticatedApi, signUpTestUser, expectStatus, connectWebSocket, connectAuthenticatedWebSocket, waitForMessage } from "./helpers";

describe("API Integration Tests", () => {
  // Shared state for chaining tests
  let initialCount: number;

  test("Get training count", async () => {
    const res = await api("/api/training/count");
    await expectStatus(res, 200);
    const data = await res.json();
    expect(data.count).toBeDefined();
    expect(typeof data.count).toBe("number");
    initialCount = data.count;
  });

  test("Register device for training", async () => {
    const res = await api("/api/training/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: "test-device-001" }),
    });
    await expectStatus(res, 200);
    const data = await res.json();
    expect(data.count).toBeDefined();
    expect(typeof data.count).toBe("number");
    expect(data.already_registered).toBe(false);
  });

  test("Register same device again - already registered", async () => {
    const res = await api("/api/training/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: "test-device-001" }),
    });
    await expectStatus(res, 200);
    const data = await res.json();
    expect(data.already_registered).toBe(true);
  });

  test("Register device without device_id - validation error", async () => {
    const res = await api("/api/training/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    await expectStatus(res, 400);
  });

  test("Verify training count increased", async () => {
    const res = await api("/api/training/count");
    await expectStatus(res, 200);
    const data = await res.json();
    expect(data.count).toBeGreaterThan(initialCount);
  });
});
