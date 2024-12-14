# Move Git Branch to a Specific Commit

This guide explains how to move a Git branch (e.g., `main`) to a specific commit, discarding all changes made after that commit.

## Steps

### 1. Switch to the Target Branch
First, ensure you are on the branch you want to move (e.g., `main`). Run:
```bash
git checkout main
```

### 2. Reset the Branch to the Desired Commit
To move the branch pointer and update your working directory to a specific commit, use the `reset --hard` command. Replace `3025cbb83210233ef283f0b2ef1eb565ff7e0092` with the commit hash you want:
```bash
git reset --hard 3025cbb83210233ef283f0b2ef1eb565ff7e0092
```

### 3. Force Push the Changes to the Remote Repository
If the branch is shared remotely, you need to force push the changes to align the remote branch with your local branch. Use:
```bash
git push origin main --force
```

**Note:** Be cautious when using `--force` as it overwrites the remote branch history, which could affect other collaborators.

## Optional: Backup the Current State
If you'd like to preserve the current state of the branch before resetting, create a backup branch:
```bash
git branch backup-main
```
This creates a new branch `backup-main` pointing to the current state of `main`. You can restore it later if needed.

## Summary of Commands
```bash
git checkout main
git branch backup-main     # Optional: create a backup

# Move the branch to the specified commit
git reset --hard 3025cbb83210233ef283f0b2ef1eb565ff7e0092

# Force push the changes to the remote repository
git push origin main --force
```

## Important Notes
- **Coordination:** Ensure no one else is working on the branch to avoid conflicts.
- **Backup:** Always consider creating a backup branch before making destructive changes.
- **Force Push:** Use `--force` only when necessary, as it can disrupt other collaborators.

By following these steps, you can successfully move your branch to a specific commit and clean up the branch history.
