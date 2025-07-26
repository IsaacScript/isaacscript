const FIRST_DOC_PAGE_TITLES = new Set([
  "Features | IsaacScript",
  "isaac-typescript-definitions | IsaacScript",
  "isaacscript-common | IsaacScript",
]);

const KEY_MAP = new Map([
  ["ArrowLeft", navigateBackward],
  ["ArrowRight", navigateForward],
]);

main();

function main() {
  document.addEventListener("keydown", (event) => {
    // Do not do anything if we have any modifier keys pressed down.
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }

    // Do not do anything if we have the search box focused.
    if (isSearchBarFocused()) {
      return;
    }

    const keyFunction = KEY_MAP.get(event.key);
    if (keyFunction !== undefined) {
      keyFunction();
    }
  });
}

/** @returns {boolean} */
function isSearchBarFocused() {
  // eslint-disable-next-line unicorn/prefer-spread
  const searchInputElements = Array.from(
    document.querySelectorAll(".DocSearch-Input"),
  );
  return (
    document.activeElement !== null
    && searchInputElements.includes(document.activeElement)
  );
}

function navigateBackward() {
  if (isOnLandingPage()) {
    return;
  }

  if (isOnFirstDocPage()) {
    clickOnNavBarTitle();
    return;
  }

  clickFirstNavButton();
}

function navigateForward() {
  if (isOnLandingPage()) {
    clickOnFirstLandingPageButton();
    return;
  }

  if (isOnFirstDocPage()) {
    clickFirstNavButton();
    return;
  }

  clickSecondNavButton();
}

function isOnLandingPage() {
  const titles = document.querySelectorAll(".hero__title");
  return titles.length > 0;
}

function isOnFirstDocPage() {
  return FIRST_DOC_PAGE_TITLES.has(document.title);
}

function clickOnNavBarTitle() {
  const navBarTitles = document.querySelectorAll(".navbar__title");
  const navBarTitle = navBarTitles[0];
  if (navBarTitle !== undefined && navBarTitle instanceof HTMLElement) {
    navBarTitle.click();
  }
}

function clickOnFirstLandingPageButton() {
  const largeButtons = document.querySelectorAll(".button--lg");
  const largeButton = largeButtons[0];
  if (largeButton !== undefined && largeButton instanceof HTMLElement) {
    largeButton.click();
  }
}

function clickFirstNavButton() {
  clickNavButton(0);
}

function clickSecondNavButton() {
  clickNavButton(1);
}

/** @param {number} i */
function clickNavButton(i) {
  const navButtonsCollection = document.querySelectorAll(".pagination-nav");
  const navButtons = navButtonsCollection[0];
  if (navButtons === undefined) {
    return;
  }

  const buttonDiv = navButtons.children[i];
  if (buttonDiv === undefined) {
    return;
  }

  const buttonLink = buttonDiv.children[0];
  if (buttonLink !== undefined && buttonLink instanceof HTMLElement) {
    buttonLink.click();
  }
}
