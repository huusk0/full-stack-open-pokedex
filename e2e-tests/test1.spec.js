const { test, describe, expect } = require("@playwright/test");

describe("Pokedex", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("");
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo.",
      ),
    ).toBeVisible();
  });
  test("pokemon page can be navigated to", async ({ page }) => {
    await page.goto("");
    // This targets the link that contains a div with the text "ivysaur"
    const ivysaurLink = page.getByRole("link", { name: /ivysaur/i });

    // 3. Click the link
    // Playwright automatically waits for the element to be "actionable" (visible and not moving)
    await ivysaurLink.click();
    await expect(page.getByText("chlorophyll")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo.",
      ),
    ).toBeVisible();
  });
});
