# Technical Method Reference

## Backend (NestJS)

### UsersService
- `create(input: CreateUserInput)` → Params: `{ username, email, password }`; Returns: `UserDto` without password.
- `findAll()` → Params: none; Returns: `UserDto[]`.
- `findOne(id: number)` → Params: `id`; Returns: `User` entity or `NotFoundException`.
- `findByUsername(username: string)` → Params: `username`; Returns: `User | null`.
- `remove(id: number)` → Params: `id`; Returns: void.

### AuthService
- `validateUser(username: string, pass: string)` → Validates credentials; Returns: `UserDto` or throws `UnauthorizedException`.
- `login(loginInput: LoginInput)` → `{ username, password }`; Returns: `{ accessToken, user: UserDto }`.
- `register(input: CreateUserInput)` → `{ username, email, password }`; Returns: `{ accessToken, user: UserDto }`.

### MedicationsService
- `create(input: CreateMedicationInput)` → `{ userId, name, dosage, pillsPerBox?, currentPills?, sideEffects?, lowStockThreshold? }`; Returns: `Medication`.
- `findAll()` → Params: none; Returns: `Medication[]`.
- `findOne(id: number)` → Params: `id`; Returns: `Medication` or `NotFoundException`.
- `findByUser(userId: number)` → Params: `userId`; Returns: `Medication[]`.
- `findLowStock(userId: number)` → Params: `userId`; Returns: low-stock `Medication[]` (current <= threshold).
- `update(input: UpdateMedicationInput)` → `{ id, ...partial fields, quantityToDeduct? }`; Returns: updated `Medication` or validation error when stock insufficient.
- `remove(id: number)` → Params: `id`; Returns: void.

### SchedulesService
- `create(input: CreateScheduleInput)` → `{ medicationId, intakeTime?, frequency?, doseQuantity? }`; Returns: `MedicationSchedule`.
- `findAll()` → Params: none; Returns: `MedicationSchedule[]`.
- `findOne(id: number)` → Params: `id`; Returns: `MedicationSchedule` or `NotFoundException`.
- `findByMedication(medicationId: number)` → Params: `medicationId`; Returns: schedules for a medication.
- `findByUser(userId: number)` → Params: `userId`; Returns: schedules joined via medication ownership.
- `update(input: UpdateScheduleInput)` → `{ id, ...partial }`; Returns: updated `MedicationSchedule`.
- `remove(id: number)` → Params: `id`; Returns: void.

### AlertsService
- `create(input: CreateAlertInput)` → `{ userId, medication1Id, medication2Id, alertMessage, severity? }`; Returns: `InteractionAlert`.
- `findAll()` → Params: none; Returns: `InteractionAlert[]`.
- `findOne(id: number)` → Params: `id`; Returns: `InteractionAlert` or `NotFoundException`.
- `findByUser(userId: number)` → Params: `userId`; Returns: `InteractionAlert[]`.
- `update(input: UpdateAlertInput)` → `{ id, alertMessage?, severity? }`; Returns: updated `InteractionAlert`.
- `remove(id: number)` → Params: `id`; Returns: void.

### HealthService
- `check()` → Params: none; Returns: `{ ok: boolean; database: string; timestamp: string }` after DB ping.

### FaceService
- `verifyIdentity(imageBase64: string)` → Params: `imageBase64`; Returns: `{ verified: boolean; confidence: number }` (stub hook for FaceAPI/OpenCV integration).

## Frontend (React/Redux)

### Redux slices
- `userSlice.loginUser(payload)` → `{ username, password }`; Returns fulfilled `{ accessToken, user }`, stores token/user in localStorage.
- `userSlice.registerUser(payload)` → `{ username, email, password }`; Same return shape as login.
- `userSlice.logout()` → Clears token/user from state/localStorage.
- `medicationSlice.fetchMedicationsByUser(userId)` → Fetches GraphQL query `medicationsByUser`; Returns medication array to Redux state.

### Services (REST)
- `userService.loginUser`, `registerUser`, `getUserById`, `getUserByUsername`, `getAllUsers`, `deleteUser` → Map to REST endpoints and normalize IDs (`userId`).
- `medicationService` CRUD helpers (`getAllMedications`, `getMedicationById`, `getUserMedications`, `getLowStockMedications`, `createMedication`, `updateMedication`, `deductMedication`, `refillMedication`, `deleteMedication`) → Normalize to `medicationId`.
- `scheduleService` CRUD (`getAllSchedules`, `getScheduleById`, `getMedicationSchedules`, `getUserSchedules`, `createSchedule`, `updateSchedule`, `deleteSchedule`) → Normalize to `scheduleId`.
- `alertService` CRUD (`getAllAlerts`, `getAlertById`, `getUserAlerts`, `createAlert`, `updateAlert`, `deleteAlert`) → Normalize to `alertId`.

### Components/Pages (selected)
- `UserAuth` → Handles login/register UI; dispatches Redux thunks; Params: user input fields; Returns: navigates when Redux state changes.
- `MedicationList` → Uses REST hook + GraphQL snapshot; Actions: deduct/refill/delete medications.
- `UserDashboard`, `ScheduleList`, `ScheduleForm`, `AlertList`, `AlertForm`, `MedicationForm` → Consume services/Redux data to render and mutate domain entities.
