# Architecture Guide

## Goal
- Keep MVP speed.
- Keep clear boundaries between UI, API, and business logic.
- Avoid coupling frontend pages to controllers.

## Layers
- `app/*`: Next.js routes and API route handlers.
- `src/views/*`: UI components and pages.
- `src/services/api/*`: frontend HTTP clients for internal API.
- `src/services/client/*`: client-only integrations (browser SDKs).
- `src/controllers/*`: business logic used by API handlers.
- `src/models/*`: domain entities and validation rules.
- `src/services/*`: external providers (Firebase, AppyPay, auth SDK).

## Data Flow
1. UI calls `src/services/api/*`.
2. API route in `app/api/*` validates input and calls controller.
3. Controller uses models and provider services.
4. API returns normalized `{ success, ... }` payload.
5. UI updates state and local cache (`localStorage`) if needed.

## Rules
- Do not import controllers directly in `src/views/*`.
- Add new business operations in controllers first, then expose via `app/api/*`.
- Keep API response shape stable (`success`, `error`, payload fields).
- Keep browser-only auth/payment SDK logic inside `src/services/client/*`.

## Current API Clients
- `src/services/api/authApi.js`
- `src/services/api/userApi.js`
- `src/services/api/messageApi.js`
- `src/services/api/paymentApi.js`
