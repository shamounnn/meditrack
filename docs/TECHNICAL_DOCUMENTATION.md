# MediTrack Technical Documentation

## Backend Services - Method Documentation

---

## AuthService

### `login(input: LoginInput): Promise<AuthResponse>`
Authenticates a user and returns JWT token.

**Parameters:**
- `input.username` (string): User's username
- `input.password` (string): User's password

**Returns:**
```typescript
{
  user: UserDto,
  accessToken: string
}
```

**Throws:**
- `UnauthorizedException`: Invalid credentials
- `NotFoundException`: User not found

**Example:**
```typescript
const result = await authService.login({
  username: 'john_doe',
  password: 'password123'
});
```

---

### `register(input: CreateUserInput): Promise<AuthResponse>`
Registers a new user account.

**Parameters:**
- `input.username` (string): Desired username (min 3 chars)
- `input.email` (string): Valid email address
- `input.password` (string): Password (min 6 chars)

**Returns:**
```typescript
{
  user: UserDto,
  accessToken: string
}
```

**Throws:**
- `ConflictException`: Username or email already exists
- `BadRequestException`: Validation error

**Example:**
```typescript
const result = await authService.register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123'
});
```

---

### `validateUser(username: string, password: string): Promise<User | null>`
Validates user credentials.

**Parameters:**
- `username` (string): Username to validate
- `password` (string): Password to check

**Returns:**
- `User` object if valid
- `null` if invalid

**Internal Method** - Used by Passport strategy

---

## UsersService

### `create(input: CreateUserInput): Promise<UserDto>`
Creates a new user in the database.

**Parameters:**
- `input.username` (string): Username
- `input.email` (string): Email address
- `input.password` (string): Plain text password (will be hashed)

**Returns:**
- `UserDto`: Created user object (without password)

**Throws:**
- `ConflictException`: User already exists

**Example:**
```typescript
const user = await usersService.create({
  username: 'jane_doe',
  email: 'jane@example.com',
  password: 'password123'
});
```

---

### `findOne(id: number): Promise<User>`
Finds a user by ID.

**Parameters:**
- `id` (number): User ID

**Returns:**
- `User`: User entity with all fields

**Throws:**
- `NotFoundException`: User not found

**Example:**
```typescript
const user = await usersService.findOne(1);
```

---

### `findByUsername(username: string): Promise<User | null>`
Finds a user by username.

**Parameters:**
- `username` (string): Username to search

**Returns:**
- `User` if found
- `null` if not found

**Example:**
```typescript
const user = await usersService.findByUsername('john_doe');
```

---

### `findAll(): Promise<UserDto[]>`
Retrieves all users.

**Parameters:** None

**Returns:**
- `UserDto[]`: Array of user objects (without passwords)

**Example:**
```typescript
const users = await usersService.findAll();
```

---

### `updateFaceDescriptor(id: number, faceDescriptor: string): Promise<void>`
Updates user's face recognition descriptor.

**Parameters:**
- `id` (number): User ID
- `faceDescriptor` (string): JSON string of face descriptor array

**Returns:** void

**Throws:**
- `NotFoundException`: User not found

**Example:**
```typescript
await usersService.updateFaceDescriptor(1, '[0.123, 0.456, ...]');
```

---

### `verifyFace(faceDescriptor: string): Promise<UserDto | null>`
Verifies face descriptor and returns matching user.

**Parameters:**
- `faceDescriptor` (string): Face descriptor to match

**Returns:**
- `UserDto` if match found
- `null` if no match

**Example:**
```typescript
const user = await usersService.verifyFace('[0.123, 0.456, ...]');
```

---

## MedicationsService

### `create(input: CreateMedicationInput): Promise<Medication>`
Creates a new medication record.

**Parameters:**
- `input.name` (string): Medication name
- `input.dosage` (number): Dosage in mg
- `input.pillsPerBox` (number): Pills per box
- `input.currentPills` (number): Current pill count
- `input.lowStockThreshold` (number): Low stock alert threshold
- `input.sideEffects` (string, optional): Side effects description
- `input.userId` (number): Owner user ID

