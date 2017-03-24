# Contribute to lib-ical

Thank you for your interest in contributing to lib-ical!

* [Ways to contribute](#ways-to-contribute)
* [To contribute using Git](#To-contribute-using-Git)
* [Contribute code](#Contribute-code)
* [FAQ](#faq)
* [More resources](#more-resources)

## Ways to contribute

Here are some ways you can contribute to this library:

* Add better comments to the code.
    - This project is intended to be a good introductory project for people to
      introduce themselves to Typescript development with. As a result, I want
      to prioritize ease of understanding so that people can learn from it.
* Fix issues opened in GitHub against this sample.
* Implement/Fix any TODO items throughout the codebase.

Another great way to improve this library is to take on some of the open issues
filed against the repository. You may have a solution to an bug in the sample
code that hasn't been addressed. Fix the issue and then create a pull request
following our [Contribute code](#Contribute-code) guidance. 

If you want to add a new feature to lib-ical, it is reccommended that you reach
out to Mark Stenglein <mark@stengle.in> or file an issue before you get too far
into development. This is just so that work isn't done on sections currently
under development already as well as maintaining a good idea of where the
project is headed. Otherwise, feel free to either file a pull request or send
any patches over email to Mark Stenglein <mark@stengle.in>.

## To contribute using Git

Pull requests are typically reviewed within 10 business days.

## Use GitHub, Git, and this repository

**Note:** Most of the information in this section can be found in
[GitHub Help] articles.  If you're familiar with Git and GitHub, skip to the
**Contribute code** section for the specifics of the code contributions for
this repository.

### To set up your fork of the repository

1.	Set up a GitHub account so you can contribute to this project. If you
    haven't done this, go to [GitHub](https://github.com/join) and do it now.

2.	Install Git on your computer. To do this on linux it should be as simple as
    pulling it from your distro's package manager:

    - Ubuntu/Debian: `sudo apt install git`
    - Arch: `pacman -S git`

3.	Create your own fork of this repository. To do this, at the top of the
    page, choose the **Fork** button.

4.	Copy your fork to your computer. To do this, open your terminal. At the
    command prompt enter:

		git clone https://github.com/<your user name>/lib-ical.git

	Next, create a reference to the root repository by entering these commands:

		cd lib-ical
		git remote add upstream https://github.com/srct/lib-ical.git
		git fetch upstream

Congratulations! You've now set up your repository. You won't need to repeat
these steps again.

## Contribute code

To make the contribution process as seamless as possible, follow these steps.

### To contribute code

1. Create a new branch.
2. Add new code or modify existing code.
3. Submit a pull request to the main repository.
4. Await notification of acceptance and merge.
5. Delete the branch.

### To create a new branch

1.	Open Git Bash.
2.  At the Git Bash command prompt, type
    `git pull upstream master:<new branch name>`. This creates a new branch
    locally that is copied from the latest OfficeDev master branch.
3.	At the Git Bash command prompt, type `git push origin <new branch name>`.
    This alerts GitHub to the new branch. You should now see the new branch in
    your fork of the repository on GitHub.
4.	At the Git Bash command prompt, type `git checkout <new branch name>` to
    switch to your new branch.

### Add new code or modify existing code

Navigate to the repository on your computer.

Use the IDE of your choice to modify and test the package. Once you have
completed your change, commented your code, and run your unit tests, check the
code into the remote branch on GitHub.

**Be sure to write and check in unit tests to cover all code written.**

Ideally, any commit will contain any new tests needed in the same commit. At
the very least any new tests need to be added to a merge request **before** it
will be accepted.

#### Code contribution checklist

Be sure to satisfy all of the requirements in the following list before
submitting a pull request:

- Follow the code style found in the cloned repository code. 
- Code must be unit tested. Include the unit tests in the pull request.
- Keep the size of your code change reasonable. if the we cannot
  review your code change in 4 hours or less, your pull request may not be
  reviewed and approved quickly.
    - If you have a merge request that is especially large, consider breaking it
      into logical sections which can be independently reviewed. This may not
      always be possible, but use your own discretion and make good choices.
- Avoid unnecessary changes to cloned or forked code. The reviewer will use a
  tool to find the differences between your code and the original code.
  Whitespace changes are called out along with your code. Be sure your changes
  will help improve the content.
- Pull requests should serve **one** purpose. Do not mix syntax/whitespace fixes
  with new features. Any instance such as this where the changes can be broken
  up makes life much easier when reviewing as well as searching for when found
  bugs are introduced.

### Push your code to the remote GitHub branch

The files in your downloaded fork are a working copy of the
new branch that you created in your local repository. Changing anything in this
folder doesn't affect the local repository until you commit a change. To commit
a change to the local repository, type the following commands:

	git add .
	git commit -v -s 

The `add` command adds your changes to a staging area in preparation for
committing them to the repository. The period after the `add` command specifies
that you want to stage all of the files that you added or modified, checking
subfolders recursively. (If you don't want to commit all of the changes, you
can add specific files. You can also undo a commit. For help, type
`git add -help` or `git status`.)

The `commit` command applies the staged changes to the repository. The `-v` and
`-s` switches **should not** be omitted. The `-v` switch is for verbose output
from the command, and `-s` appends the Developers Certificate of Origin
Acknowldedgement to your commit.

You can commit multiple times while you are doing your work, or you can commit
once when you're done.

### Submit a pull request to the master repository

When you're finished with your work and are ready to have it merged into the
master repository, follow these steps.

#### To submit a pull request to the master repository

1.	In the command prompt, type `git push origin <new branch name>`.
    In your local repository, `origin` refers to your GitHub repository that
    you cloned the local repository from. This command pushes the current state
    of your new branch, including all commits made in the previous steps, to
    your GitHub fork.
2.	On the GitHub site, navigate in your fork to the new branch.
3.	Choose the **Pull Request** button at the top of the page.
4.	Verify the Base branch is `srct/lib-ical@develop` and the Head
    branch is `<your username>/lib-ical@<branch name>`.
5.	Choose the **Update Commit Range** button.
6.	Add a title to your pull request, and describe all the changes you're making.
7.	Submit the pull request.

@ocelotsloth will process your pull request. Your pull request will surface on
the `srct/lib-ical` site under Pull Requests. When the pull request is
accepted, the request will be resolved.

### Repository owner code review

The owner of the repository will review your pull request to be sure that all
requirements are met. If the reviewer finds any issues, they will communicate
with you and ask you to address them and then submit a new pull request. If
your pull request is accepted, then the repository owner will tell you that
your pull request is to be merged.

### Create a new branch after merge

After a branch is successfully merged (that is, your pull request is accepted),
don't continue working in that local branch. This can lead to merge conflicts
if you submit another pull request. To do another update, create a new local
branch from the successfully merged upstream branch, and then delete your
initial local branch.

For example, if your local branch X was successfully merged into the
ocelotsloth/lib-ical develop branch and you want to make additional updates to
the code that was merged. Create a new local branch, X2, from the
ocelotsloth/lib-ical develop branch. To do this, open your terminal and execute
the following commands:

	cd <rep-location>/lib-ical
	git pull upstream develop:X2
	git push origin X2

You now have local copies (in a new local branch) of the work that you
submitted in branch X. The X2 branch also contains all the work other
developers have merged, so if your work depends on others' work (for example,
a base class), it is available in the new branch. You can verify that your
previous work (and others' work) is in the branch by checking out the new
branch...

	git checkout X2

...and verifying the code. (The `checkout` command updates the files in your
local filesystem to the current state of the X2 branch.) Once you check out the
new branch, you can make updates to the code and commit them as usual. However,
to avoid working in the merged branch (X) by mistake, it's best to delete it
(see the following **Delete a branch** section).

### Delete a branch

Once your changes are successfully merged into the main repository, delete the
branch you used because you no longer need it.  Any additional work should be
done in a new branch.

#### To delete a branch

1.	In your terminal, type `git checkout develop` This ensures that you aren't
    in the branch to be deleted (which isn't allowed).
2.	Next, at the command prompt, type `git branch -d <branch name>`. This
    deletes the branch on your computer only if it has been successfully merged
    to the upstream repository. (You can override this behavior with the `–D`
    flag, but first be sure you want to do this.)
3.	Finally, type `git push origin :<branch name>` at the command prompt (a
    space before the colon and no space after it).  This will delete the branch
    on your github fork.

Congratulations, you have successfully contributed to lib-ical!

## FAQ

### How do I get a GitHub account?

Fill out the form at [Join GitHub](https://github.com/join) to open a free
GitHub account. 

### Who approves pull requests?

The owner of the sample repository approves pull requests. 

### How soon will I get a response about my change request?

Pull requests are typically reviewed within 10 business days.

## More resources

[GitHub Home]: http://github.com
[GitHub Help]: http://help.github.com/
[Set Up Git]: http://help.github.com/win-set-up-git/
