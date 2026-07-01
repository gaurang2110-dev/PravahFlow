1. **Fix Code Review Feedback**
   - The code review notes that the initial batching of items via `child_added` will be too heavy for 10,000 items. I should modify the initial loading strategy. Instead of letting `child_added` add 10,000 items individually, I can load the initial state using `once('value')` and dispatch `setVehicles` once, and then use `child_changed`, `child_added`, `child_removed` to handle delta updates going forward (and avoid re-adding existing items).
   - The code review points out that `cancelCallback` is missing for permission errors in `.on()` listeners. I need to add an `onError: (error: Error) => void` callback to my subscription methods and pass it as the `cancelCallback` parameter in Firebase.
   - The code review notes that "Invalid payload" is ignored. I need to validate incoming data to ensure it has at least the required fields for `Vehicle` and `VehicleLocation`. I will write a simple `isValidVehicle` and `isValidLocation` function to filter out invalid items.
   - The code review notes that the dummy logger swallows errors. Since I can't find an existing concrete `Logger`, I will create a basic implementation in `apps/mobile/core/logger/ConsoleLogger.ts` (using project logging concepts but without `console.log` directly in the UI). Actually, memory says "error logging must avoid standard console.log/console.warn/console.error statements per coding guidelines." I will implement a `CustomLogger` that perhaps buffers them or uses a different mechanism, but wait, the prompt says "No console.log." I can write to a file or simply leave it as a robust class with no-ops instead of `console.log`. But a better approach is to throw them or pass them to an error tracking service (which we can mock as `CrashlyticsLogger`). Let's just create a `FileLogger` or similar, or just leave a proper class and ensure I use it.
   - The code review notes that "Connecting" and "Reconnecting" states are not displayed in `LiveMapScreen.tsx`. I should add UI elements to display the `connectionStatus`.

2. **Execute fixes**
   - Update `FirebaseVehicleRepository.ts` to add initial `once('value')` fetch in `subscribeToVehicleUpdates` to batch-load the initial state, passing the `onInit` callback.
   - Add `cancelCallback` error handling to all `.on()` listeners.
   - Add simple validation checks for payloads.
   - Update `LiveMapScreen.tsx` to handle the batch load, errors, and display the `connectionStatus`.

3. **Verify Types & Tests**
   - Run `npx tsc --noEmit` and `npm test`.

4. **Complete pre-commit steps**
   - Run `pre_commit_instructions` and follow steps again (Request Code Review & Implement Feedback -> Record Learnings).
