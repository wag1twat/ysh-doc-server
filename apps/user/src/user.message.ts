export class UserMessage {
  static createOne = { cmd: 'users.create.one' };

  static findOne = {
    cmd: 'users.find.one',
  };

  static deleteOne = {
    cmd: 'users.delete.one',
  };

  static findAll = {
    cmd: 'users.find.all',
  };
}
