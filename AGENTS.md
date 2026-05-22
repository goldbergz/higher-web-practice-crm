In the `store` folder, add the application state using Redux Toolkit.
The following slices should be included: user, transactions, clients, tasks.
Define the state (actions, reducers, selectors, slices) based on the page functionality:
1. Home Page
General project information—name, brief description (USP).
Login form:
email;
password;
“Log In” button — if the login credentials match, the user is redirected to the home page;
“Sign Up” button — redirects to the “Sign Up” page.
2. Registration Page
Registration form:
email;
password;
name;
“Register” button — we verify that the email is unique and the password is valid.
Section functionality: if validation passes, we register the user.
3. Dashboard
Display of summary information and statistics:
Number of clients: today’s total, added today, added this week, added this month, added this quarter.
Number of active deals: today’s total, added today, added this week, added this month.
Number of completed deals: today’s total, added today, added this week, added this month.
The 10 most active clients involved in the majority of the current user’s deals.
The current user’s last 10 active deals.
The current user’s last 10 tasks.
Buttons for quick access to sections:
Add client.
Add transaction.
Add task.
4. Clients page
Client fields: Name, Phone, Email, Company Name, Website, Date Added, Comment.
List: contains all client fields, with the ability to sort and filter (search) by all fields. Clicking on a row opens a modal editing window.
Delete: when deleted, the client is marked as deleted. You cannot add a deal to such a client, but deals with them are displayed.
Add: opens a modal window for entering client data
5. Deals Page
Deal fields: Name, Client, Description, Amount, Stage (status), Creation Date, Completion Date.
Deal statuses: New, In Progress, Completed, Canceled.
List: contains all deal fields, with the ability to sort and filter (search) by all fields. Clicking on a row opens a modal editing window.
Add: Opens a modal window for entering transaction details
6. Reports Page
The page contains several tabs with reports.
General Sales Report: displays all completed deals for a given period (week, month, quarter). Report fields: Deal ID, Name, Client, Amount, Completion Date.
Deal Stage Report: analysis of deals by current stage (status). Report fields: Deal stage, Number of deals at this stage, Total amount of deals at this stage.
Customer reports
New customers report: number of new customers for the period (week, month, quarter). Report fields: Customer ID, Customer name, Company, Date added.
Customer Activity Report: information on customer interactions (number of deals, completed tasks). Report fields: Customer ID, Customer Name, Number of Deals, Completed Tasks.
Task Reports
Overdue Tasks Report: a list of tasks that were not completed on time. Report fields: Task ID, Task Name, Assignee, Due Date, Status.
The report must be presented in a standard table format with the ability to sort by each field. Table pagination must be provided.
Report filtering. Each report must include a form for filtering data by date, manager, and deal stage.
7. Tasks Page
Task fields: Title, Deal, Description, Due Date, Assignee, Status, Creation Date.
Task statuses: New, In Progress.
Add: Opens a modal window for entering task details
8. User Profile Page
Settings form:
email;
password;
name.

Refer to the types in the “types” folder

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
The layout has no semantic errors. Appropriate tags are used for elements. For example, all links must be formatted using ```<a />```, and all forms using ```<form />```, etc.
The project code does not cause errors or warnings in the browser console.

