# Firebase Studio Git Cheatsheet

This is a simplified guide for the most common Git commands you will use in this workspace.

---

## Workflow 1: Merging a Feature Branch into `main`

This is the most common workflow. Use this when you have finished work on a feature branch (e.g., `claude/fig-make-XYZ`) and want to merge it into your main codebase.

**Goal:** Safely merge your work into the `main` branch.

**Step 1: Find the exact name of your feature branch.**
This is the most important step. Run this command to see all remote branches that exist on GitHub.

```bash
# Lists all remote branches. Find your branch name in the list.
# It will likely start with "origin/claude/..."
git branch -r
```

**Step 2: Switch to the `main` branch.**
Ensure you are on the `main` branch before merging.

```bash
git checkout main
```

**Step 3: Make sure your `main` branch is up-to-date.**
This pulls the latest changes from GitHub to prevent conflicts.

```bash
git pull origin main
```

**Step 4: Merge your feature branch into `main`.**
This is the key step. Use `origin/` before your branch name to merge the version from GitHub.

```bash
# Example: git merge origin/claude/fig-make-XYZ
git merge [full-remote-branch-name-from-step-1]
```
> **Note:** Using `origin/[branch-name]` is the safest and most reliable way to merge.

**Step 5: Push the updated `main` branch to GitHub.**
This publishes your merged changes.

```bash
git push origin main
```

---

## Workflow 2: Starting New Work

Use this when you are about to start a new task. Always create a new branch for new work to keep `main` clean.

**Step 1: Make sure `main` is up-to-date.**
```bash
git checkout main
git pull origin main
```

**Step 2: Create and switch to a new branch.**
Give it a descriptive name (e.g., `fix-login-button`).

```bash
git checkout -b [new-branch-name]
```
You are now ready to make changes on your new, isolated branch.

---

## Workflow 3: Saving Your Work on a Feature Branch

As you work, commit your changes regularly. This creates checkpoints you can return to.

**Step 1: Stage your changes.**
This adds all modified files to the list of changes to be saved.

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

## Quick Reference & Troubleshooting

- `git status`
  - **What it does:** Shows what files have been changed, what's staged, and what's not. The most-used Git command.
- `git branch -a`
  - **What it does:** Lists all local and remote branches. Useful for finding the exact name of a branch.
- `git log -n 5 --graph`
  - **What it does:** Shows the 5 most recent commits in a visual graph.
- `git fetch origin`
  - **What it does:** Downloads all the latest branch and commit information from GitHub without changing your local files. Good to run before a merge.
- `git reset --hard`
  - **DANGER:** This command will permanently delete all your uncommitted local changes and reset the branch to its last commit. Use with caution.
