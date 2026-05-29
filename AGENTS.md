Rewrite the `renderClientsReport` function on the `ReportsPage` so that the tab displays the following reports:

1. New Clients Report: The number of new clients added during a specific period (week, month, or quarter). Report fields: Client ID, Client Name, Company, Date Added.
2. Client Activity Report: Information regarding client interactions (number of deals, completed tasks). Report fields: Client ID, Client Name, Number of Deals, Completed Tasks.

Structure this similarly to `renderSalesReport`, but with the different reports listed above. Define the functions for calculating client activity and new clients separately within the `helpers` file. Retrieve the necessary data from the `store`—specifically `createSlice`, `dealsSlice`, and `tasksSlice`.

Since the client reports do not require any highlighting for list items, there is no need to add CSS classes for such styling.

For each report, buttons for exporting data to PDF and XLSX formats should be available.

For the report lists, use the existing DataList component, which includes filtering capabilities; simply pass the necessary data to it. For the buttons, use the existing Button component. Additionally, create a separate component for the dropdown list so that it can be reused with different data sets.

Write all utility functions in the `utils` folder in a file named `helpers`. Write common constants in the constants folder. Write form schemas in the `schemas` folder. Refer to the types in the `types` folder.
If necessary, utilize existing helper functions within the files helpers, formaters and constants, and modify them as needed. Do not create a new function that exactly or nearly duplicates one that already exists.

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