**Returns:**
- `Medication`: Created medication entity

**Throws:**
- `BadRequestException`: Invalid input data

**Example:**
```typescript
const medication = await medicationsService.create({
  name: 'Aspirin',
  dosage: 500,
  pillsPerBox: 30,
  currentPills: 30,
  lowStockThreshold: 5,
  userId: 1
});
```

---

### `findAll(): Promise<Medication[]>`
Retrieves all medications.

**Parameters:** None

**Returns:**
- `Medication[]`: Array of all medications

**Example:**
```typescript
const medications = await medicationsService.findAll();
```

---

### `findOne(id: number): Promise<Medication>`
Finds a medication by ID.

**Parameters:**
- `id` (number): Medication ID

**Returns:**
- `Medication`: Medication entity

**Throws:**
- `NotFoundException`: Medication not found

**Example:**
```typescript
const medication = await medicationsService.findOne(1);
```

---

### `findByUser(userId: number): Promise<Medication[]>`
Retrieves all medications for a specific user.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- `Medication[]`: Array of user's medications

**Example:**
```typescript
const medications = await medicationsService.findByUser(1);
```

---

### `findLowStock(userId: number): Promise<Medication[]>`
Retrieves medications below low stock threshold.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- `Medication[]`: Array of low stock medications

**Example:**
```typescript
const lowStock = await medicationsService.findLowStock(1);
```

---

### `update(input: UpdateMedicationInput): Promise<Medication>`
Updates an existing medication.

**Parameters:**
- `input.id` (number): Medication ID
- `input.name` (string, optional): New name
- `input.dosage` (number, optional): New dosage
- `input.currentPills` (number, optional): New pill count
- `input.lowStockThreshold` (number, optional): New threshold
- `input.sideEffects` (string, optional): New side effects
- `input.quantityToDeduct` (number, optional): Pills to deduct

**Returns:**
- `Medication`: Updated medication entity

**Throws:**
- `NotFoundException`: Medication not found
- `BadRequestException`: Invalid update data

**Example:**
```typescript
const updated = await medicationsService.update({
  id: 1,
  currentPills: 25
});
```

---

### `remove(id: number): Promise<void>`
Deletes a medication.

**Parameters:**
- `id` (number): Medication ID to delete

**Returns:** void

**Throws:**
- `NotFoundException`: Medication not found

**Example:**
```typescript
await medicationsService.remove(1);
```

---

## SchedulesService

### `create(input: CreateScheduleInput): Promise<MedicationSchedule>`
Creates a new medication schedule.

**Parameters:**
- `input.medicationId` (number): Medication ID
- `input.intakeTime` (string): Time in HH:MM:SS format
- `input.frequency` (string): daily|twice_daily|weekly|as_needed
- `input.doseQuantity` (number): Pills per dose
- `input.userId` (number): User ID

**Returns:**
- `MedicationSchedule`: Created schedule entity

**Throws:**
- `BadRequestException`: Invalid input
- `NotFoundException`: Medication not found

**Example:**
```typescript
const schedule = await schedulesService.create({
  medicationId: 1,
  intakeTime: '08:00:00',
  frequency: 'daily',
  doseQuantity: 1,
  userId: 1
});
```

---

### `findAll(): Promise<MedicationSchedule[]>`
Retrieves all schedules.

**Parameters:** None

**Returns:**
- `MedicationSchedule[]`: Array of all schedules

---

### `findOne(id: number): Promise<MedicationSchedule>`
Finds a schedule by ID.

**Parameters:**
- `id` (number): Schedule ID

**Returns:**
- `MedicationSchedule`: Schedule entity

**Throws:**
- `NotFoundException`: Schedule not found

---

### `findByUser(userId: number): Promise<MedicationSchedule[]>`
Retrieves all schedules for a user.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- `MedicationSchedule[]`: Array of user's schedules

---

### `update(input: UpdateScheduleInput): Promise<MedicationSchedule>`
Updates an existing schedule.

