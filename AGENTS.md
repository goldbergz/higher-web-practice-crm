Update the logic for saving user data within `userSlice` and utilize this user data in the relevant components. The TypeScript types for the user can be found in `src/types/user.ts`.
Users should be able to register, and their details must be persisted in the Redux store. Upon both login and registration, the user's data is saved in the store under the `currentUser` field (of type `UserProfile`). The current user's data should be displayed on the `ProfilePage` and in the sidebar menu—specifically, the user's avatar (using the `Avatar` component) and the account name within the `<span className={styles.userName}>{accName}</span>` element.

The user profile page must include functionality to edit user details (ProfileForm). This includes changing/adding a profile picture, updating first and last names, changing the account username, updating the password, and deleting the account. All changes made to the current user's data must be synchronized with the store.
When a user account is deleted, it should be removed from the store, and the user should be redirected to the login page.
For form validation on the user data editing form, use the schema located at `src/utils/schemas/profileSchema.ts`.

For now, do not implement the logic for asynchronous actions or server requests.

Write all utility functions that participate in the business logic in the `utils` folder src/utils. Write common constants in the constants folder src/utils/constants. Write form schemas in the `schemas` folder src/utils/schemas. Write all auxiliary functions in the folder src/helpers. Refer to the types in the `types` folder src/types.
If necessary, utilize existing helper functions within the files helpers, formaters and constants, and modify them as needed. Do not create a new function that exactly or nearly duplicates one that already exists.

Recommendations for Forms: react-hook-form + zod
For pages containing forms (Clients, Deals, Tasks, Profile), it is convenient to utilize schema-based validation:
`react-hook-form` handles the collection of form values, error management, and `onSubmit` processing.
`zod` defines the field contract—including types, required status, and formats—in a single location, and allows for centralized input normalization.
If you choose this combination, integrate `zodResolver` so that `zod` errors are automatically passed to `react-hook-form`.
Recommended Best Practices:
Perform validation via a schema rather than "inline" within your event handlers. This makes errors predictable and easier to test.
For text-based fields (e.g., comments), it is beneficial to normalize the input at the schema level—using methods like `trim()` and whitespace removal—to ensure that the final submission payload contains clean values.
In "edit" mode, use `defaultValues` or `reset` to pre-populate the form with the initial data.
Display validation errors directly adjacent to the relevant field (typically beneath the corresponding input), and mark required fields with an asterisk (\*) within their labels.

Coding Style
All code is formatted using Prettier.
All imports are sorted.
All HTML attributes are sorted.
ESLint is configured in the project and does not return any errors.
All variables in the project are written in CamelCase and reflect the meaning of the content.
All types in the project are named consistently and placed in a separate file.
If necessary, types are divided into separate files for each module.
Git commits must be meaningful and follow naming conventions.
The project repository has a well-formatted README.md.
Comments in the code must be meaningful and used only when it is impossible to describe behavior through variable and function names.
All console.log, alert, and debugger statements used during debugging have been removed.
There is no commented-out code in the project.
There are no inline styles, and the “!important” rule is not used.
There are no emojis or emoticons in the code, comments, or commit names.
The layout has no semantic errors. Appropriate tags are used for elements. For example, all links must be formatted using `<a />`, and all forms using `<form />`, etc.
The project code does not cause errors or warnings in the browser console.
