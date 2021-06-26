// Constants
const FIRST_DOC_PAGE_TITLE = "Features | IsaacScript";

// Variables
const keyMap = new Map();

document.onkeydown = (e) => {
  // Debugging
  // console.log("Key pressed:", e.key);

  // Do not do anything if we have any modifier keys pressed down
  if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
    return;
  }

  // Do not do anything if we have the search box focused
  const searchInputElements =
    document.getElementsByClassName("DocSearch-Input");
  for (const searchInputElement of searchInputElements) {
    if (document.activeElement === searchInputElement) {
      return;
    }
  }

  const keyFunction = keyMap.get(e.key);
  if (keyFunction !== undefined) {
    keyFunction();
  }
};

// Click on the first button
keyMap.set("Enter", () => {
  if (isOnLandingPage()) {
    clickOnFirstLargeButton();
  }
});

// Navigate backwards
keyMap.set("ArrowLeft", () => {
  if (isOnFirstDocPage()) {
    // Click on the nav bar title
    const navBarTitle = document.getElementsByClassName("navbar__title");
    if (navBarTitle.length >= 1) {
      navBarTitle[0].click();
      return;
    }
  }

  // Click on the left-most button
  const buttons = document.getElementsByClassName("pagination-nav__link");
  if (buttons.length >= 1) {
    buttons[0].click();
  }
});

// Navigate forwards
keyMap.set("ArrowRight", () => {
  if (isOnLandingPage()) {
    clickOnFirstLargeButton();
    return;
  }

  // Otherwise, assume that we are on a doc page
  const buttons = document.getElementsByClassName("pagination-nav__link");
  if (buttons.length >= 2) {
    buttons[1].click();
  } else if (buttons.length >= 1) {
    buttons[0].click();
  }
});

function isOnLandingPage() {
  const titles = document.getElementsByClassName("hero__title");
  return titles.length >= 1;
}

function isOnFirstDocPage() {
  return document.title === FIRST_DOC_PAGE_TITLE;
}

function clickOnFirstLargeButton() {
  const largeButtons = document.getElementsByClassName("button--lg");
  if (largeButtons.length >= 1) {
    largeButtons[0].click();
  }
}
