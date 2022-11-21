export default class User {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string
  ) {
  }

  static fromDto(dto: any) {
    return new User(dto.id, dto.firstName, dto.lastName, dto.email);
  }
}
