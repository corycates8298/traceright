# Firebase Studio Git Cheatsheet

This is a simplified guide for the most common Git commands you will use in this workspace.

## Workflow 1: Merging a Feature Branch into `main`

This is the most common workflow. Use this when you have finished work on a feature branch (e.g., `claude/fig-make-XYZ`) and want to merge it into your main codebase.

**Goal:** Safely merge your work into the `main` branch.

**Step 1: Get the exact name of your feature branch.**
```bash
# Lists all local and remote branches. Find your branch name.
git branch -a
```

**Step 2: Switch to the `main` branch.**
```bash
git checkout main
```

**Step 3: Make sure `main` is up-to-date.**
This pulls the latest changes from GitHub to prevent conflicts.
```bash
git pull origin main
```

**Step 4: Merge your feature branch into `main`.**
This is the key step. Replace `[your-branch-name]` with the full name from Step 1.
```bash
# Example: git merge origin/claude/fig-make-XYZ
git merge origin/[your-branch-name]
```
> **Note:** Using `origin/[your-branch-name]` is the safest way, as it merges the version of the branch that is on GitHub.

**Step 5: Push the updated `main` branch to GitHub.**
This publishes your merged changes.
```bash
git push origin main
```

---

## Workflow 2: Starting New Work

Use this when you are about to start a new task. Always create a new branch for new work.

**Step 1: Make sure `main` is up-to-date.**
```bash
git checkout main
git pull origin main
```

**Step 2: Create and switch to a new branch.**
Give it a descriptive name.
```bash
# Example: git checkout -b fix-login-button
git checkout -b [new-branch-name]
```
You are now ready to make changes on your new branch.

---

## Workflow 3: Saving Your Work on a Feature Branch

As you work on a feature branch, you should commit your changes regularly.

**Step 1: Stage your changes.**
This adds all modified files to the "to be saved" list.
```bash
git add .
```

**Step 2: Commit your changes.**
This saves a snapshot of your work with a descriptive message.
```bash
# Example: git commit -m "feat: add icon to login button"
git commit -m "[your-commit-message]"
```

**Step 3: Push your branch to GitHub.**
This backs up your commits to the remote repository. The `-u` flag sets it up so you can just use `git push` in the future for this branch.
```bash
git push -u origin [your-branch-name]
```

---

## Quick Reference Commands

- `git status`: See what files have been changed.
- `git branch -a`: List all local and remote branches.
- `git log -n 5`: See the 5 most recent commits.
- `git fetch origin`: Download all the latest branch information from GitHub.
