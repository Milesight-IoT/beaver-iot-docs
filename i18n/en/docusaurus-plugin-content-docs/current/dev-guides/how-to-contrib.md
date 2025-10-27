---
sidebar_position: 7
---
# Contribution Guide

We deeply appreciate your willingness to contribute your valuable time and enthusiasm to this project. To ensure your contributions are as impactful as possible, please read this guide carefully before making any contributions.

Here is a list of ways you can help improve this project (in no particular order):
* Bug Reports
* Bug Fixes
* Code Quality Improvements
* Feature Enhancements (including new integrations)
* Testing
* Documentation

Together, let's make this project more useful!

## How to Contribute Code Changes

* Fork our repository and create a branch with a meaningful name.
* **Minimize PR Principle**: Try to limit each PR to a single change.
* Add or update relevant tests for your changes.
* Each commit message should be concise and clear. Avoid having too many commits in a single PR. <!-- https://codefinity.com/blog/7-Best-Practices-of-Git-Commit-Messages -->
* Ensure all tests pass before submitting your PR.
* Resolve any merge conflicts before submission.
* Submit a **Pull Request (PR)** through the GitHub UI.

## Bug Reports

If you want to submit a bug report, please open an **Issue**.

The **title** of the issue should briefly describe the bug, rather than simply stating "Bug" or "There is a bug".
In the **description** of the issue, include specific details about the bug, such as:
* **Behavior** of the bug
* **Steps to reproduce** the bug

If you have already done some analysis of the bug, feel free to include that information.

## Bug Fixes

If you can fix a bug, submit a PR through the GitHub UI.
In the PR, link to the relevant bug issue.
If there is no related issue, include specific details about the bug in the PR description.

In addition to the information required in the issue, the PR description should also include:
* How you analyzed and identified the location of the bug in the code
* What your code changes do to fix the bug

## Code Quality

Code quality improvements typically include:
* Adding or updating **comments**
* Fixing **typos**
* Optimizing **naming** of variables, functions, and classes
* Other changes that do not affect code logic

These improvements should ideally be included in a single PR.

Better code quality helps community contributors understand the code more easily, enabling them to participate more effectively in the project.

## Feature Enhancements

Before starting work on a new feature (including new integrations), please **submit an issue** first and clearly describe the feature. This approach has several benefits:
* You can search for historical issues to see if someone has already worked on it.
* It allows other contributors to discuss the significance of the feature.
* It attracts other interested contributors to collaborate with you on the new feature.
* If there are potential issues with the feature, they can be identified early (saving you valuable time).

Once the issue discussion is complete, you can start developing the new feature.
After development, submit a PR through the GitHub UI and link the issue.

## Testing

If there are some test cases not covered in our project, you can submit a PR to add those tests and explain the uncovered scenarios in the PR description.

## Documentation

import { DocSrcUrl } from '/src/consts';

If you want to improve our documentation, <a href={DocSrcUrl}>please visit here</a>.
