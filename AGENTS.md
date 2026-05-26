Create a Deals page in the DealsPage folder, similar to the ClientsPage. Deals Page
Deal fields: Name, Client, Description, Amount, Stage (status), Creation Date, Completion Date.
Deal statuses: New, In Progress, Completed, Canceled.
List: contains all deal fields, with the ability to sort and filter (search) by all fields. Clicking on a row opens a modal editing window.

The page component must consist of a “New Deal” Button component, a search input field, and a DataList with deal data. Clicking on a deal opens a modal window (Modal component) for editing the deal, containing a Form component with the deal values pre-filled in the input fields and a “Complete Deal” button. Clicking the “New Deal” button opens a modal window (Modal component) for creating a new deal (with a Form component). All actions involving deals must be updated in the store via the dealsSlice. Edit the dealsSlice so that when a deal is canceled, it is not removed from the list but is marked as canceled, and its background color changes to #FFF7ED. A new deal should be marked as new, with a background color of #EFF6FF. A completed deal should be marked as completed in the store, with a background color of #F0FDF4.

Refer to the types in the types folder, specifically the deal file.
The page should adapt to different screen widths

Recommendations for forms: react-hook-form + zod
For pages with forms (clients, deals, tasks, profile), it’s convenient to use a schema-based validation approach:
react-hook-form handles form data collection, error handling, and onSubmit processing.
zod defines field contracts (type, required status, formats) in one place and allows you to set normalization centrally.
If you choose this combination, connect zodResolver so that zod errors are automatically passed to react-hook-form.
Best practice:
Perform validation based on the schema, not “on the fly” in handlers. This makes errors predictable and easier to test.
For text fields (e.g., comments), it’s helpful to normalize input at the schema level: use trim() and remove spaces so that clean values are passed to the submit payload.
In edit mode, use defaultValues / reset so that the form is populated with initial data.
Display errors next to the field (under the corresponding input), and mark required fields with an asterisk in the label.

Write all utility functions in the `utils` folder in a file named `helpers`. Write common constants in the `constants.ts` file. Write form schemas in the `schemas` folder.

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
