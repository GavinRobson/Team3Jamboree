Project Title: The College Experience Game

Members of Team 3 Jamboree (Group 3):
Evan Digles
Gavin Robson
Nkechiyem Molokwu
Jacqueline Luis-Valle
Kevin Anderson

You will need node.js to run this code.
After you have node.js installed, follow the directions below.

Entering API Keys:
create .env file in root directory with the following variables:
DATABASE_URL               = <database_url>
DIRECT_URL                 = <direct_url>
NEXTAUTH_SECRET            = "SECRET" #Literally
NEXTAUTH_JWT_SECRET        = "SECRET" #Literally
NEXT_PUBLIC_OPENAI_API_KEY = <openai_api_key>

To run the code do the following in terminal:
npm i [to install necessary dependencies if you already installed node.js]
npx prisma generate [Sets up the database stuff]
npm run dev [to start the game]
[Then you should follow whatever link it gives you, usually localhost:3000, to play the game in browser.]
ctrl + c [Literal key presses here, to end the program.]
