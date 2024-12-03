---
sidebar_position: 2
---

# Directory Structure

The frontend project adopts a Monorepo design, focusing on **usability** and **consistency** as the basic principles to achieve an efficient and reasonable directory structure.

:::note Directory Design Principles:

1. **Usability**: The structure should align with the architectural features, allowing developers to easily determine where to create or find files/folders.

   To achieve usability, the folder/file structure should be clear and intuitive, so developers do not spend excessive time searching for or creating files and folders.

2. **Consistency**: Developers should always follow a unified folder/file structure standard.

   To maintain consistency, ensure that newly created files/folders adhere to this structure during development and code review. A simple folder structure is easier to follow, while a complex structure may lead to confusion and misplaced files/folders, affecting development.
   :::

## Overall Directory Structure

```
beaver-iot-web
├── apps            # Applications Directory
│    ├── web        # Web Application
│    └── ...        # Other Applications
│
├── packages        # Libraries Directory
│    ├── locales    # Internationalization Library
│    ├── shared     # Shared Resources Library
│    ├── spec       # Project Specifications Library
│    └── ...        # Others
│
├── README.md
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Application Directory Structure

```
web/src
├── assets                      # Static Assets
├── components                  # Common Components
├── layouts                     # Layouts
├── pages                       # Pages
│     ├── home
│     │     ├── components      # Page-specific Components
│     │     ├── hooks           # Page-specific Logic
│     │     ├── views           # Sub-route Pages
│     │     └── index.tsx       # Page Entry
│     │
│     ├── user
│     └── ...
│
├── routes                      # Global Routes
├── services                    # Common Services
├── stores                      # Global State
├── styles                      # Style Resources
└── main.ts                     # Entry File
```

### Explanation

- **apps**: Contains all applications, each with its own directory.
  - **web**: Directory for the Web application.
- **packages**: Contains all libraries that can be shared across multiple applications.
  - **locales**: Library for handling internationalization.
  - **shared**: Library for shared resources.
  - **spec**: Library for project specifications.
- **README.md**: Project documentation file.
- **package.json**: Project configuration file, including dependencies and scripts.
- **pnpm-lock.yaml**: Lock file for pnpm to ensure dependency consistency.
- **pnpm-workspace.yaml**: Configuration file for pnpm workspace.

### Application Directory Structure Explanation

- **assets**: Stores static assets such as images and fonts.
- **components**: Stores common React components that can be reused across multiple pages.
- **layouts**: Stores layout components, typically used for overall page layout.
- **pages**: Stores individual pages, each with its own directory.
  - **home**: Directory for the home page.
    - **components**: Stores components specific to the home page.
    - **hooks**: Stores custom hooks specific to the home page.
    - **views**: Stores sub-route pages of the home page.
    - **index.tsx**: Entry file for the home page.
  - **user**: Directory for the user page, structured similarly to the `home` directory.
- **routes**: Stores global route configurations.
- **services**: Stores common services such as API requests.
- **stores**: Stores global state management files, such as Redux or MobX.
- **styles**: Stores global style resources.
- **main.ts**: Entry file for the application.

This directory structure design allows developers to easily find and manage files, improving development efficiency and code maintainability.
