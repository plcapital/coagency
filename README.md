Project organisation:

General:
Keep functions in alphabetical order within each file.
Interal functions come after all exteral (exports) function definitions.

Routes:
The application routes are grouped by GET and POST methods.

The GET method routes are in the get.js file.
All functions serving GET requests should be postfixed with "Page".
For example,
    app.get('/login', login.loginPage);

The POST method routes are in the post.js file.
Functions serving POST request should not have any postfix.
For example,
    app.post('/login', login.login(modelProvider));

The routes are ordered in alphabetical order, where the following rules apply:
1. Order first by domain (e.g. 'group' before 'user')
2. Order then by path (which should match the route function)
