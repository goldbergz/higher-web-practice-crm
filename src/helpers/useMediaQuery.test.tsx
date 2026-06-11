import { renderHook } from "@testing-library/react";

import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeAll(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("returns false when query does not match", () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery("(min-width: 9999px)"));
    expect(result.current).toBe(false);
  });

  it("returns true when query matches", () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery("(max-width: 1px)"));
    expect(result.current).toBe(true);
  });

  it("subscribes and unsubscribes on mount/unmount", () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener,
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
