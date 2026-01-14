React Native Intern – Combined Assessment
Duration: 1 Day
Level: Beginner–Intermediate
APIs: https://jsonplaceholder.typicode.com/posts


Objective
Build a small React Native application that fetches a list of posts, provides search functionality, and saves the user’s search history using AsyncStorage.

Task
1.	Fetch & Display Posts (Mandatory)
●	GET https://jsonplaceholder.typicode.com/posts
●	Display title and body using a FlatList.
●	Show a clean UI for the posts.

2.	Search Functionality
●	Add a search input box at the top.
●	User can type text → filter posts by title (case-insensitive).
●	Filtering must work instantly as user types.

3.	Save Search Using AsyncStorage
●	When user types something in the search box →
store the search text in AsyncStorage.
●	When app restarts:
○	Retrieve the saved search text from AsyncStorage.
○	Auto-fill it in the search box.
○	Apply filtering automatically.

4.	Error Handling
App must handle these scenarios:
No Internet / API Failure
Show a message such as:
“Unable to fetch posts. Check your network connection.”
Empty Results State
If search returns no items:
“No posts found.”


Bonus Points (Optional)
(Let them shine if they want)
●	Loading indicator while fetching
●	Skeleton loader UI
●	Pull-to-refresh
 
●	Create a reusable <PostCard /> component
●	Clean folder structure (components, hooks, services)



Submission Instructions *
The submission must submit the project in one of the following ways:

Option 1 — Upload to GitHub
1.	Create a public GitHub repository
2.	Push the complete React Native project
3.	Share the GitHub repository link with us
Example naming: react-native-task-assessment-


Option 2 — Send ZIP Folder via Email
1.	Compress the entire project folder as .zip or .rar
2.	Make sure node_modules is NOT included
3.	Email the ZIP file to us with the subject:
"React Native Assessment - Your Name"



What to Submit
●	GitHub link or ZIP file
●	A short note:
○	RN version used
○	Additional libraries installed
○	Any bonus features implemented
