<div align="center">

# Website Brief Builder

A guided, step-by-step questionnaire that turns a business owner's answers into a clean, shareable website brief.

![Website Brief Builder preview](public/preview.svg)

</div>

## Overview

Website Brief Builder is a client-side wizard that walks a person through eight steps (business, goal, audience, pages, identity, features, references, and timeline) and compiles the answers into a single organized summary. The summary can be copied as plain text or printed as a PDF. There is no backend, no account system, and no real client data involved; it is a self-contained portfolio project.

## Highlights

- Eight-step guided flow with a scrollable progress tracker that lets you jump back to any completed step
- Multiple input types: text fields, single-select cards, multi-select chips, and a feature-priority picker (nice to have / important / must have)
- Per-step validation with inline error messages and required-field indicators
- Draft autosave to `localStorage`, with the ability to resume or clear a saved draft from the start screen
- One-click sample data to preview the full flow with fictional business details
- Final summary screen grouped by section, with quick edit links back into each step and a print-only layout for PDF export
- Light and dark theme, persisted across sessions and applied before first paint

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other available scripts:

```bash
npm run build   # create a production build
npm run start   # run the production build
npm run lint    # run ESLint
```

## Project Structure

```
src/
  app/              App Router entry point, global styles, root layout
  components/       Wizard shell, progress bar, summary view, and step components
    fields/         Reusable form controls
    steps/          One component per briefing step
  hooks/            Draft persistence, theme, toast, and modal accessibility hooks
  lib/              Types, option lists, validation, storage, and summary builder
public/
  preview.svg       Preview image used in this README
```

## License

Licensed under the [MIT License](LICENSE).

---

<div align="center">

Built as a public portfolio project.

</div>
