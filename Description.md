# Main description

- [Main description](#main-description)
- [Selectors vs Locators](#selectors-vs-locators)
- [General working of locators](#general-working-of-locators)
- [Code and practice with locators](#code-and-practice-with-locators)
- [Detailed look on locators](#detailed-look-on-locators)
- [Basics and _Good Practices_](#basics-and-good-practices)

# Selectors vs Locators

1. Selectors are patterns or expression used for identification on or more elements on the webpage
   **The most popular selectors are:**

- CSS Selectors (example): "#id-label-element"
- XPath selectors (example): "//\*[id='id-label-element']"

2. Locator is an object which stores selector and allows us for perform interactions with the selector
   Example of code:
   ```typescript
   const elementLocator = page.locator(selector); // <-- declare locator by assigning selector to it
   await elementLocator.click(); // <-- interact with the locator (example - clicking in the selected element)
   ```

# General working of locators

**To work with locators**

1. Assign selector to locator
2. When assigned we can perform action on selector as described in **"Selectors vs Locators"** section pt no 2.

# Code and practice with locators

**Different selectors and locators to interact with element selectors**:

1. High level methods in Playwright - getBy...
   1. The High level methods do not needs selectors for locators creation as shown below - examples only
   ```typescript
   // 1. get element by alt text:
   const locatorByAltText = page.getByAltText('Image alt text');
   // 2. get element by label text:
   const locatorByLabelText = page.getByLabelText('Some text for label');
   // 3. get element by placeholder:
   const locatorByPlaceholder = page.getByAltPlaceholder('Enter your name');
   // 4. get element by role:
   const elementByRole = page.getByAltRole('checkbox');
   // 5. get element by test ID:
   const locatorByTestId = page.getByTestId('label-text');
   // 6. get element by text:
   const locatorByText = page.getByText('Some text for label');
   // 7. get element by title:
   const locatorByTitle = page.getByTitle('Title for label');
   ```
2. Lower level methods in Playwright - page.locators(<selector>)
   1. The lower level methods in Playwright needs selectors to create locators as shown on the example below
   ```typescript
   //1. CSS locator
   const selectorCSS = '#id-label-element';
   const locatorFromCss = page.locator(selectorCSS);
   //2. XPath locator
   const selectorXPath = "//\*[id='id-label-element']";
   const locatorFromPath = page.locator(selectorXPath);
   ```

# Detailed look on locators

For that section look to for the tests in both files [*css_xpath-locators.spec.ts*, *getBy-locators.spec.ts*]

# Basics and _Good Practices_

1. For selectors use attributes as: data-test-id, testid or id
   - Those selectors should be unique for elements
   - They increase speed and make easier of finding elements on web pages
2. If these attributes do not exists in code than:
   - Think with team about introduce them into code
   - If introducing of that attributes won't be possible than think about using other unique attributes
3. Take care of uniqueness of elements attributes
   - It will directly find the elements we want yo use to interact
4. Use carefully high level methods of Playwright
   - getVyText(), getByRole()m etc.
   - They can be not enough precise
   - Better is to use attributes as data-testid or id (recommended)
5. Use carefully selectors which refers to parents as below
   - .form-container [data-test-id="submit-button"]
   - They are dependent of webpage structure and they can be not stable
