# A program made for no reason
This is a React + Spring Boost app created for the sole purpose of getting a random word and a link to a dictionary. Planning to change that to include definitions on the website itself if I find a dictionary with a good API

It is built using `gradle clean build` in the top directory.
It assumes by default it is hosted on 'https://yoururl.domain/random_vocab/' which can be changed in the package.json file in front-end.

The jar itself hosts both the RESTful API and the front-end. On build, it packages the yarn project, then grabs the files and places them into the `static` classpath folder for Spring Boot to load.