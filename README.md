# React Monorepo Template

A modern monorepo template for managing multiple React projects using pnpm workspaces. This template provides a clean structure for organizing and developing multiple applications or packages within a single repository.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding New Projects](#adding-new-projects)
- [Managing Dependencies](#managing-dependencies)
- [Removing Projects](#removing-projects)
- [Running Projects](#running-projects)
- [Workspace Commands](#workspace-commands)

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.23.0 or higher) - This project uses pnpm as the package manager

### Installing pnpm

If you don't have pnpm installed, you can install it globally using:

```bash
npm install -g pnpm
```

Or using the standalone installer:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Getting Started

1. **Clone or initialize the repository:**
   ```bash
   git clone <repository-url>
   cd react-practice-dev
   ```

2. **Install all dependencies:**
   ```bash
   pnpm install
   ```
   This will install dependencies for the root workspace and all projects in the `projects/` directory.

3. **Verify the setup:**
   ```bash
   pnpm list --depth=0
   ```
   This will show all workspace packages.

## Project Structure

```text
react-practice-dev/
├── projects/              # All projects live here
│   ├── my-app-one/       # Example project 1
│   └── my-app-two/       # Example project 2
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml   # Workspace configuration
└── pnpm-lock.yaml        # Lock file for all dependencies
```

## Adding New Projects

### Method 1: Create a New Project from Scratch

1. **Create a new directory in `projects/`:**
   ```bash
   mkdir projects/my-new-app
   cd projects/my-new-app
   ```

2. **Initialize a new project:**
   ```bash
   pnpm init
   ```

3. **Add your dependencies:**
   ```bash
   pnpm add react react-dom
   pnpm add -D vite @vitejs/plugin-react typescript
   ```

4. **Create your project structure** (e.g., `src/`, `public/`, configuration files, etc.)

### Method 2: Use a Template/Scaffold

If you're using a tool like Vite, Create React App, or another scaffold:

1. **Create the project in a temporary location:**
   ```bash
   pnpm create vite@latest temp-project -- --template react-ts
   ```

2. **Move it to the projects directory:**
   ```bash
   mv temp-project projects/my-new-app
   ```

3. **Install dependencies:**
   ```bash
   cd projects/my-new-app
   pnpm install
   ```

### Method 3: Copy an Existing Project

1. **Copy a boilerplate project:**
   ```bash
   cp -r projects/my-app-one projects/my-new-app
   ```

2. **Update the project name in `package.json`:**
   ```bash
   cd projects/my-new-app
   # Edit package.json and change the "name" field
   ```

3. **Clean and reinstall:**
   ```bash
   rm -rf node_modules
   pnpm install
   ```

## Managing Dependencies

### Installing Dependencies

#### For a Specific Project

To install a dependency for a specific project:

```bash
# From the root directory
pnpm --filter <project-name> add <package-name>

# Example: Add axios to my-app-one
pnpm --filter my-app-one add axios

# For dev dependencies
pnpm --filter my-app-one add -D @types/node
```

Or navigate to the project directory:

```bash
cd projects/my-app-one
pnpm add <package-name>
```

#### For All Projects (Monorepo-wide)

To install a dependency for all projects, you can:

1. **Add to root `package.json`** (if it's a shared dependency):
   ```bash
   pnpm add -w <package-name>
   ```

2. **Use a script to add to all projects:**
   ```bash
   # This requires a custom script - see Workspace Commands section
   ```

### Updating Dependencies

#### Update a Single Project's Dependencies

```bash
# Update all dependencies in a specific project
pnpm --filter <project-name> update

# Update a specific package in a project
pnpm --filter <project-name> update <package-name>
```

#### Update All Dependencies (Monorepo-wide)

```bash
# Update all dependencies across all projects
pnpm update -r

# Update a specific package across all projects
pnpm update -r <package-name>
```

#### Update pnpm Lock File

After manually editing `package.json` files:

```bash
pnpm install
```

This will update the `pnpm-lock.yaml` file to reflect all changes.

### Viewing Dependencies

```bash
# List all workspace packages
pnpm list --depth=0

# List dependencies for a specific project
pnpm --filter <project-name> list

# Show dependency tree for a specific project
pnpm --filter <project-name> list --depth=10
```

## Removing Projects

### Removing a Project

1. **Stop any running processes** for the project

2. **Remove the project directory:**
   ```bash
   rm -rf projects/my-app-one
   ```

3. **Clean up the lock file** (optional, but recommended):
   ```bash
   pnpm install
   ```
   This will update `pnpm-lock.yaml` to remove references to the deleted project.

### Removing Boilerplate Projects

The template includes example projects (`my-app-one`, `my-app-two`) that you may want to remove after setting up your own projects:

```bash
# Remove all boilerplate projects
rm -rf projects/my-app-one projects/my-app-two

# Update the lock file
pnpm install
```

**Note:** Make sure you've copied any configuration or code you want to keep before removing these projects.

## Running Projects

### Run a Specific Project

```bash
# From the root directory
pnpm --filter <project-name> <script-name>

# Example: Run dev server for my-app-one
pnpm --filter my-app-one dev

# Example: Build my-app-one
pnpm --filter my-app-one build
```

Or navigate to the project directory:

```bash
cd projects/my-app-one
pnpm dev
```

### Run Scripts Across All Projects

```bash
# Run a script in all projects that have it
pnpm -r <script-name>

# Example: Build all projects
pnpm -r build

# Example: Run linting in all projects
pnpm -r lint
```

## Workspace Commands

### Useful pnpm Workspace Commands

```bash
# List all workspace packages
pnpm list --depth=0

# Run a command in a specific project
pnpm --filter <project-name> <command>

# Run a command in all projects
pnpm -r <command>

# Add a dependency to root workspace
pnpm add -w <package-name>

# Show workspace info
pnpm why <package-name>  # Shows why a package is installed
```

### Adding Custom Root Scripts

You can add convenience scripts to the root `package.json`:

```json
{
  "scripts": {
    "dev:app-one": "pnpm --filter my-app-one dev",
    "dev:app-two": "pnpm --filter my-app-two dev",
    "build:all": "pnpm -r build",
    "lint:all": "pnpm -r lint"
  }
}
```

Then run:
```bash
pnpm dev:app-one
pnpm build:all
```

## Best Practices

1. **Keep projects independent:** Each project should be able to run independently
2. **Share common dependencies at root:** If multiple projects use the same dependency, consider adding it to the root
3. **Use consistent naming:** Follow a consistent naming convention for your projects
4. **Version management:** Each project can have its own version, but consider using a consistent versioning strategy
5. **Lock file:** Always commit `pnpm-lock.yaml` to version control

## Troubleshooting

### Issues with node_modules

If you encounter dependency issues:

```bash
# Remove all node_modules
rm -rf node_modules projects/*/node_modules

# Clean install
pnpm install
```

### Workspace not recognizing a project

Make sure:
- The project has a `package.json` file
- The project is in the `projects/` directory (or matches the pattern in `pnpm-workspace.yaml`)
- Run `pnpm install` from the root after adding a new project

### Version conflicts

If you have version conflicts between projects:

```bash
# Check which versions are installed
pnpm list <package-name>

# Use pnpm's resolution feature in root package.json
# Add to package.json:
{
  "pnpm": {
    "overrides": {
      "package-name": "^1.0.0"
    }
  }
}
```
