# Module 3 group project #
__Submitted by: 404 Page Not Found

__Team members:__

- shukl031@umn.edu
- naras036@umn.edu
- mulka002@umn.edu
- khand052@umn.edu

__Heroku URL:__ _https://potpourri.herokuapp.com_

__Argument of ambition (optional, maximum 100 words):__
1. We have developed a beautiful website which helps to collect and organize varieties of content. This is similar to some of the biggest website such as Pinterest, Google Keep to name few.
2. Our website supports the users to organize twitter data, allows to bookmark links(articles,news etc.), Make notes and also to store the video links.
3. The website allows users to add,delete and update all the different kinds of data.
4. The site is built in a modular way for all these contents, giving great feel and look.
5. We have also implemented additional requirements like parsing the URL and displaying the highlight(using Open graph Protocol).
6. The user will able to search the content, where the user can search using the title of the content. 
7. Multiuser support is provided with login and authentication.
8. The Site is developed in such a way to keep in alignment with the project guidelines. The site built looks very professional and can be used by all.
9. We have put a lot of effort to design the website and satisfy multiple use cases.
10. For twitter data, we examine their API and make sure that we get relevant results
11. We have single API which does both update and adding new user
12. We have built twitter slider from scratch having fancy navigation bar. 
13. Login/Logout support is also done from scratch and we used jwt token.
14. There are hover buttons which will update and delete. 
15. Also, we have programmatically wrote algorithm, to fit content within given space else you can see it via modal.
16. For bookmarks, we use OG algorithm to show preview content of webpage. 
17. Our website is responsive and can change depends on screen size.

__Argument of execution (optional, maximum 100 words):__
1. We worked as a team and executed the project with a very good plan. Team work helped us a lot to achieve the project goals.
2. The code developed is highly modular. This helped in code debugging and bug fixing.
3. We have used coding standard variable names and tried to modularize code as much as possible. 
4. Proper channel of communication have been adopted to pass data from child to parent ( which becomes difficult, if not handled properly)
5. Implemented search operation.


## Description ##
The group project for module 3 is to create a website for collecting and organizing content.

Some sites that can serve as inspiration:

- pinterest: users save images to "boards".
- pocket and delicious: users save and organize URLs
- zotero: users save academic articles, organize them into groups, tag them, and export them in various formats
- reddit and hackernews: users post, vote on, and discuss URLs

Generally, these sites allow users to (a) collect content into collections, lists, or tags, (b) annotate the content with additional information, and (c) browse and search for other information on the site.

We encourage you to build a site to curate content that's interesting to you. Ideas:

- Airbnb rentals
- NPM packages
- Amazon products
- NES ROMs


## Requirements ##

- Build a site on react, express, and mongo. Host the site on heroku.
- The site must allow users to:
  - Add new content.
  - Edit existing content, e.g., by changing its description or giving it a descriptive tag
  - Delete existing content
- The site must allow the content to be organized.  E.g., collections, lists, or tags.
- The site must allow users to browse the site in a reasonable way via links.


### Encouraged, but optional ###

- Content import via identifier (e.g., URL). Many interfaces (Facebook, Slack, Pocket) allow users to add links, which the site then parses to find some content (e.g., a title, an image). Allow your users to do something similar.
- Search. Add a site-search feature that allows users to find content. It does not count to add a google site search box :)  This could, for example, be an autocomplete widget that shows tags, or an open-ended widget that searches the text of imported items.
- Multi-user support.  Allow multiple users to independently contribute content.  There is no need for full authentication, but you could allow users to "log in" by typing a username.  You could simply track and display activity by user, or to be more ambitious, you could give different users different views (e.g., the homepage shows the logged-in user's collections).
- Responsive design. Make the site render in a usable way on an iphone 7 (or equivalent).


## Submission ##
- Your code should be pushed up to your repo on github
- Fill this `README.md` out with your team name, team members' emails, and
- Heroku url for your demo. Additionally, complete the argument sections at the top of the file.


## Grading ##
You will be graded on the __ambition__ and __execution__ of the project. At the top of this `README.md` you have the opportunity to argue why your submission was ambitious and well executed. In order for us to grade it, you must have it hosted on Heroku. To earn an "A" grade, a project must be technically ambitious, well-executed, and polished. To earn a passing grade, a project must minimally fulfill the three requirements listed in the description.
