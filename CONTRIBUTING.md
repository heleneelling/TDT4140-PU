# How to contribute

This .md will tell you how you can contribute to the project. 
It will show you the conventions and how-tos we use when adding and editing features


## General info when working with the repo

To keep track of who's doing what, it is very helpful to create issues for whatever
you're doing, moving it to `Doing` in the project board, and assigning
yourself. We also encourage labeling the issue with `Doing` aswell. <br>
This way, we can easily see what is being done, and by who.

If possible, tag it with a milestone as well, so we know when we can expect it to
be done.

When the issue is done, label it with `Done`

## Starting the development of a new feature/hotfix

To start working on a new feature, checkout to a new branch with a name following
the template of `issue-#-<feature>`. This makes it easy to distinguish
branches related to features/hotfixes/etc. from one another. If the branch is
to fall out of sync with `master`, please update it before merging into `master`.<br>
Do __NOT__ post merge requests with merge conflitcs.

When you are done working on your feature, and you deem it apt for merging into
master, create a merge request (pull request if you prefer github-lingo) requesting
your branch to be merged into `master`. 

After doing this, we say that your branch is in _review stage_. When it is in
this state, try your best to refrain from pushing more changes. Now, you wait for
someone from your team (preferrably several) to review your code, and either
request changes, or approve.

When your MR (merge request) has been approved, it will be merged into master, and
the feature branch you worked on will be deleted (this is to avoid a situation where you have
potentially hundreds of inactive branches laying around).

## Incorporating others' changes (in their branch) into your feature

If you are developing a feature, and you rely on changes someone made in another
branch, try your best to avoid merging their entire branch into yours, as that
will essentially make the other MR redundant. 

If you simply need one commit, you can use `git cherry-pick`. <br>
You can find some documentation about it [Here](https://www.atlassian.com/git/tutorials/cherry-pick)

## Git messages

Try your best to give a proper description of the changes made in the commit title,
and a more in-depth description in the commit body.

If relevant, link to the issue relevant to your changes by typing a # followed by the issue
number. GitLab will pick up on this, and create a hotlink to the issue page, and vice-versa.

That means no commit messages like:

- `tasklist.js`
- `Fixed something in task.js`

etc.

The reasoning for this is that it makes it very hard for others to know what
changes have been made without digging through each commit.

## Creating the MR

When you are creating a MR, you will be prompted with several options, and you're
supposed to fill it out like this;

- Set the assignee to yourself
- Set the milestone to the relevant milestone if that exists,
- Tick "Delete source branch when merge requests is accepted." (This is not always the case)

### Function declaration

Functions, variables and constants should follow `camelCase` capitalization, and should never have an uppercase first
character. <br>
Classes should should always have an uppercase first character.

E.g.

```js
newFunction = (newParameter) => {
    // function body
}
```

### Spacing between functions

There should only be one newline between function declarations.
This is for limiting the amount of whitespace in the codebase.

### Comments

Comments are encouraged, but should not be abused; comments like 

```js
//username
let username;
```

do not contribute to the legibility of the code, they only waste space.


Multiline comments should always be written like this:

```js
/* This is 
     a
multiline comment*/ 
```

All major blocks of code should have comments describing anything that might not
be easily understood at first glance.<br>
Comments inside blocks of code are encouraged if the code is not easily understandable