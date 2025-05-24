# Feature Dependencies & Build Order

This document summarizes the feature dependencies based on the HTML mockups found in the `mockup` folder. Implement features in the order below so that each step builds on the previous one.

## 1. Core Client Management
- Add, view, edit, archive, and restore clients.
- Inspections must reference an existing client, so this is the foundation.

## 2. Inspection Creation and Editing
- Create and edit inspections linked to a client.
- Required before access points can be added.

## 3. Access Point Management
- Add or edit access points for each inspection.
- Observations depend on having access points defined.

## 4. Observation Recording
- Record observations for each access point (notes, measurements, photos).
- Provides data for later steps.

## 5. Report Generation
- Combine inspection details and observations into a print-ready report.

## 6. Settings and Advanced Features
- Configure company information and future workflow enhancements.
