import { describe, it, expect, beforeEach } from "vitest";
import { useUiStore } from "./ui";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ sidebarOpen: false });
  });

  it("starts with sidebar closed", () => {
    expect(useUiStore.getState().sidebarOpen).toBe(false);
  });

  it("setSidebarOpen updates state", () => {
    useUiStore.getState().setSidebarOpen(true);
    expect(useUiStore.getState().sidebarOpen).toBe(true);
  });

  it("toggleSidebar flips state", () => {
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarOpen).toBe(true);
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarOpen).toBe(false);
  });
});
