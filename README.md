While I'm almost positive ITS mentioned a way to migrate code from one gear to
another, they haven't gotten back to me yet on the specifics about that.

Fortunately, our database is, for all intents and purposes, empty, save for a few
test syllabi. Furthermore, all our code is written in terms of Openshift environment
variables, so there's nothing stopping it from being used on your own database.

Therefore, until ITS gets back to me, the best way to deploy this software to a more
permanent location would be to create a new gear on CloudApps, copy our code as-is
into the repository, and simply add a MongoDB cartridge to the app. At that point,
our code should connect to the database, construct the Syllabus schema, and begin
accepting GET/POST requests. Once ITS gets back to me, I'll forward instructions for
migrating the gear more officially, but in our case, a simple copy-paste plus DB
installation should be all you need.

The documentation for creating gears and adding cartridges to them can be found at
the Carolina CloudApps website at http://help.unc.edu/help-tag/cloudapps/

This code is also hosted on GitHub at https://github.com/fmenozzi/syllabuilder.
This is my personal account though, so I can't promise that it will always be there.
Therefore, I would recommend not relying on its existence.
