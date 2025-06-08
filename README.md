# WRIT 40363 Website

## Overview
The WRIT 40363 website serves as a comprehensive resource for students enrolled in the Multimedia Authoring: Mobile Apps & eBooks course. This website includes essential information such as the course syllabus, schedule, assignments, resources, and contact details for the instructor.

## Features
- **Responsive Design**: The website is designed to be accessible on various devices, ensuring a seamless experience for all users.
- **Professional Aesthetic**: Utilizing a consistent color scheme with #4d1979 as the primary color, the website maintains a professional and visually appealing layout.
- **Easy Navigation**: The navigation menu allows users to quickly access different sections of the website, enhancing usability.

## Project Structure
The project is organized into the following directories and files:

- **src/**: Contains all source files for the website.
  - **index.html**: Main entry point for the website.
  - **styles/**: Contains CSS files for styling the website.
    - **main.css**: Primary styles for the website.
    - **components.css**: Styles for specific components.
    - **responsive.css**: Media queries for responsive design.
  - **scripts/**: Contains JavaScript files for functionality.
    - **main.js**: Main JavaScript functionality.
    - **navigation.js**: Navigation-related scripts.
  - **pages/**: Contains HTML files for different sections of the website.
    - **syllabus.html**: Course syllabus.
    - **schedule.html**: Course schedule.
    - **assignments.html**: List of assignments.
    - **resources.html**: Student resources.
    - **contact.html**: Instructor contact information.
  - **components/**: Contains reusable HTML components.
    - **header.html**: Header structure.
    - **footer.html**: Footer structure.
    - **navigation.html**: Navigation menu structure.
  - **assets/**: Contains fonts and icons used in the website.
- **Musk_Watcher/**: External app tracking social media presence.
- **docs/**: Contains additional documentation related to the project.
  - **content.md**: Additional content or documentation.
- **_archive/**: Contains archived files not needed for current development.
  - **backup/**: Backup copies of files.
  - **tests/**: Test files and experimental code.
  - **discontinued/**: Files from discontinued features or migrations.
  - **scripts/**: Legacy shell scripts for monitoring and diagnostics.
  - **alternative-designs/**: Alternative design implementations.
- **package.json**: Configuration file for npm.

## Recent Updates
- **License Conflict Resolution (Latest)**: Fixed "Similar code found with 2 license types" warning by archiving duplicate code citation files containing "License: unknown" entries from external repositories. Consolidated to single clean code-citations.md file with proper MIT license documentation. All external references now documented as educational use under project's MIT license.
- **Archive Cleanup**: Reorganized workspace by moving non-essential files to the `_archive/` directory with organized subdirectories. This includes backup files, test files, discontinued documentation, legacy scripts, and alternative design implementations. The active workspace now contains only files relevant to current development.

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:
   ```
   npm install
   ```
4. Open `src/index.html` in your web browser to view the website.

## Contribution
Contributions to the project are welcome. Please submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.