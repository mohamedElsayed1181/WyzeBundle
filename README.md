# Bundle Builder

React + TypeScript frontend take-home assignment.

A responsive bundle builder experience that allows users to configure a security system through a multi-step flow with a live order summary.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- Lucide React (Icons)

## Getting Started

### Clone the repository

git clone REPO_LINK

## Install dependencies

npm install

## Run the development server

npm run dev

## Features

- Bundle Builder
- Multi-step accordion flow:
- Choose your cameras
- Choose your plan
- Choose your sensors
- Add extra protection
- Step navigation and active state handling

## Product Selection

- Products are rendered dynamically from JSON data
- Reusable product card components
- Selected and unselected product states
- Dynamic price calculation
- Product quantity management

## Variant Handling

- Support products with multiple variants
- Each variant has its own quantity
- Switching between variants keeps previous selections
- Selected variants appear separately in the review panel

## Review Panel

- Live synchronization with selected products
- Quantity updates from the review panel
- Automatic total price calculation
- Displays selected items with their quantities and prices
  ##Persistence
- Save system configuration using localStorage
- Restore saved configuration after refreshing or returning to the application
  ##Responsive Design
- Desktop two-column layout
- Responsive behavior for smaller screens
- Optimized layout for mobile devices

## Main reusable components:

- ProductCard
- StepAccordion
- VariantSelector
- QuantityStepper
- ReviewPanel
- SummaryItem