**Parameters:**
- `input.id` (number): Schedule ID
- `input.intakeTime` (string, optional): New time
- `input.frequency` (string, optional): New frequency
- `input.doseQuantity` (number, optional): New dose quantity

**Returns:**
- `MedicationSchedule`: Updated schedule

**Throws:**
- `NotFoundException`: Schedule not found

---

### `remove(id: number): Promise<void>`
Deletes a schedule.

**Parameters:**
- `id` (number): Schedule ID

**Returns:** void

---

## AlertsService

### `create(input: CreateAlertInput): Promise<InteractionAlert>`
Creates a drug interaction alert.

**Parameters:**
- `input.medication1Id` (number): First medication ID
- `input.medication2Id` (number): Second medication ID
- `input.severity` (string): low|moderate|high|critical
- `input.message` (string): Alert message
- `input.userId` (number): User ID

**Returns:**
- `InteractionAlert`: Created alert entity

**Example:**
```typescript
const alert = await alertsService.create({
  medication1Id: 1,
  medication2Id: 2,
  severity: 'high',
  message: 'May cause increased bleeding',
  userId: 1
});
```

---

### `findByUser(userId: number): Promise<InteractionAlert[]>`
Retrieves all alerts for a user.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- `InteractionAlert[]`: Array of user's alerts

---

### `update(input: UpdateAlertInput): Promise<InteractionAlert>`
Updates an existing alert.

**Parameters:**
- `input.id` (number): Alert ID
- `input.severity` (string, optional): New severity
- `input.message` (string, optional): New message

**Returns:**
- `InteractionAlert`: Updated alert

---

### `remove(id: number): Promise<void>`
Deletes an alert.

**Parameters:**
- `id` (number): Alert ID

**Returns:** void

---

## Frontend Services - Method Documentation

---

## voiceService

### `speak(text: string, options?: object): Promise<void>`
Converts text to speech.

**Parameters:**
- `text` (string): Text to speak
- `options.rate` (number, optional): Speech rate (0.1-10, default: 1.0)
- `options.pitch` (number, optional): Voice pitch (0-2, default: 1.0)
- `options.volume` (number, optional): Volume (0-1, default: 1.0)

**Returns:**
- Promise that resolves when speech completes

**Example:**
```javascript
await voiceService.speak('Hello world', { rate: 1.2 });
```

---

### `stopSpeaking(): void`
Stops current speech immediately.

**Parameters:** None

**Returns:** void

---

### `announceMedication(medication: object): Promise<void>`
Announces medication reminder.

**Parameters:**
- `medication.name` (string): Medication name
- `medication.dosage` (number): Dosage amount

**Returns:**
- Promise that resolves when announcement completes

**Example:**
```javascript
await voiceService.announceMedication({
  name: 'Aspirin',
  dosage: 500
});
// Speaks: "Time to take Aspirin, 500 milligrams"
```

---

### `announceLowStock(medication: object): Promise<void>`
Announces low stock warning.

**Parameters:**
- `medication.name` (string): Medication name
- `medication.currentPills` (number): Remaining pills

**Returns:**
- Promise that resolves when announcement completes

---

### `confirmAction(action: string): Promise<void>`
Confirms an action with voice.

**Parameters:**
- `action` (string): Action description

**Returns:**
- Promise that resolves when confirmation completes

**Example:**
```javascript
await voiceService.confirmAction('Aspirin taken');
// Speaks: "Aspirin taken confirmed"
```

---

### `startListening(onResult: function, onError: function): boolean`
Starts listening for voice commands.

**Parameters:**
- `onResult` (function): Callback with recognized text
- `onError` (function): Callback for errors

**Returns:**
- `true` if listening started
- `false` if failed or already listening

**Example:**
```javascript
voiceService.startListening(
  (text) => console.log('Heard:', text),
  (error) => console.error('Error:', error)
);
```

---

### `stopListening(): void`
Stops listening for voice commands.

**Parameters:** None

**Returns:** void

---

