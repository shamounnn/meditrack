"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    static fromEntity(user) {
        const dto = new UserDto();
        dto.id = user.id;
        dto.username = user.username;
        dto.email = user.email;
        dto.createdAt = user.createdAt;
        return dto;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map