### `parseCommand(command: string): object`
Parses voice command text into action object.

**Parameters:**
- `command` (string): Voice command text

**Returns:**
```javascript
{
  action: 'take' | 'refill' | 'add' | 'list' | 'help' | 'unknown',
  type: 'medication' | 'medications' | 'general' | 'unknown'
}
```

**Example:**
```javascript
const cmd = voiceService.parseCommand('take medication');
// Returns: { action: 'take', type: 'medication' }
```

---

### `isSupported(): object`
Checks browser support for voice features.

**Parameters:** None

**Returns:**
```javascript
{
  synthesis: boolean,  // Text-to-speech support
  recognition: boolean // Speech recognition support
}
```

---

## medicationService

### `getAllMedications(): Promise<Medication[]>`
Fetches all medications.

**Parameters:** None

**Returns:**
- Array of medication objects

**Throws:**
- Network error if API unavailable

---

### `getUserMedications(userId: number): Promise<Medication[]>`
Fetches medications for specific user.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- Array of user's medications

---

### `getLowStockMedications(userId: number): Promise<Medication[]>`
Fetches low stock medications.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- Array of low stock medications

---

### `createMedication(payload: object): Promise<Medication>`
Creates new medication.

**Parameters:**
- `payload.name` (string): Medication name
- `payload.dosage` (number): Dosage in mg
- `payload.pillsPerBox` (number): Pills per box
- `payload.currentPills` (number): Current count
- `payload.lowStockThreshold` (number): Alert threshold
- `payload.userId` (number): Owner ID

**Returns:**
- Created medication object

---

### `updateMedication(medicationId: number, payload: object): Promise<Medication>`
Updates existing medication.

**Parameters:**
- `medicationId` (number): Medication ID
- `payload` (object): Fields to update

**Returns:**
- Updated medication object

---

### `deductMedication(medicationId: number, quantity: number): Promise<Medication>`
Deducts pills from medication.

**Parameters:**
- `medicationId` (number): Medication ID
- `quantity` (number): Pills to deduct (default: 1)

**Returns:**
- Updated medication object

---

### `deleteMedication(medicationId: number): Promise<void>`
Deletes a medication.

**Parameters:**
- `medicationId` (number): Medication ID to delete

**Returns:** void

---

## Redux Store

### User Slice

#### `loginUser(payload): AsyncThunk`
Logs in user and stores token.

**Parameters:**
- `payload.username` (string): Username
- `payload.password` (string): Password

**Returns:**
- User object and access token

**Updates State:**
- `user`: User object
- `token`: JWT token
- `status`: 'loading' | 'succeeded' | 'failed'

---

#### `registerUser(payload): AsyncThunk`
Registers new user.

**Parameters:**
- `payload.username` (string): Username
- `payload.email` (string): Email
- `payload.password` (string): Password

**Returns:**
- User object and access token

---

#### `logout(): Action`
Logs out user and clears storage.

**Parameters:** None

**Updates State:**
- Clears user and token
- Removes from localStorage

---

### Medication Slice

#### `fetchMedicationsByUser(userId): AsyncThunk`
Fetches user's medications via GraphQL.

**Parameters:**
- `userId` (number): User ID

**Returns:**
- Array of medications

**Updates State:**
- `items`: Medication array
- `status`: Loading status
- `error`: Error message if failed

---

## Error Handling

All services implement try-catch blocks and throw appropriate errors:

**Backend:**
- `NotFoundException`: Resource not found (404)
- `UnauthorizedException`: Auth failed (401)
- `BadRequestException`: Invalid input (400)
- `ConflictException`: Duplicate resource (409)

**Frontend:**
- Network errors caught and displayed
- Validation errors shown in forms
- User-friendly error messages

---

## Security Measures

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret key
3. **Input Validation**: class-validator decorators
4. **SQL Injection**: TypeORM parameterized queries
5. **XSS Protection**: Helmet middleware
6. **CORS**: Configured for frontend origin

---

**Version**: 2.0.0  
**Last Updated**: December 2024
